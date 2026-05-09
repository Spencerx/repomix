window.BENCHMARK_DATA = {
  "lastUpdate": 1778322522732,
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
      },
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
          "id": "b99706131b26b68e0d72aab7f93fccebad1460c0",
          "message": "Merge pull request #1515 from yamadashy/feat/dart-extra-definitions\n\nfeat(core): Capture mixin, typedef, getter, setter, and factory in Dart query",
          "timestamp": "2026-05-06T22:28:35+09:00",
          "tree_id": "01b750aa212658cce3cbc004558584657d90cd08",
          "url": "https://github.com/Spencerx/repomix/commit/b99706131b26b68e0d72aab7f93fccebad1460c0"
        },
        "date": 1778322521998,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Repomix Pack (macOS)",
            "value": 1568,
            "range": "±402",
            "unit": "ms",
            "extra": "Median of 30 runs\nQ1: 1325ms, Q3: 1727ms\nAll times: 1092, 1094, 1097, 1097, 1149, 1200, 1287, 1325, 1358, 1396, 1423, 1461, 1481, 1509, 1531, 1568, 1651, 1653, 1678, 1707, 1708, 1724, 1727, 1829, 1844, 1897, 1935, 1944, 2010, 2109ms"
          },
          {
            "name": "Repomix Pack (Linux)",
            "value": 1403,
            "range": "±34",
            "unit": "ms",
            "extra": "Median of 20 runs\nQ1: 1378ms, Q3: 1412ms\nAll times: 1356, 1371, 1372, 1375, 1376, 1378, 1378, 1389, 1396, 1397, 1403, 1406, 1407, 1408, 1411, 1412, 1416, 1433, 1435, 1486ms"
          }
        ]
      }
    ]
  }
}