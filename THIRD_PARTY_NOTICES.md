# Matchmind 第三方来源与分发说明

更新：2026-10-22。本文件说明 Matchmind 当前本地交付产物中的第三方代码、数据及其来源。发布目录中的对应说明为 [dist/DATA_NOTICE.md](dist/DATA_NOTICE.md)。

## SkillCorner Open Data

本项目使用并署名 **SkillCorner** 提供的 [SkillCorner Open Data](https://github.com/SkillCorner/opendata)。上游说明数据开放来自 SkillCorner 与 PySport 的共同倡议。本次使用的本地来源仓库版本为 `4340d274572876239c154c90bc507a9b3250a656`。

上游 [LICENSE](https://github.com/SkillCorner/opendata/blob/4340d274572876239c154c90bc507a9b3250a656/LICENSE) 为 MIT，版权行为 `Copyright (c) 2020 SkillCorner. https://skillcorner.com`。本项目在 [dist/licenses/SkillCorner-LICENSE](dist/licenses/SkillCorner-LICENSE) 保留该许可**完整原文**；该文件从对应本地来源仓库逐字节复制，SHA-256 为 `3384cc66ffd008209759af5e6328677eabded72756fb1f56f4f82e68e9b3c6eb`。

当前实际分发范围：

- `dist/data/` 中的派生 JSON 使用 7 场开放样本：主比赛 `2017461`，以及历史样本 `1959846`、`2006363`、`2011166`、`1996436`、`2007721`、`2015213`。其中 `demo.json`、`frames/`、`live/` 等为主比赛数据与派生分析；`history/` 是双方各 3 场选定赛前开放样本的摘要和基线，不是 6 场完整历史轨迹，也不证明是完整赛程最近连续三场。
- `dist/viewer3d/preloaded/2017461/` 中的 `matches.parquet`、`players.parquet`、`frames.parquet` 是为本项目 3D 播放器预转换的主比赛产物；`events.csv` 是该场来源 dynamic events CSV 的副本。
- 这些是来自真实比赛的转播重建轨迹、事件及本项目派生数据，不是合成比赛，也不包含转播视频或视频展示授权。

来源、7 场名单、时间切分、主比赛原始 tracking SHA-256 与覆盖率见 [dist/data/source-manifest.json](dist/data/source-manifest.json)。该 manifest 不是所有生成产物的完整哈希清单。主比赛原始 tracking 的 SHA-256 为 `59cfa5588efee041da439f44df5b5b92f2b7305571dc831164e3d05f7415787a`。

SkillCorner tracking 为 10 Hz 转播重建数据，包含视野外外推；主比赛计时帧中约 69.12% 有 tracking，存在缺口。坐标、外推、插值、3D 姿态与本项目估算指标均可能有误差。缺口不能当成真实静止或有效观测；呈现平滑不增加有效分析样本。更多数据契约见 [docs/03-数据方案与契约.md](docs/03-数据方案与契约.md)。

## soccerviewer 及其依赖

本项目基于 [soccerviewer](https://github.com/andrewRowlinson/soccerviewer) 实现 3D 播放，保留 [vendor/soccerviewer/LICENSE](vendor/soccerviewer/LICENSE)、[vendor/soccerviewer/THIRD_PARTY_NOTICES.md](vendor/soccerviewer/THIRD_PARTY_NOTICES.md)，以及发布目录中的 [dist/viewer3d/LICENSE](dist/viewer3d/LICENSE)、[dist/viewer3d/THIRD_PARTY_NOTICES.md](dist/viewer3d/THIRD_PARTY_NOTICES.md)。这些原文包含 soccerviewer、DuckDB、three.js 的 MIT 许可及 3D 资产的 Unlicense 等声明。

上游 notices 的 “No tracking data is distributed” 描述的是原 soccerviewer 项目及其原部署。本项目新增了上述预加载 SkillCorner 文件，**该句不描述 Matchmind 当前分发范围**。本项目保留上游原文，并用本文件和发布目录中的 DATA_NOTICE 补充说明实际差异。

本说明不构成参赛数据资格或赛事合规结论。技术演示采用真实开放数据；参赛要求及最终提交数据路线仍需单独核验。
