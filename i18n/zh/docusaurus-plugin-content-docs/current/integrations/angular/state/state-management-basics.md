---
title: 数据绑定与 Angular Gantt 的状态管理
sidebar_label: 基础
description: "在 Angular Gantt 中选择正确的数据所有权模型、实现回调契约，并避免同步陷阱。"
---

# Angular Gantt 中的数据绑定与状态管理

Angular Gantt 支持两种数据所有权模型：

1. **将 Angular state/store 作为真实数据源**（大多数应用推荐）。
2. **Gantt 作为真实数据源**（面向性能的专用页面）。

每个页/功能区域仅选择一种模型并保持一致。

## 将 Angular State/Store 作为真实数据源

在这种模型中：

- 你的组件状态或 RxJS store 拥有 `tasks` 和 `links`，
- 包装组件通过 inputs 接收数组，
- 图表变更通过 `data.save` 或 `data.batchSave` 捕获，
- 回调更新你的状态/存储，新的数组再流回到 `<dhx-gantt>`。

### 最适合

- 需要与图表保持同步的工具栏/表单的 Angular 页面，
- 已经围绕服务和 RxJS 构建的团队代码库，
- 可预测的状态转换和更容易调试。

### 权衡

- 对于大量图表操作，需要更多应用程序状态的更新，
- 在批量编辑期间需要更频繁的同步工作。

### 应避免的反模式

- 通过 `instance` 变更数据，同时仍从 Angular 状态推送陈旧的 `tasks`/`links` 数组，
- 忽略 `data.save` / `data.batchSave`，期望图表编辑会自动在应用状态中持久化。

### 完整流程示例（组件状态）

~~~ts
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
  type SerializedTask,
  type SerializedLink,
} from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links" [data]="dataConfig"></dhx-gantt>`,
})
export class GanttPageComponent {
  tasks: SerializedTask[] = [];
  links: SerializedLink[] = [];

  dataConfig: AngularGanttDataConfig = {
    save: (entity, action, item, id) => {
      if (entity === 'task') {
        if (action === 'create') this.tasks = [...this.tasks, item];
        if (action === 'update') this.tasks = this.tasks.map((t) => String(t.id) === String(id) ? { ...t, ...item } : t);
        if (action === 'delete') this.tasks = this.tasks.filter((t) => String(t.id) !== String(id));
      }

      if (entity === 'link') {
        if (action === 'create') this.links = [...this.links, item];
        if (action === 'update') this.links = this.links.map((l) => String(l.id) === String(id) ? { ...l, ...item } : l);
        if (action === 'delete') this.links = this.links.filter((l) => String(l.id) !== String(id));
      }
    },
  };
}
~~~

## Gantt 作为真实数据源

在此模型中，图表和后端拥有大部分运行时数据生命周期。

### 最适合

- 非常大的数据集，
- 以图表为中心的屏幕，
- 在频繁的自动排程或链式编辑中，后端更新应用商店成本较高。

### 权衡

- 在 Angular 服务/组件中对实时图表状态的可见性较低，
- 与命令式操作混合时需要额外的组织纪律。

### 应避免的反模式

- 没有明确的对齐计划就部分镜像，
- 用户在图表中已更改数据后重新喂入陈旧的服务器快照。

### 服务器传输示例

~~~ts
dataConfig = {
  load: '/api/gantt/load',
  save: async (entity: string, action: string, payload: any, id: string | number) => {
    const response = await fetch(`/api/gantt/${entity}`, {
      method: action === 'delete' ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload, id }),
    });

    return await response.json();
  },
};
~~~

在后端是权威状态拥有者且 Angular 不需要实时镜像每次编辑时使用此方案。

## 回调契约 {#callback-contracts}

### `data.save`

`save` 被传递给 `gantt.createDataProcessor(save)`，并接收逐变更的负载。

典型函数形状：

~~~ts
(entity: string, action: string, data: any, id: string | number) => any
~~~

当变更多为单一且易于逐一应用时使用。

### `data.batchSave`

`batchSave` 接收分组的负载：

~~~ts
interface BatchChanges {
  tasks?: DataCallbackChange[];
  links?: DataCallbackChange[];
  resources?: DataCallbackChange[];
  resourceAssignments?: DataCallbackChange[];
}
~~~

实体到桶的映射包括：

- `task` / `tasks` -> `tasks`
- `link` / `links` -> `links`
- `resource` / `resources` -> `resources`
- `assignment` / `resourceAssignment` / `resourceAssignments` -> `resourceAssignments`

队列行为摘要：

- 小型基于去抖的分组处理，
- `create` + `update` 合并为带有最新数据的一个 `create`，
- `create` + `delete` 被移除，
- 内部 `!nativeeditor_status` 从负载中移除。

在一个图表操作可以触发多项下游变更时使用。

## 将数据加载到 Angular 状态

### 本地组件状态

对于小型页面或原型，请使用本地组件字段。

在 Angular 中加载数据，然后将数组分配给 `tasks` 与 `links` 输入。将回调处理程序放在同一个组件中。

### RxJS 服务/存储（中大型应用推荐）

使用一个可注入的服务，带有 `BehaviorSubject`（或类似实现）来保存 `tasks`、`links` 和 UI 状态。

这是 Angular 公共示例中使用的模式，并在 [Using Angular Gantt with RxJS](integrations/angular/state/rxjs.md) 文档中有说明。

### 从 API 加载到 Angular 状态

典型流程：

1. 在服务或路由解析器中获取数据。
2. 如有需要，对日期格式进行标准化或映射。
3. 将数据推送到你的 store/组件状态。
4. 将数组传递给 `<dhx-gantt>`。
5. 使用 `data.save` 或 `data.batchSave` 处理编辑并将其持久化到后端。

当 Angular 状态是你的真实数据源，且后端仍然是长期持久化来源时使用。

## 在 Angular 应用中将 Gantt 作为真实数据源

### 何时此模型有意义

当页面大部分是图表本身，且周围的 Angular UI 不需要对每个任务/链接更新做出反应时，选择此模型。

### 提供初始数据

你可以使用以下任一模式来初始化 Gantt 管理的数据：

- `data.load` URL
- `data.load` 函数（同步或异步）
- 初始 `tasks`/`links` 数组，然后停止将它们视为实时的真实数据源输入

### 更新如何工作

Gantt 实例在内部应用用户更改，并通过 `save` 或 `batchSave` 发送。

Angular 不需要在每次更改后重新分配 `tasks`/`links`，除非你明确希望镜像它们。

## ID 重映射与后端职责

创建操作通常以临时的客户端 ID 开始。

- 在 `save` 模式下，后端响应应返回持久化的 IDs，以便 Gantt 可以重映射内部记录。
- 在 `batchSave` 模式下，没有逐项返回路径，因此如果后端分配了新的 ID，必须在你的持久化工作流中显式处理 ID 重映射。

后端仍然负责：

- 验证，
- 权限检查，
- 持久化 ID 分配，
- 一致的响应负载。

## 继续阅读

- [在 Angular Gantt 中使用 RxJS](integrations/angular/state/rxjs.md)
- [配置参考](integrations/angular/configuration-props.md)
- [Angular Gantt 概览](integrations/angular/overview.md)