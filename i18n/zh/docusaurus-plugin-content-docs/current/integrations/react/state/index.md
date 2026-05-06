--- 
title: "数据与状态管理"
description: "如何将 React Gantt 绑定到 React 状态或状态管理器，处理用户编辑，并在 React 管理的数据模型与 Gantt 管理的数据模型之间进行选择。"
---

本节介绍如何让 Gantt 数据与应用程序状态保持同步。内容包括：推荐的 React 驱动模型（React 或把 store 作为真相来源）、以性能为重点的 Gantt 管理模型，以及对流行状态库的实际实现。

## Start here

请先阅读以下内容，以了解两种受支持的数据模型与常见的集成模式：

- [数据绑定与状态管理基础](integrations/react/state/state-management-basics.md)

它解释如何使用 `data.save` 和 `data.batchSave` 回调、加载如何融入到每个模型，以及 Gantt 内部管理数据时会发生哪些变化。

## Pick your state library

下面的每个教程都应用相同的核心模式（state -> props -> Gantt，changes -> callbacks -> state），但使用各自库的惯用法：

- [Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Zustand](integrations/react/state/zustand.md)
- [MobX](integrations/react/state/mobx.md)
- [XState](integrations/react/state/xstate.md)
- [Jotai](integrations/react/state/jotai.md)
- [Valtio](integrations/react/state/valtio.md)
- [TanStack Query](integrations/react/state/tanstack-query.md)

## Real-time sync

如果需要实时更新，请从这里开始：

- [Firebase Integration](integrations/react/firebase-integration.md)

## Performance notes

如果你的应用执行大规模操作（自动排程、批量编辑、大型数据集），请关注：

- 使用 `data.batchSave` 以降低更新开销，
- 当 React 不需要立即反映每个变更时，使用 **Gantt-managed data** 模型。

这两个主题都在 [数据绑定与状态管理基础](integrations/react/state/state-management-basics.md) 中介绍。