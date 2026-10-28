# Third-party notices

soccerviewer's own source code is MIT licensed — see [LICENSE](LICENSE).

This file lists the third-party components that are distributed with this
repository and with the deployed site, together with their full license texts.

Contents:

1. [3D assets (`match/assets/*.glb`)](#1-3d-assets) — public domain (the Unlicense)
2. [three.js](#2-threejs) — MIT
3. [DuckDB and DuckDB-Wasm](#3-duckdb-and-duckdb-wasm) — MIT
4. [SkillCorner tracking data](#4-skillcorner-tracking-data) — not distributed

---

## 1. 3D assets

The player model, animations, pitch, and goals in `match/assets/`
(`clips.glb`, `goals.glb`, `pitch.glb`, `tpose_sculpted.glb`,
including the textures embedded in those files) derive from the game assets of
[GameplayFootball](https://github.com/BazkieBumpercar/GameplayFootball) by
Bastiaan Konings Schuiling, as distributed in
[Google Research Football](https://github.com/google-research/football)
(`third_party/gfootball_engine`). Both sources release those assets into the
public domain under the Unlicense; modifications made for soccerviewer
(format conversion to glTF, sculpting of the player model) are covered by
this repository's MIT license.

```
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>
```

## 2. three.js

[three.js](https://threejs.org) is bundled into the built site.

```
The MIT License

Copyright © 2010-2026 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

## 3. DuckDB and DuckDB-Wasm

[DuckDB-Wasm](https://github.com/duckdb/duckdb-wasm) is bundled into the built
site, and the [DuckDB](https://duckdb.org) `json` and `parquet` extensions are
vendored as WebAssembly binaries in `public/duckdb-ext/` and served with the
deployed site. Both are MIT licensed:

```
Copyright 2018-2026 Stichting DuckDB Foundation

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
```

## 4. SkillCorner tracking data

No tracking data is distributed with this repository or the deployed site;
users supply their own SkillCorner files, which stay in their browser. Open
sample data is available from
[SkillCorner opendata](https://github.com/SkillCorner/opendata) under its own
terms — check that repository before redistributing any of its data.
