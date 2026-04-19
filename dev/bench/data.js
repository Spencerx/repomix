window.BENCHMARK_DATA = {
  "lastUpdate": 1776601427059,
  "repoUrl": "https://github.com/Spencerx/repomix",
  "entries": {
    "Repomix Performance": [
      {
        "commit": {
          "author": {
            "email": "koukun0120@gmail.com",
            "name": "Kazuki Yamada",
            "username": "yamadashy"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c55528df3718b5adb0952da0a72efcb7772cc482",
          "message": "Merge pull request #1469 from yamadashy/perf/reduce-module-overhead\n\nperf(core): Remove redundant minimatch and parallelize wrapper tokenization",
          "timestamp": "2026-04-15T22:24:43+09:00",
          "tree_id": "435703feb2ba6845db791f74a54749dcaf047bb4",
          "url": "https://github.com/Spencerx/repomix/commit/c55528df3718b5adb0952da0a72efcb7772cc482"
        },
        "date": 1776601426742,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Repomix Pack (Linux)",
            "value": 1533,
            "range": "±36",
            "unit": "ms",
            "extra": "Median of 20 runs\nQ1: 1518ms, Q3: 1554ms\nAll times: 1498, 1512, 1513, 1514, 1518, 1518, 1520, 1523, 1532, 1533, 1533, 1534, 1536, 1543, 1545, 1554, 1555, 1556, 1582, 1592ms"
          },
          {
            "name": "Repomix Pack (Windows)",
            "value": 1937,
            "range": "±480",
            "unit": "ms",
            "extra": "Median of 20 runs\nQ1: 1915ms, Q3: 2395ms\nAll times: 1890, 1899, 1902, 1907, 1913, 1915, 1915, 1925, 1931, 1933, 1937, 1948, 1951, 1953, 1955, 2395, 2425, 2442, 2469, 2610ms"
          }
        ]
      }
    ]
  }
}