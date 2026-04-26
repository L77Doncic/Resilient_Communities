# 智慧应急网站系统设计规格（System Design Spec）

## 1. 设计目标

本规格用于指导“智慧应急——气候变化背景下的韧性社区”网站实现，确保：

1. 叙事完整：从风险认知到行动方案再到参与评价。
2. 视觉统一：严格继承 `DESIGN.md` 的 Clay 风格体系。
3. 交互高效：现场扫码用户可在 3 分钟内完成体验与评分。
4. 可运维：支持展期数据监测、导出与快速应急。

## 2. 信息架构（IA）

- `/` 首页（主题、导览、入口）
- `/learning` 风险认知
- `/solutions` 韧性方案
- `/lab` 互动实验室
- `/review` 评分点评
- `/results` 成果展示与下载
- `/about` 团队与方法说明
- `/admin` 管理台（登录后）

### 2.1 导航结构

1. 顶部导航：Home / Learning / Solutions / Lab / Review / Results / About
2. 右上 CTA：`开始体验`、`立即评分`
3. 移动端：767px 以下折叠菜单

## 3. 视觉系统落地（映射 DESIGN.md）

### 3.1 设计 Token

```css
:root {
  --bg-cream: #faf9f7;
  --text-black: #000000;
  --border-oat: #dad4c8;
  --border-oat-light: #eee9df;
  --muted-warm: #9f9b93;

  --matcha-600: #078a52;
  --slushie-500: #3bd3fd;
  --lemon-500: #fbbd41;
  --ube-800: #43089f;
  --pomegranate-400: #fc7981;
  --blueberry-800: #01418d;

  --shadow-clay: rgba(0,0,0,.1) 0 1px 1px,
                 rgba(0,0,0,.04) 0 -1px 1px inset,
                 rgba(0,0,0,.05) 0 -.5px 1px;
  --shadow-hard: rgb(0,0,0) -7px 7px;
}
```

### 3.2 字体层级

1. 标题：Roobert 600（应用 `ss01 ss03 ss10 ss11 ss12`）
2. UI：Roobert 500
3. 正文：Roobert 400
4. 技术标签：Space Mono

### 3.3 组件规则

1. 卡片圆角：24px
2. 大区块圆角：40px
3. 边框：`1px solid #dad4c8`，装饰可用 `dashed`
4. 按钮悬停：`rotateZ(-8deg) translateY(-80%) + hard shadow`
5. 焦点态：`2px solid rgb(20,110,245)`

## 4. 页面级设计

## 4.1 首页 `/`

### 目标
- 30 秒内让用户理解主题与玩法。

### 区块
1. Hero：主题标题 + 展出信息 + 双 CTA
2. Why Now：气候变化与社区风险数据摘要
3. Experience Map：4 大模块流程引导
4. Quick Start：扫码即玩 + 即评

### 交互
- Hero CTA 使用标志性旋转悬停
- 滚动触发分段 reveal（不使用炫技型动画）

## 4.2 风险认知 `/learning`

### 内容
1. 气候风险类型（高温、暴雨、城市内涝、次生灾害）
2. 社区脆弱性维度（人口、建筑、基础设施、治理）
3. 认知误区与科普纠偏

### 组件
- 数据卡片（24px 圆角）
- 对比图卡（前后变化）
- 常见问题折叠面板

## 4.3 韧性方案 `/solutions`

### 内容结构
1. 家庭层：应急包、断电断网预案
2. 校园层：避险动线、演练机制
3. 社区层：网格协作、物资节点
4. 城市层：早预警联动、数字孪生辅助

### 展示方式
- 横向场景切换 + 对应行动清单
- 每个场景给出“低成本 7 天行动计划”

## 4.4 互动实验室 `/lab`

### 模块 A：韧性自测
- 10 题以内
- 输出等级：初级/进阶/高韧性
- 生成个性化建议

### 模块 B：情景决策
- 突发天气情景卡片
- 多选决策后即时反馈

### 结果页
- 生成“我的韧性卡片”（可分享）

## 4.5 评分点评 `/review`

### 表单字段
1. 昵称（可匿名）
2. 身份标签（老师/同学/访客）
3. 评分项（1-5 分）：创新性、实用性、美观性、传播性
4. 文字点评（最多 300 字）
5. 提交确认（防重复）

### 反馈
- 提交成功动效 + 感谢页
- 显示实时均分与点评关键词云（可选）

## 4.6 成果展示 `/results`

1. 研究海报缩略图与放大查看
2. 核心结论卡片
3. PDF/图文下载入口

## 5. 数据模型

## 5.1 表：`review_entries`

- `id` (uuid)
- `nickname` (varchar 50)
- `role` (enum: teacher, student, visitor)
- `score_innovation` (int 1-5)
- `score_practicality` (int 1-5)
- `score_aesthetic` (int 1-5)
- `score_communication` (int 1-5)
- `comment` (varchar 300)
- `created_at` (timestamp)
- `fingerprint_hash` (varchar 128)

## 5.2 表：`lab_results`

- `id` (uuid)
- `session_id` (varchar 64)
- `resilience_level` (enum: basic, medium, high)
- `answers` (json)
- `recommendations` (json)
- `created_at` (timestamp)

## 6. API 设计（BFF）

1. `POST /api/reviews`
- 输入：评分表单
- 校验：字段长度、分值范围、频率限制
- 输出：提交结果 + 当前均分摘要

2. `GET /api/reviews/stats`
- 输出：均分、维度分布、评论数量

3. `POST /api/lab/submit`
- 输入：答题结果
- 输出：韧性等级与建议

4. `GET /api/admin/export`
- 权限：管理员
- 输出：CSV（评分与点评）

## 7. 安全与合规

1. 输入清洗：过滤脚本注入与敏感词。
2. 限流：同设备短时多次提交拦截。
3. 隐私：不收集手机号等高敏个人信息。
4. 审核：管理端支持评论隐藏与导出存档。

## 8. 性能与可访问性

1. 首屏资源预算：JS < 220KB（gzip 目标）
2. 图片策略：WebP + 响应式尺寸 + 懒加载
3. 字体策略：子集化 + `font-display: swap`
4. 可访问性：
- 颜色对比符合 WCAG AA
- 按钮/输入支持键盘焦点
- 关键图形有文本替代

## 9. AI 智能体工作流

1. 内容智能体
- 输入：主题、受众、模块目标
- 输出：科普文案草稿与多版本标题

2. 交互智能体
- 输入：页面目标与用户路径
- 输出：交互脚本与动效建议（符合 `DESIGN.md`）

3. 评测智能体
- 输入：测试场景（移动端、弱网、并发提交）
- 输出：缺陷清单与优先级

4. 运营智能体
- 输入：展期每日数据
- 输出：讲解优化建议与热点问题汇总

## 10. 开发任务拆分（可直接进入实现）

1. 初始化工程与 Token 体系
2. 构建导航、按钮、卡片、表单基础组件
3. 完成 6 个核心页面
4. 接入评分点评 API 与存储
5. 接入互动实验室逻辑
6. 管理台统计与导出
7. 联调与性能优化
8. 展前压测与应急预案演练

## 11. 展期运行策略（2026-05-12 至 2026-05-18）

1. 每日 09:00 前健康检查（链接、API、导出）
2. 每日 12:00 与 17:00 两次数据备份
3. 现场准备离线应急页二维码
4. 每日收摊前导出点评并更新次日讲解话术

