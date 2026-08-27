# 第一阶段：可复用视频基础能力

## 范围

本阶段只建立可运行、可验证的底座，不制作第一期正式成片：

1. Remotion 六段式横版 Composition；
2. 官方 JSON 字幕分页和逐词高亮；
3. 真实视频接入、裁切帧和授权状态展示；
4. AI 画面“复原示意”强制标记；
5. 本地媒体 probe 与精确裁切 CLI；
6. 第三方来源和许可证记录。

## 决策

- 保持单一 Node.js 工程，不引入 NarratoAI 的 Python/MoviePy 运行时。
- Remotion 负责非破坏性预览裁切；需要生成独立片段时才使用 FFmpeg 重编码。
- 普通 YouTube 素材可以进入候选和内部样片，状态记录为 `candidate` 或 `pending-permission`；发布前由用户联系作者。
- 无素材时必须显示中文降级画面，保证模板随时可预览和测试。
- 字幕、重要文字和素材标记遵守 1920×1080 安全区，主字幕不低于 56px。

## 验证命令

```bash
npm install
npm test
npm run validate
npm run typecheck
npm run remotion:compositions
```

媒体工具：

```bash
npm run media:probe -- path/to/source.mp4
npm run media:trim -- path/to/source.mp4 path/to/clip.mp4 00:01:12.500 00:01:18.000
```

裁切命令固定使用 H.264/AAC 重编码，避免从非关键帧开始时出现冻结帧。
