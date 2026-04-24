---
title: "React Gantt"
sidebar_label: React Gantt
description: "在 React 中使用官方封装来安装、配置和使用 DHTMLX Gantt。"
image: /img/frameworks/react.png
---

React Gantt 是 DHTMLX Gantt 的官方 React 封装。它使你能够将甘特图作为一个 React 组件使用，同时仍然支持完整的配置 API。

如果你想要获得关于 React Gantt 的工作原理及其提供的功能的完整描述，请从 [概览](integrations/react/overview.md) 开始。

## 入门

:::tip AI 辅助开发
如果你使用 AI 代码助手， [DHTMLX React Gantt agent skill](integrations/ai-tools/agent-skills.md#available-skills) 可以帮助它遵循正确的集成模式并避免常见错误。要获取实时 API 参考，请连接 [DHTMLX MCP server](integrations/ai-tools/mcp-server.md)。
:::

如果你是该封装的新用户，请按以下顺序操作：

1. [安装](integrations/react/installation.md) - 选择 React Gantt 的 Evaluation（公开 npm）或 Professional（私有 npm）版本。
2. [快速入门](integrations/react/quick-start.md) - 渲染你的第一个甘热图并验证设置。
3. [配置](integrations/react/overview.md) - 了解如何使用 props、模板和事件处理程序。

## 框架集成

如果你的应用是用元框架构建的，请使用下面的指南来获得框架相关的设置：

- [Next.js](integrations/react/nextjs.md) - 客户端组件设置与常见的 SSR 限制
- [Remix](integrations/react/remix.md) - 基于路由的设置与集成说明

## 选择数据绑定模型

React Gantt 支持两种数据绑定方法：

- **React 管理的数据**（大多数 React 应用的推荐方案）
你将任务/链接保存在 React 中或在状态管理器中，将它们作为 props 传递，并通过 `data.save`/`data.batchSave` 回调来处理更新。

- **Gantt 管理的数据**（在专业化、对性能敏感的场景中有用）
你只需初始化数据一次，让 Gantt（以及你的后端）来拥有数据生命周期。React 不会在每次变更后重新应用更新的 props。

要理解这两种方法及其取舍，请阅读 [数据绑定与状态管理基础](integrations/react/state/state-management-basics.md)。

## 数据与状态教程

如果你使用状态管理库，[数据绑定与状态管理](integrations/react/state.md) 的指南展示了为每个库（Redux Toolkit、Zustand、MobX 等）实现的相同集成模式，以及与 Firebase 的实时同步。

## 示例与评估资源

如果你正在评估 React Gantt，评估页面在评估期间提供技术支持。请参阅 [安装](integrations/react/installation.md)。