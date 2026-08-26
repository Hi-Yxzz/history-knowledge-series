# 历史生活冷知识系列实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `/Users/admin/Desktop/科普` 建立十期历史生活冷知识选题库存，并完成第一期“古代冰窖”的资料、文案、素材、Remotion 模板和成片流程。

**Architecture:** 内容层以每期独立目录保存事实、来源、结论映射、旁白和镜头表；媒体层区分 YouTube、本地档案、AI 复原图与配音；渲染层复用现有六段式 Remotion 工作流，并改造成历史人文视觉模板。批量任务先建立十期可追踪库存，单期任务再把选中的主题推进到可发布成片。

**Tech Stack:** Markdown、CSV、JSON、Node.js、TypeScript、Vitest、Remotion 4、FFmpeg/ffprobe、公共文化机构与开放档案来源、AI 图片生成。

**Repository note:** `/Users/admin/Desktop/科普` 当前不是 Git 仓库。除非用户明确授权，不初始化 Git；计划中的阶段检查使用文件清单、测试和校验命令代替提交。

---

### Task 1: 建立系列工作区与选题索引

**Files:**
- Create: `/Users/admin/Desktop/科普/README.md`
- Create: `/Users/admin/Desktop/科普/series/topics.json`
- Create: `/Users/admin/Desktop/科普/scripts/validate-topics.mjs`
- Create: `/Users/admin/Desktop/科普/tests/validate-topics.test.mjs`
- Create: `/Users/admin/Desktop/科普/package.json`

- [ ] **Step 1: 写选题索引失败测试**

测试必须断言十个唯一 ID、连续序号、非空中文标题、允许的状态 `inventory`、正确目录名 `NN-id`。

Run: `node --test tests/validate-topics.test.mjs`

Expected: FAIL，因为 `series/topics.json` 和校验函数尚不存在。

- [ ] **Step 2: 创建选题索引**

`topics.json` 使用下面的数据结构，写入规格中的十个选题。

```json
{
  "version": 1,
  "topics": [
    {
      "number": 1,
      "id": "ancient-ice",
      "directory": "01-ancient-ice",
      "title": "古代没有冰箱，皇宫夏天的冰从哪里来",
      "status": "inventory"
    }
  ]
}
```

- [ ] **Step 3: 实现索引校验命令**

`validate-topics.mjs` 导出 `validateTopics(data)`，逐项返回可读错误；CLI 成功时输出 `PASS topics=10`，失败时每行输出一个问题并以状态 1 退出。

- [ ] **Step 4: 写根 README**

README 说明十期目录、素材优先级、YouTube 本地交接、AI 复原标注、第一期制作状态和常用检查命令。

- [ ] **Step 5: 验证**

Run: `npm test && npm run validate`

Expected: 测试通过并输出 `PASS topics=10`。

### Task 2: 建立单期模板和目录合同

**Files:**
- Create: `/Users/admin/Desktop/科普/template/README.md`
- Create: `/Users/admin/Desktop/科普/template/research/facts.md`
- Create: `/Users/admin/Desktop/科普/template/research/sources.md`
- Create: `/Users/admin/Desktop/科普/template/research/claims.csv`
- Create: `/Users/admin/Desktop/科普/template/script/outline.md`
- Create: `/Users/admin/Desktop/科普/template/script/narration.txt`
- Create: `/Users/admin/Desktop/科普/template/script/shot-list.csv`
- Create: `/Users/admin/Desktop/科普/scripts/validate-episode-layout.mjs`
- Create: `/Users/admin/Desktop/科普/tests/validate-episode-layout.test.mjs`

- [ ] **Step 1: 写目录合同失败测试**

测试要求每期存在 `research`、`script`、`media/youtube`、`media/archive`、`media/generated`、`media/audio`、`remotion`、`output`，并检查七个必需文本文件。

Run: `node --test tests/validate-episode-layout.test.mjs`

Expected: FAIL，因为模板文件尚未齐全。

- [ ] **Step 2: 创建模板文件**

`claims.csv` 使用固定表头：

```csv
claim_id,claim_text,status,source_ids,notes
```

`shot-list.csv` 使用固定表头：

```csv
segment_id,narration_text,visual_type,source_id,source_url,local_file,in_seconds,out_seconds,duration_seconds,rights_status,verification_status,notes
```

允许的 `visual_type` 为 `youtube`、`archive`、`generated`、`remotion`；候选阶段的时间字段保持空值，`verification_status` 使用 `candidate`。

- [ ] **Step 3: 实现目录校验器**

CLI 接受一期目录路径，缺少目录、文件或 CSV 表头时逐行报错，成功时输出一期 ID 与文件数。

