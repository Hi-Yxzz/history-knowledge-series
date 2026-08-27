# 项目交接说明

## 项目目标

建立一个可持续生产“科普／冷知识／历史人文解说”横版视频的工作流。第一批为十个“没有现代用品，古人怎么办”选题，每期使用独立文件夹；先建立资料与素材库存，再逐期完成三至五分钟成片。

## 当前进度

- 系列设计已通过：`docs/specs/2026-08-26-history-knowledge-series-design.md`
- 实施计划已完成：`docs/plans/2026-08-26-history-knowledge-series-implementation.md`
- Task 1 已实现：根 README、十期选题索引、索引校验命令和测试。
- Task 1 本地验证通过：2 项测试通过，`npm run validate` 输出 `PASS topics=10`。
- Task 1 的只读规格审查在用户切换任务时被中断，恢复后先补规格与质量审查。
- Task 2–10 尚未实施。

## 下一步

1. 审查 Task 1 的规格符合性与代码质量。
2. 执行 Task 2：建立单期模板和目录合同。
3. 执行 Task 3：生成十期独立目录。
4. 并行研究十期的权威来源、YouTube 候选和替代画面。
5. 从 `01-ancient-ice` 开始完成深度研究、原创旁白和镜头表。
6. 将现有六段式 Remotion 能力迁移为历史冷知识模板。

## 恢复命令

家里电脑第一次使用：

```bash
cd /Users/你的用户名/Desktop
git clone https://github.com/Hi-Yxzz/history-knowledge-series.git 科普
cd 科普
npm test
npm run validate
```

仓库当前为公开仓库，可以直接克隆。已经克隆过时使用：

```bash
cd /Users/你的用户名/Desktop/科普
git pull --ff-only
npm test
npm run validate
```

当前电脑继续工作：

```bash
cd /Users/admin/Desktop/科普
npm test
npm run validate
```

预期结果：

```text
tests 2
pass 2
PASS topics=10
```

## 文件边界

GitHub 保存文本、代码、配置、字幕和进度文档。下面内容不进入 Git：

- `episodes/*/media/youtube` 中的下载视频
- `episodes/*/media/archive` 中的档案大图与扫描件
- `episodes/*/media/generated` 中的 AI 图片
- `episodes/*/media/audio` 中的配音
- `episodes/*/output` 中的成片、封面和关键帧

这些大文件需要通过移动硬盘、网盘或 NAS 单独同步到家里的电脑。

## 制作硬规则

- 每个重要历史结论必须映射到来源。
- 标题可以使用“古人”，正文必须限定时代、地区和群体。
- YouTube 候选只登记链接；下载并目检本地文件后才能填写时间码。
- BBC、Discovery、Kurzgesagt 和普通 YouTube 视频不视为公共领域。
- AI 历史画面必须标记“复原示意”。
- 不把搜索摘要当成最终事实来源。

## 外部模板来源

此前验证过的工程维修 Remotion 原型位于当前电脑：

```text
/Users/admin/.config/superpowers/worktrees/engineering-remotion-video/feature-first-video
```

该路径不会随本仓库迁移。执行实施计划 Task 8 时，应把需要的通用代码复制进本仓库的 `template/remotion`，并删除所有 6BG1 专用文案、来源和媒体路径。迁移完成前，如果换电脑执行 Task 8，需要先从当前电脑带走该原型，或根据实施计划重新创建通用组件。
