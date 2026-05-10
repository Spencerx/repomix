import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { logger } from '../../shared/logger.js';
import { getRepomixTmpDir } from '../../shared/tmpDir.js';
import type { TokenEncoding } from './tokenEncodings.js';

// Cache schema version. Bump when the on-disk format changes incompatibly so
// stale caches are discarded silently.
const CACHE_VERSION = 1;

// Hard cap on the number of entries persisted to disk. At ~32 bytes per JSON
// entry, 100k entries ≈ 3 MB. Eviction is FIFO on insertion order — when the
// cap is exceeded the oldest entries are dropped at save time.
export const MAX_CACHE_ENTRIES = 100_000;

// Cache lives under $TMPDIR/repomix/cache/, sharing the `repomix/` umbrella
// (see shared/tmpDir.ts) with other ephemeral state such as mcp-outputs/.
const CACHE_SUBDIR_NAME = 'cache';
const CACHE_FILE_NAME = 'token-counts.json';

interface CacheData {
  version: number;
  // key: `${encoding}:${byteLength}:${md5_16}`, value: tokenCount
  entries: Record<string, number>;
}

interface CacheState {
  loaded: boolean;
  dirty: boolean;
  entries: Map<string, number>;
}

const createState = (): CacheState => ({
  loaded: false,
  dirty: false,
  entries: new Map(),
});

let state = createState();

/**
 * Returns the absolute path to the on-disk cache file.
 * `REPOMIX_TOKEN_CACHE_PATH` overrides the default location for tests and
 * explicit user configuration.
 */
export const getCacheFilePath = (): string => {
  const override = process.env.REPOMIX_TOKEN_CACHE_PATH;
  if (override) return override;
  return path.join(getRepomixTmpDir(), CACHE_SUBDIR_NAME, CACHE_FILE_NAME);
};

/**
 * Returns true when the cache is disabled via `REPOMIX_TOKEN_CACHE=0`.
 * Any other value (including unset) leaves it enabled.
 */
export const isCacheDisabled = (): boolean => {
  return process.env.REPOMIX_TOKEN_CACHE === '0';
};

/**
 * Load the on-disk cache into memory. Errors (missing file, corrupt JSON,
 * version mismatch) degrade silently to an empty cache so first runs and
 * deleted caches keep working.
 */
export const loadTokenCountCache = async (): Promise<void> => {
  if (state.loaded) return;
  state.loaded = true;
  if (isCacheDisabled()) {
    logger.trace('Token count cache disabled via REPOMIX_TOKEN_CACHE=0');
    return;
  }
  const cacheFile = getCacheFilePath();
  try {
    const raw = await fs.readFile(cacheFile, 'utf8');
    const data = JSON.parse(raw) as CacheData;
    if (data?.version !== CACHE_VERSION || !data.entries) {
      logger.trace('Token count cache version mismatch — discarding');
      return;
    }
    for (const [key, value] of Object.entries(data.entries)) {
      if (typeof value === 'number') {
        state.entries.set(key, value);
      }
    }
    logger.trace(`Loaded ${state.entries.size} token count cache entries from ${cacheFile}`);
  } catch {
    logger.trace('Token count cache not found or unreadable — starting fresh');
  }
};

/**
 * Persist the in-memory cache to disk. Writes to a temporary sibling and
 * renames over the destination so concurrent invocations and interrupts
 * cannot leave a torn JSON file. Caller should await this so newly produced
 * entries are not lost on process exit.
 */
export const saveTokenCountCache = async (): Promise<void> => {
  if (!state.dirty || state.entries.size === 0) return;
  if (isCacheDisabled()) return;

  const cacheFile = getCacheFilePath();
  const cacheDir = path.dirname(cacheFile);

  try {
    // Match the directory-creation pattern used by MCP outputs
    // (`$TMPDIR/repomix/mcp-outputs/`) so all repomix temp artifacts share
    // a single `repomix/` parent. The file itself is mode 0600 below.
    await fs.mkdir(cacheDir, { recursive: true });

    // FIFO eviction: Map iteration order is insertion order, so the oldest
    // entries appear first. When over the cap, drop the head of the list.
    let entriesToSave = state.entries;
    if (state.entries.size > MAX_CACHE_ENTRIES) {
      const arr = [...state.entries.entries()];
      entriesToSave = new Map(arr.slice(arr.length - MAX_CACHE_ENTRIES));
    }

    const data: CacheData = {
      version: CACHE_VERSION,
      entries: Object.fromEntries(entriesToSave),
    };

    const tmpFile = `${cacheFile}.${process.pid}.tmp`;
    await fs.writeFile(tmpFile, JSON.stringify(data), { mode: 0o600 });
    await fs.rename(tmpFile, cacheFile);

    state.dirty = false;
    logger.trace(`Saved ${entriesToSave.size} token count cache entries to ${cacheFile}`);
  } catch (error) {
    logger.trace('Failed to save token count cache:', error);
  }
};

/**
 * Build a cache key for content under a specific token encoding.
 *
 * Format: `${encoding}:${byteLength}:${md5_16}`. Including the byte length
 * makes the key tolerant to MD5 collisions on differently-sized inputs and
 * keeps the digest portion short (16 hex chars / 64 bits) for compact JSON.
 */
export const contentCacheKey = (encoding: TokenEncoding, content: string): string => {
  const byteLength = Buffer.byteLength(content);
  const digest = createHash('md5').update(content).digest('hex').slice(0, 16);
  return `${encoding}:${byteLength}:${digest}`;
};

export const getCached = (key: string): number | undefined => {
  return state.entries.get(key);
};

export const setCached = (key: string, tokenCount: number): void => {
  state.entries.set(key, tokenCount);
  state.dirty = true;
};

/**
 * Test-only: drop all in-memory state so each test starts with a clean slate.
 */
export const __resetTokenCountCacheForTests = (): void => {
  state = createState();
};
