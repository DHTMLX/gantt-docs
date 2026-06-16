--- 
title: 数据绑定与 Vue Gantt 的状态管理
sidebar_label: 基础
description: "为 Vue Gantt 选择一个数据所有权模型、连接保存回调，并避免状态同步陷阱。"
---

# 数据绑定与 Vue Gantt 的状态管理

本指南帮助你选择应用在哪些地方拥有 Gantt 数据，以及如何保持图表编辑的同步。请在每个页面上只选用一个所有权模型并保持一致。

Vue Gantt 支持两种常见模型：

1. **Vue state/store 作为真相源**（大多数应用的最佳默认值）
2. **Gantt 作为真相源**（面向图表密集页面的性能优化）

## 思维模型

包装器会将 props 同步到一个实时的 Gantt 实例中。若用户在图表中编辑数据，你需要决定：

- 是通过包装器回调来更新 Vue 状态（Vue 自有模型），还是
- 让图表/后端直接处理变更（Gantt 自有模型）

主要的陷阱在于所有权混合。如果 Vue 和 Gantt 实例都充当真相源，数据过时而被覆盖的情况很可能发生。

## Vue State Or Store As Source Of Truth

在此模型中：

- Vue 状态（或 Pinia）拥有 `tasks` 和 `links`
- 包装器通过 props 接收数组
- 图表编辑通过 `data.save` 或 `data.batchSave` 捕获
- 回调处理程序更新状态
- 更新后的状态会回流到包装器

此模型的类型建议：对响应式状态数组使用 `SerializedTask[]` 和 `SerializedLink[]`。

### Best For

- 需要 Vue UI 环绕且必须反映图表状态的页面
- 已经使用 Pinia 或集中状态层的应用
- 需要可预测的单向数据流的团队

### Tradeoffs

- 对于繁重操作，需要更多应用状态更新
- 当在一个图表操作中发生多次编辑时，需要更多的同步工作

### Avoid These Patterns

- 通过 `instance` 修改 task/link 数据，同时继续从 Vue 状态传递过时的数组
- 忽略包装器回调，期望图表编辑会自动保留在 Vue 状态中

### Example: Store/Vue-Owned Flow

~~~vue
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  type SerializedLink,
  type SerializedTask,
  type VueGanttDataConfig
} from "@dhtmlx/trial-vue-gantt";

const tasks = ref<SerializedTask[]>([]);
const links = ref<SerializedLink[]>([]);

const data: VueGanttDataConfig = {
  save: (entity, action, item, id) => {
    if (entity === "task") {
      if (action === "create") tasks.value = [...tasks.value, item as SerializedTask];
      if (action === "update") tasks.value = tasks.value.map(t => String(t.id) === String(id) ? item as SerializedTask : t);
      if (action === "delete") tasks.value = tasks.value.filter(t => String(t.id) !== String(id));
    }

    if (entity === "link") {
      if (action === "create") links.value = [...links.value, item as SerializedLink];
      if (action === "update") links.value = links.value.map(l => String(l.id) === String(id) ? item as SerializedLink : l);
      if (action === "delete") links.value = links.value.filter(l => String(l.id) !== String(id));
    }
  }
};
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :data="data" />
</template>
~~~

对于多变更操作，请切换到 `data.batchSave`，并在分组批次中应用变更。

## Gantt As Source Of Truth

在此模型中，图表和后端掌控大多数数据生命周期操作。Vue 较少进行实时镜像。

### Best For

- 非常大的数据集
- 大量自动排程或批量更新流程
- 以图表为焦点的页面，外部 UI 不需要对每一次实时变更立即生效

### Tradeoffs

- Vue state/store 中对实时图表状态的可见性较低
- 如果偶尔将 prop 快照回推到包装器，需要更强的自律

### Avoid These Patterns

- 在没有对齐策略的情况下部分 Vue 镜像
- 在用户编辑图表后重新喂入过时的服务器快照

### Example: Gantt-Owned Transport

~~~vue
<script setup lang="ts">
import VueGantt from "@dhtmlx/trial-vue-gantt";

const data = {
  load: "/api/gantt/load",
  save: async (entity: string, action: string, payload: any, id: string | number) => {
    const response = await fetch(`/api/gantt/${entity}`, {
      method: action === "delete" ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, payload, id })
    });

    // Create handlers should return the persistent ID when backend remaps it.
    return await response.json();
  }
};
</script>

<template>
  <VueGantt :data="data" />
</template>
~~~

## Callback Contracts

本节介绍在两种所有权模型中使用的包装器回调形状。

### `data.save`

`save` 会传递给 `gantt.createDataProcessor(save)`，一次接收一个变更。

典型函数形状：

~~~ts
(entity: string, action: string, data: any, id: string | number) => any
~~~

在变更大多为单一且易于逐一处理时使用。

### `data.batchSave` {#databatchsave}

`batchSave` 接收按四个数据类型分组的变更：

~~~ts
interface BatchChanges {
  tasks?: DataCallbackChange[];
  links?: DataCallbackChange[];
  resources?: DataCallbackChange[];
  resourceAssignments?: DataCallbackChange[];
}
~~~

遍历你关心的任意桶 - 包装器会从 Gantt 的逐变更事件自动填充它们。

队列行为摘要：

- 近端刷新批处理
- `create` + `update` 可以合并为一个带有最新有效载荷的 `create`
- `create` + `delete` 可以从批处理中移除
- payload 中会剥离内部的 `!nativeeditor_status`

在一个用户操作可产生多次更新时使用（例如自动排程）。

## ID Remapping And Backend Responsibility

创建操作通常以临时的客户端ID 开始。

- 在 `save` 模式下，后端响应应返回持久化的 ID，以便 Gantt 可以重新映射记录。
- 在 `batchSave` 模式下，没有逐项返回路径。如果服务器分配了 ID，请在你的持久化工作流中显式处理重新映射。

两种模式下后端职责保持不变：

- 验证传入的载荷
- 强制执行权限
- 持久化权威 ID
- 返回你所选传输模式期望的数据结构

## 下一步阅读

- [在 Pinia 中使用 Vue Gantt](integrations/vue/state/pinia.md)
- [配置参考](integrations/vue/configuration-props.md)
- [自定义模式](integrations/vue/customization-patterns.md)