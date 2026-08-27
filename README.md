# 历史生活冷知识视频库

这里保存“没有现代用品，古人怎么办”系列的选题、资料、文案、媒体和成片。第一批共十期，索引位于 `series/topics.json`。

## 制作原则

- 每期只回答一个核心问题，并限定具体时代、地区和社会群体。
- 重要事实必须映射到博物馆、档案馆、大学、论文或政府文化机构等来源。
- 素材优先使用公共领域或明确开放许可的档案；YouTube 视频只登记候选链接，下载并目检后才填写时间码。
- BBC、Discovery、Kurzgesagt 和普通 YouTube 视频不视为公共领域。
- AI 历史画面必须标记“复原示意”，不得冒充文物或档案照片。
- 单期目标为 1920×1080、三至五分钟，旁白原创、字幕完整、来源可追溯。

## 工作流程

1. 为十期建立独立目录和素材库存。
2. 在 `research` 中核验事实、来源和争议边界。
3. 在 `script` 中完成大纲、旁白和逐段镜头表。
4. 用户将指定的 YouTube 视频下载到当期 `media/youtube`。
5. 目检本地文件后锁定精确时间码，补充档案图、AI 复原图和 Remotion 动画。
6. 接入用户配音，生成字幕、关键帧、封面和最终 MP4。

## 当前状态

- 01 古代冰窖：`inventory`，将作为第一期完整制作。
- 02–10：`inventory`，先建立资料与素材候选库存。
- 第一阶段视频底座：已建立 Remotion 六段式模板、JSON 字幕、真实素材接入、媒体预检与精确裁切工具。

## 检查命令

```bash
cd /Users/admin/Desktop/科普
npm install
npm test
npm run validate
npm run typecheck
npm run remotion:compositions
```

## 视频模板与媒体工具

- Remotion 模板位于 `template/remotion`，默认 Composition 为 `HistoryEpisodeFoundation`。
- 普通 YouTube 视频可以进入候选和内部样片，发布前由用户联系作者确认授权。
- 使用 `npm run media:probe -- <文件>` 检查本地视频元数据。
- 使用 `npm run media:trim -- <输入> <输出> <开始> <结束>` 生成精确裁切片段。
- 第三方代码和许可证记录见 `THIRD_PARTY_NOTICES.md`。