- [ ] **Step 4: 验证**

Run: `npm test`

Expected: Task 1 与 Task 2 测试全部通过。

### Task 3: 创建十期独立目录

**Files:**
- Create: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/**`
- Create: `/Users/admin/Desktop/科普/episodes/02-ancient-alarm/**`
- Create: `/Users/admin/Desktop/科普/episodes/03-ancient-teeth/**`
- Create: `/Users/admin/Desktop/科普/episodes/04-roman-toilet/**`
- Create: `/Users/admin/Desktop/科普/episodes/05-roman-heating/**`
- Create: `/Users/admin/Desktop/科普/episodes/06-ancient-lighting/**`
- Create: `/Users/admin/Desktop/科普/episodes/07-ancient-food-storage/**`
- Create: `/Users/admin/Desktop/科普/episodes/08-roman-baths/**`
- Create: `/Users/admin/Desktop/科普/episodes/09-ancient-locks/**`
- Create: `/Users/admin/Desktop/科普/episodes/10-ancient-mail/**`
- Create: `/Users/admin/Desktop/科普/scripts/scaffold-episodes.mjs`
- Create: `/Users/admin/Desktop/科普/tests/scaffold-episodes.test.mjs`

- [ ] **Step 1: 写脚手架失败测试**

测试在临时目录运行脚手架，断言十期目录与模板文件全部存在，并验证重复运行不会覆盖已填写内容。

- [ ] **Step 2: 实现脚手架**

脚本读取 `series/topics.json`，复制模板目录，为每期 README 写入选题编号、ID、标题和 `inventory` 状态；已有文件保持不变。

- [ ] **Step 3: 生成正式目录**

Run: `npm run scaffold`

Expected: 创建十期目录，第二次运行输出 `created=0 preserved=10`。

- [ ] **Step 4: 验证全部目录**

Run: `npm test && npm run validate:episodes`

Expected: 十期全部通过目录合同。

### Task 4: 建立前五期资料与素材库存

**Files:**
- Modify: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/research/facts.md`
- Modify: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/research/sources.md`
- Modify: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/script/shot-list.csv`
- Modify: `/Users/admin/Desktop/科普/episodes/02-ancient-alarm/research/facts.md`
- Modify: `/Users/admin/Desktop/科普/episodes/02-ancient-alarm/research/sources.md`
- Modify: `/Users/admin/Desktop/科普/episodes/02-ancient-alarm/script/shot-list.csv`
- Modify: `/Users/admin/Desktop/科普/episodes/03-ancient-teeth/research/facts.md`
- Modify: `/Users/admin/Desktop/科普/episodes/03-ancient-teeth/research/sources.md`
- Modify: `/Users/admin/Desktop/科普/episodes/03-ancient-teeth/script/shot-list.csv`
- Modify: `/Users/admin/Desktop/科普/episodes/04-roman-toilet/research/facts.md`
- Modify: `/Users/admin/Desktop/科普/episodes/04-roman-toilet/research/sources.md`
- Modify: `/Users/admin/Desktop/科普/episodes/04-roman-toilet/script/shot-list.csv`
- Modify: `/Users/admin/Desktop/科普/episodes/05-roman-heating/research/facts.md`
- Modify: `/Users/admin/Desktop/科普/episodes/05-roman-heating/research/sources.md`
- Modify: `/Users/admin/Desktop/科普/episodes/05-roman-heating/script/shot-list.csv`

- [ ] **Step 1: 搜集权威事实来源**

每期至少记录三个来源，其中至少一个为博物馆、档案馆、大学、同行评审论文或政府文化机构。每条来源保存标题、机构、URL、访问日期、许可状态和可支持的事实。

- [ ] **Step 2: 搜集 YouTube 候选素材**

每期至少登记两个候选视频，记录频道、原题、URL、可能支持的画面和版权状态。候选阶段不得填写猜测时间码。

- [ ] **Step 3: 规划替代画面**

每期至少登记一个公共领域或开放许可档案画面、一个 AI 复原图需求和一个 Remotion 动画需求，避免依赖单一纪录片。

- [ ] **Step 4: 写事实边界**

`facts.md` 分为“已确认”“存在争议”“常见误解”“禁止写入”四部分；所有精确数字与绝对化结论必须有来源。

- [ ] **Step 5: 人工核验**

逐条打开来源页面，确认标题、机构、URL、许可和事实支持范围；失效或只被搜索摘要支持的来源不得进入已确认区。

### Task 5: 建立后五期资料与素材库存

**Files:**
- Modify: `/Users/admin/Desktop/科普/episodes/06-ancient-lighting/research/facts.md`
- Modify: `/Users/admin/Desktop/科普/episodes/06-ancient-lighting/research/sources.md`
- Modify: `/Users/admin/Desktop/科普/episodes/06-ancient-lighting/script/shot-list.csv`
- Modify: `/Users/admin/Desktop/科普/episodes/07-ancient-food-storage/research/facts.md`
- Modify: `/Users/admin/Desktop/科普/episodes/07-ancient-food-storage/research/sources.md`
- Modify: `/Users/admin/Desktop/科普/episodes/07-ancient-food-storage/script/shot-list.csv`
- Modify: `/Users/admin/Desktop/科普/episodes/08-roman-baths/research/facts.md`
- Modify: `/Users/admin/Desktop/科普/episodes/08-roman-baths/research/sources.md`
- Modify: `/Users/admin/Desktop/科普/episodes/08-roman-baths/script/shot-list.csv`
- Modify: `/Users/admin/Desktop/科普/episodes/09-ancient-locks/research/facts.md`
- Modify: `/Users/admin/Desktop/科普/episodes/09-ancient-locks/research/sources.md`
- Modify: `/Users/admin/Desktop/科普/episodes/09-ancient-locks/script/shot-list.csv`
- Modify: `/Users/admin/Desktop/科普/episodes/10-ancient-mail/research/facts.md`
- Modify: `/Users/admin/Desktop/科普/episodes/10-ancient-mail/research/sources.md`
- Modify: `/Users/admin/Desktop/科普/episodes/10-ancient-mail/script/shot-list.csv`

- [ ] **Step 1: 搜集权威事实来源**

每期至少记录三个来源，其中至少一个为博物馆、档案馆、大学、同行评审论文或政府文化机构。每条来源保存标题、机构、URL、访问日期、许可状态和可支持的事实，分别覆盖照明、食物保存、罗马浴场、古代锁具和古代邮驿。

- [ ] **Step 2: 搜集 YouTube 候选素材**

每期至少两个候选视频，只登记可核验元数据和画面用途，不登记猜测时间码。

- [ ] **Step 3: 规划档案、AI 与动画画面**

每期至少建立三种非 YouTube 画面来源，AI 画面统一标注 `复原示意`。

- [ ] **Step 4: 写事实边界并人工核验**

使用与 Task 4 相同的四部分结构和来源打开检查。

### Task 6: 深度研究第一期“古代冰窖”

**Files:**
- Modify: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/research/facts.md`
- Modify: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/research/sources.md`
- Modify: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/research/claims.csv`
- Modify: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/script/outline.md`

- [ ] **Step 1: 限定叙事范围**

主线限定为中国历史中的冬季采冰、冰窖储藏和夏季使用；其他文明只在确有必要时做短对照，不能把不同朝代制度混成同一套流程。

- [ ] **Step 2: 建立结论映射**

为每个准备进入旁白的事实分配 `claim_id`，状态只能是 `verified`、`disputed` 或 `excluded`；`verified` 必须至少对应一个能够直接支持它的来源 ID。

- [ ] **Step 3: 建立六段大纲**

六段为：夏天冰从哪里来、冬季采冰、冰窖原理、运输与损耗、谁能使用、答案与边界。目标总时长三至五分钟。

- [ ] **Step 4: 研究审查**

检查是否混淆天然冰与人工制冰、皇家制度与普通民众、不同朝代、冰窖与冰鉴；删除无法映射来源的断言。

### Task 7: 写第一期旁白与镜头表

**Files:**
- Modify: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/script/narration.txt`
- Modify: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/script/shot-list.csv`
- Create: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/script/narration-review.md`

- [ ] **Step 1: 写原创中文旁白**

旁白只使用 `verified` 结论，控制在适合三至五分钟的长度；开头十五秒提出“夏天的冰从哪里来”，结尾直接回答并给出时代与阶层边界。

- [ ] **Step 2: 完成中文改稿**

检查模型腔、翻转句、空泛总结、冒号、破折号、排比堆叠和无来源精确细节；把检查结果记录到 `narration-review.md`。

- [ ] **Step 3: 建立逐段镜头表**

每段旁白至少有一个主画面和一个替补画面；YouTube 片段状态保持 `candidate`，档案画面写明许可，AI 画面写明提示词与“复原示意”，动画写明要表达的关系。

- [ ] **Step 4: 用户配音交接**

把 `narration.txt` 交给用户生成分段音频，文件命名为 `01-hook` 至 `06-result`；音频放入 `media/audio` 后用 ffprobe 记录真实时长。

### Task 8: 迁移历史冷知识 Remotion 模板

**Files:**
- Create: `/Users/admin/Desktop/科普/template/remotion/**`
- Create: `/Users/admin/Desktop/科普/template/remotion/tests/**`
- Modify: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/remotion/**`

- [ ] **Step 1: 复制已验证的通用能力**

从现有工程复制并改造 Episode schema、字幕解析、分段旁白、来源页、素材预检、关键帧和渲染脚本；不携带 6BG1 文案、机器名称、来源或媒体路径。

- [ ] **Step 2: 写历史模板失败测试**

测试要求六段结构、动态时长、字幕安全区、来源页、`archive/generated/remotion/youtube` 四类画面、AI 复原标记和空素材中文降级画面。

- [ ] **Step 3: 实现历史视觉组件**

组件包括档案图片卡、地图、时间线、器物结构图、AI 复原图标记、字幕层和来源尾页；颜色与排版采用纸张、墨色和低饱和金色，不使用工程机械界面文案。

- [ ] **Step 4: 接入第一期配置**

第一期配置从镜头表生成，未下载的 YouTube 素材保持候选状态，Composition 必须能用档案、生成图和占位动画独立预览。

- [ ] **Step 5: 验证**

Run: `npm test && npm run lint && npm run typecheck && npx remotion compositions src/index.ts`

Expected: 全部通过，Composition 为 1920×1080，真实时长由配音决定且位于 180–300 秒。

### Task 9: 获取并核验第一期媒体

**Files:**
- Modify: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/script/shot-list.csv`
- Modify: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/research/sources.md`
- Add local media under: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/media/**`

- [ ] **Step 1: 生成用户下载清单**

只列入实际需要的 YouTube 视频，给出 URL、目标文件名和预计用途；用户负责下载到 `media/youtube`。

- [ ] **Step 2: 检查本地媒体**

使用 ffprobe 检查时长、分辨率、帧率、音频流和文件可解码性；缺失或损坏文件不得进入镜头表 verified 状态。

- [ ] **Step 3: 目检并锁定时间码**

逐个打开本地视频，找到与旁白对应的实际画面后填写精确入点与出点。不得根据标题、缩略图或搜索摘要猜测时间码。

- [ ] **Step 4: 生成缺口画面**

对无法由档案或短视频支持的段落生成 AI 复原图或 Remotion 动画；AI 图片文件与镜头表均标注 `复原示意`。

- [ ] **Step 5: 运行媒体预检**

Expected: 所有本地裁切范围有效、来源可追溯、旁白每段至少有一类可用画面。

### Task 10: 首期关键帧、成片与归档

**Files:**
- Create: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/output/keyframes/*.png`
- Create: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/output/final.mp4`
- Create: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/output/cover.png`
- Create: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/output/captions.json`
- Create: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/output/sources.md`
- Create: `/Users/admin/Desktop/科普/episodes/01-ancient-ice/output/narration.txt`

- [ ] **Step 1: 渲染六张关键帧**

每段取一个代表帧，检查字幕溢出、来源标记、AI 复原标签、档案画面裁切和文字对比度。

- [ ] **Step 2: 修正视觉问题**

重复渲染存在问题的关键帧，直到六张全部通过目检。

- [ ] **Step 3: 运行完整验证**

Run: `npm test && npm run lint && npm run typecheck && npm run validate`

Expected: 全部退出 0。

- [ ] **Step 4: 渲染视频与封面**

Expected: `final.mp4` 为 1920×1080，时长 180–300 秒，包含配音、完整字幕、来源尾页和可辨识的复原示意标记。

- [ ] **Step 5: 检查成片元数据**

Run: `ffprobe -v error -show_entries stream=width,height -show_entries format=duration -of json output/final.mp4`

Expected: 宽 1920、高 1080、时长位于三至五分钟。

- [ ] **Step 6: 归档发布文件**

确保 `output` 同时包含 final.mp4、cover.png、captions.json、sources.md 和 narration.txt；更新根 README 的第一期状态为 `complete`，第二期状态保持 `inventory`。

## 最终核验

- [ ] 十期目录都通过结构校验并至少拥有三条权威资料来源、两个 YouTube 候选和三类替代画面计划。
- [ ] 所有文案中的重要事实都能映射到来源，争议内容有明确措辞。
- [ ] 没有把 BBC、Discovery、Kurzgesagt 或普通 YouTube 视频标为公共领域。
- [ ] 没有根据网络标题或搜索摘要编造本地视频时间码。
- [ ] AI 历史画面统一标注为“复原示意”。
- [ ] Remotion 可在缺少 YouTube 素材时用档案、生成图和动画预览。
- [ ] 首期输出满足 1920×1080、三至五分钟、字幕完整、来源可追溯。
