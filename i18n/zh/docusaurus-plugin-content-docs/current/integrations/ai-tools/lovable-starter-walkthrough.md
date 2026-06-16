---
title: "React Gantt Lovable 入门演练"
sidebar_label: "Lovable 入门演练"
description: "在 Lovable 中使用固定的提示序列和 Supabase 后端来复现 DHTMLX React Gantt 项目规划器"
---

# React Gantt Lovable 入门演练

本指南说明如何在你自己的 Lovable 工作区中，复现 [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter)——一个带有 Supabase 后端的多项目规划器。已发布的仓库及其 [`docs/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/docs) 文件夹是权威来源；本页是解释各组成部分如何协同工作的入口。

若你希望进行一个不涉及 Supabase 的通用 Lovable + Gantt 演练，请参阅配套指南：[Lovable AI](integrations/ai-tools/lovable-ai.md)。

## 最终你将得到什么

一个可用的应用，包含：

- 一个带路由的外壳（Dashboard、Projects、Reports、Workload）
- 每个项目的 Gantt 工作区，含任务和链接的 CRUD
- 通过拖放实现的持久任务排序
- 撤销/重做 与 缩放控制
- 含周末高亮显示的工作日历
- 带工作量徽章的资源面板
- 一个仅用于演示的角色模型（viewer / editor / owner）
- 一个 Supabase 架构、演示策略和种子数据

该入门模板面向标准 Lovable 技术栈：React 18 + TypeScript + Vite + Tailwind + shadcn/ui，在此基础上额外引入 React Query、Redux Toolkit 与 Supabase。

## 前提条件

- 一个 Lovable 账号
- 一个 Supabase 项目（免费套餐已足够）
- 可选：若计划在本地运行结果，需要 Node.js 18+ 与 npm

## 使用本指南的两种方式

[`docs/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/docs) 文件夹面向两类受众：

1. **从零开始重现构建。** 将提示按顺序发送给 Lovable。你将得到相同的应用结构、相同的 Gantt 配置，以及相同的 Supabase 架构。如果你想学习这种模式，这是推荐路径。
2. **使用已发布的仓库作为起始模板。** 克隆 GitHub 仓库，将其指向你自己的 Supabase 项目，然后完全跳过 Lovable 提示。这种方式更快，若你只是想要一个可以直接运行的 starter。

## 在 Lovable 中重现构建

完整的提示序列在 [`docs/00-build-plan.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/docs/00-build-plan.md) 中。高层次流程如下：

1. 在发送第一条提示前，将 [`00-knowledge.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/docs/00-knowledge.md) 的内容粘贴到你在 Lovable 项目中的 Knowledge Base。这会锁定包名、CSS 导入、容器高度以及日期处理规则。
2. 运行提示 [`01-create-app-shell.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/docs/01-create-app-shell.md) 来搭建路由、导航和占位页面。
3. 在步骤 03 之前确定后端。入门模板使用 Supabase；如果你想要一个无后端的变体，可以跳过 Supabase 步骤，仅保留模拟数据。
4. 按顺序执行剩余的提示，范围从 `02` 到 `11`。每个提示覆盖一个功能领域（Gantt 核心、Supabase、CRUD、权限、浏览器验证、Gantt UX、工作日历、资源、最终验证、仪表板/报告/工作量页面）。

一次典型的执行在 11 个提示步骤内产出一个可运行的应用。具体的提示及其范围在仓库中进行版本控制。

## 你可能需要的手动修正

生成的代码往往不是第一次就完美，尤其是在 React 特定模式方面。仓库将原始构建过程中的每次手动编辑记录在 [`docs/00-manual-edits.md`](https://github.com/DHTMLX/react-gantt-lovable-starter/blob/main/docs/00-manual-edits.md) 中。把该文件视为已知问题列表，以及在生成输出偏离期望模式时，记录你自己的 Lovable 构建日志的一个示例。

当前记录的修复集合涵盖主题上下文连线、CRUD 边界处的 Gantt 日期归一化、Redux 快照的新鲜度、撤销/重做的持久化以及周末模板签名不匹配等问题。

## Supabase 设置

仓库中的 [`supabase/migrations`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/supabase/migrations) 文件夹包含按顺序排列的架构、演示策略和种子数据的 SQL 文件。请在 Supabase 的 SQL 编辑器中按顺序应用它们，然后在你的项目设置中填入三个 Vite 环境变量（`VITE_SUPABASE_URL`、`VITE_SUPABASE_PUBLISHABLE_KEY`、`VITE_SUPABASE_PROJECT_ID`）。

该架构支持多个项目，任务和链接按项目进行作用域管理，并且还包含一个 `project_members` 表，用于驱动演示用的角色模型。

## 走向生产环境

入门模板使用公开试用包 `@dhtmlx/trial-react-gantt`。当原型获得生产批准后，切换到商业包 `@dhx/react-gantt`；包替换的具体步骤请参阅 [Installing React Gantt](integrations/react/installation.md#moving-from-the-trial-package-to-the-commercial-one)。

入门模板中的权限仅用于演示。在向最终用户公开应用之前，请用真实身份验证替换演示身份验证流程。

## 下一步阅读

- [Lovable AI](integrations/ai-tools/lovable-ai.md) - 无后端的通用 Lovable + Gantt 工作流
- [DHTMLX MCP Server](integrations/ai-tools/mcp-server.md) - 将 MCP 连接到 Lovable 以获取准确的 API 参考
- [Agent Skills](integrations/ai-tools/agent-skills.md) - 继续在 Cursor 或 Claude Code 中编辑克隆仓库时应用相同的 DHTMLX 模式
- [Installing React Gantt](integrations/react/installation.md) - 私有注册表设置与试用包到商业包的切换
- [React Gantt Overview](integrations/react/overview.md) - 基础组件参考