# 历史冷知识 Remotion 基础模板

第一阶段提供一个可运行的 1920×1080、30fps、六段式历史解说模板，重点验证：

- 官方 `Caption` JSON 字幕格式、分页与逐词高亮；
- 本地真实视频的裁切、来源和授权状态展示；
- AI 复原画面的强制标记；
- 配音存在时，根据真实音频时长缩放六段画面时长；
- 在没有正式素材时仍可使用中文降级画面完成预览；
- 片尾来源页和安全区。

## 运行

在仓库根目录执行：

```bash
npm install
npm run typecheck
npm run remotion:compositions
npm run remotion:studio
```

仓库脚本已显式把 `template/remotion/public` 设为 Remotion 的公共素材目录；若直接运行
Remotion CLI，请同步传入 `--public-dir=template/remotion/public`。

默认 Composition 为 `HistoryEpisodeFoundation`。正式素材放在
`template/remotion/public/media` 或单期目录对应的本地媒体区，不提交到 Git。

## 接入真实素材

编辑 `src/episode-data.ts` 中的 `defaultEpisode`：

- `footage.file` 使用相对 `public` 的文件路径；
- `trimBeforeFrames` 和 `trimAfterFrames` 使用源视频帧数；
- `rightsStatus` 使用 `candidate`、`pending-permission`、`licensed` 或 `open`；
- AI 画面必须把 `sourceType` 设为 `generated`，模板会显示“复原示意”。

字幕文件必须使用 `@remotion/captions` 的 JSON 数组格式，示例见
`public/demo-captions.json`。除第一页首 token 外，新字幕片段应保留转写器生成的前导空格；
`createTikTokStyleCaptions()` 会据此切换字幕页。
