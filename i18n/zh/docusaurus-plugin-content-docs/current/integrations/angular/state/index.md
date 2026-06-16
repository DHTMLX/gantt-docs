---
title: "数据与状态管理"
description: "如何在 Angular Gantt 中选择并实现由 Angular 管理或由 Gantt 管理的数据流。"
---

本节介绍如何在 Angular Gantt 中保持数据与您的 Angular UI、RxJS 存储，以及后端行为的一致性。

## 从这里开始

请先阅读 [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)。

那篇文章解释了：

- Angular state/store 作为唯一数据源，
- Gantt 作为唯一数据源，
- `data.save` 与 `data.batchSave` 回调契约。

## 选择您的数据拥有权模型

当使用以下情形时，使用 **Angular state 或 store 作为唯一数据源**：

- 周边的 Angular UI 必须始终反映图表状态，
- 您正在使用一个 RxJS 服务/存储或集中式状态层，
- 可预测的单向更新比原始编辑吞吐量更重要。

当使用以下情形时，使用 **Gantt 作为唯一数据源**：

- 页面以图表为中心，
- 更新量较大，
- 希望减少应用程序存储在频繁图表端变更时的抖动。

## RxJS 教程

请使用 [Using Angular Gantt with RxJS](integrations/angular/state/rxjs.md) 进行围绕 `BehaviorSubject`, `AsyncPipe`, 撤销/重做，以及 `data.batchSave` 构建的实际基于存储驱动的实现。

## 最小起步模式

~~~ts
readonly dataConfig: AngularGanttDataConfig = {
  batchSave: (changes) => this.ganttState.applyBatch(changes),
};
~~~

其中 `ganttState` 是注入的 `GanttStateService`（有关服务结构，请参阅 [RxJS tutorial](integrations/angular/state/rxjs.md)）。当一次用户操作可能生成大量任务/链接更新时，使用此模式。

## 性能说明

对于诸如自动排程之类的操作，请偏好使用 `data.batchSave`，而不是逐项变化的 `data.save`，以便 Angular 状态更新以分组批量的方式发生。

回调形状和取舍在 [Basics](integrations/angular/state/state-management-basics.md#callback-contracts) 中有说明。