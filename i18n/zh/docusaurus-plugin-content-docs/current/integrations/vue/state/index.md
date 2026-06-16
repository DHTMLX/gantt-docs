---
title: "数据与状态管理"
description: "如何在 Vue Gantt 中选择并实现由 Vue 管理或由 Gantt 管理的数据流。"
---

本节将解释如何让 Vue Gantt 的数据与您的 Vue UI、store 以及后端行为保持一致。

## 开始

请先阅读 [数据绑定与状态管理基础](integrations/vue/state/state-management-basics.md)。

该指南涵盖：

- Vue state/store 作为权威数据源
- Gantt 作为权威数据源
- `data.save` 与 `data.batchSave` 回调契约

## 选择您的数据归属模型

在以下情况使用 **Vue state 或 store 作为权威数据源**：

- 所在的 Vue UI 必须反映图表的最新状态
- 你已经使用 Pinia 或其他 store 作为权威状态
- 可预测的单向更新比原始编辑吞吐量更重要

在以下情况使用 **Gantt 作为权威数据源**：

- 页面以图表为中心
- 更新量较高
- 你希望减少为频繁的图表端变更而造成的 store 变动

## Pinia 教程

使用 [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md) 获取一个以 store 驱动实现、具备 `batchSave` 和可选的 store 级撤销/重做 的方案。

一个可运行的配套项目位于 [vue-gantt-pinia-starter on GitHub](https://github.com/DHTMLX/vue-gantt-pinia-starter)。

## 最简入门模式

~~~ts
const data = {
  batchSave: changes => ganttStore.applyBatch(changes)
};
~~~

在一个图表操作可能产生大量任务/链接更新时，请使用此模式。

## 性能注意

对于诸如自动排程等操作，优先使用 `data.batchSave`，而不是逐次变更的 `data.save`，以便状态更新在分组批处理中运行。

回调形式和取舍在 [Batch Save Contract](integrations/vue/state/state-management-basics.md#databatchsave) 文档中有说明。