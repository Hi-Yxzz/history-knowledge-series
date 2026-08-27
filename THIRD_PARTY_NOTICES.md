# 第三方项目与许可证记录

第一阶段只复用必要能力，不整体复制外部应用。引入或改写代码时保留来源与许可证。

## Remotion

- 项目：https://github.com/remotion-dev/remotion
- 用途：视频渲染、字幕分页、媒体组件、转场和 FFmpeg/ffprobe CLI。
- 许可证：Remotion License。个人用户、非营利组织和不超过三人的营利组织可免费使用；其他组织需确认公司许可证要求。

## Noto Sans Simplified Chinese

- 包：`@fontsource-variable/noto-sans-sc`
- 字体许可证：SIL Open Font License 1.1。
- 用途：内置中文字体，使预览和渲染不依赖操作系统字体。
- 项目：https://fonts.google.com/noto/specimen/Noto+Sans+SC

## video-shotcraft

- 项目：https://github.com/Vincentwei1021/video-shotcraft
- 许可证：Apache License 2.0。
- 参考能力：真实视频卡片、来源标签、视觉安全区、声音与关键帧 QA 方法。
- 本仓库的 `FootageFrame` 是针对历史解说重新实现的组件，没有复制演示品牌素材。
- 外部项目附带的音乐和音效具有各自许可证，当前阶段未复制。

## NarratoAI

- 项目：https://github.com/linyqh/NarratoAI
- 许可证：MIT License。
- 参考文件：`app/services/clip_video.py`。
- 参考能力：多格式时间码解析、裁切范围校验、FFmpeg 精确重编码。
- 本仓库使用 Node.js 重新实现为 `scripts/media-tool.mjs`，没有引入 MoviePy、Streamlit 或 NarratoAI 服务端。

## 未引入的候选项目

MoneyPrinterTurbo、ShortGPT、STORM 和 GPT Researcher 目前仅用于方案调研，没有复制代码或引入依赖。后续如实际迁入能力，应在此补充精确文件、版本或提交 SHA。
