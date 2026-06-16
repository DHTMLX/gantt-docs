---
title: Vue Gantt 概览
sidebar_label: 概览
description: "对 Vue Gantt 的体系级概览：功能、数据流、事件、生命周期和自定义扩展点。"
---

# Vue Gantt 概览

Vue Gantt 是 DHTMLX Gantt 的官方 Vue 封装。它将 Vue 友好的组合模式与对底层 Gantt 引擎的完整访问相结合。

如果你需要先查看设置说明，请从 [Vue Gantt 快速入门](integrations/vue/quick-start.md) 开始。

## 认知模型

Vue Gantt 是对 DHTMLX Gantt 引擎的封装。这个封装为你提供一个 Vue 组件 API，但底层引擎仍然是图表行为和底层方法的来源。

封装层的三项主要职责：

- 通过 Vue 生命周期初始化并销毁 Gantt 实例
- 将选定的 Vue props 同步到当前 Gantt 实例
- 暴露封装特定的扩展点（`events`、`@ready`、`customLightbox`、`inlineEditors`、composables）

这意味着在大多数集成工作中你可以保持声明式，并在需要时降至 `instance`。

## 核心能力

封装覆盖基本和高级集成场景：

- 通过 props 进行声明式设置（`config`、`templates`、`plugins`、`theme`、`locale`）
- 对 `tasks`、`links` 以及高级数据存储（`resources`、`resourceAssignments`、`baselines`）的数据同步
- 通过 `events` 映射进行事件连线
- 通过 `@ready` 实现一次性生命周期钩子
- 基于 Vue 的自定义钩子（`customLightbox`、`inlineEditors`、`modals`）
- 用于可复用模式的类型化帮助函数和组合式函数

## 场景：基础封装设置

使用 props 进行图表配置和模板自定义。

~~~vue
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  defineGanttConfig,
  defineGanttTemplates,
  type SerializedLink,
  type SerializedTask
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

const tasks = ref<SerializedTask[]>([
  {
    id: 1,
    text: "Project",
    start_date: new Date(2026, 0, 5),
    duration: 5,
    open: true,
    parent: 0
  }
]);
const links = ref<SerializedLink[]>([]);

const config = defineGanttConfig({
  scales: [
    { unit: "month", step: 1, format: "%F, %Y" },
    { unit: "day", step: 1, format: "%d %M" }
  ]
});

const templates = defineGanttTemplates({
  task_text: (_start, _end, task) => `#${task.id}: ${task.text}`
});
</script>

<template>
  <div style="height: 520px;">
    <VueGantt :tasks="tasks" :links="links" :config="config" :templates="templates" />
  </div>
</template>
~~~

如需查看完整的 prop 列表，请使用 [Configuration Reference](integrations/vue/configuration-props.md)。

## 选择数据拥有权模型

封装层会将传入的 props 同步到当前实例。主要的决策在于你的应用将数据作为权威数据的来源放在哪里。

- **以 Vue 的状态/Store 作为事实来源**：封装回调（`data.save` / `data.batchSave`）会更新你的状态，然后更新后的 props 会回传给封装层。
- **以 Gantt 作为事实来源**：Gantt 与后端掌握主要数据生命周期；Vue 的 props 在实时图表状态中使用较少。

当 Vue 拥有数据时，偏好使用 `SerializedTask[]` 和 `SerializedLink[]` 作为响应式状态和载荷的类型定义。

同步行为摘要：

- 任务/链接更新通常基于差异(diff)
- 对于较大的变更，封装层可以切换为重置/重新解析
- 高级存储（`resources`、`resourceAssignments`、`baselines`）通过它们的数据存储进行同步

有关权衡与回调契约，请参阅 [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)。

## 处理事件与启动逻辑

使用 `events` 映射来处理 Gantt 事件，使用 `@ready` 在初始化后进行一次性设置。

~~~vue
<script setup lang="ts">
import { defineGanttEvents, type GanttStatic } from "@dhtmlx/trial-vue-gantt";

const events = defineGanttEvents({
  onTaskCreated: task => {
    console.log("task created", task);
    return true;
  },
  onBeforeLightbox: taskId => {
    console.log("before lightbox", taskId);
    return true;
  }
});

const onReady = (instance: GanttStatic) => {
  console.log("ready", instance);
};
</script>

<template>
  <VueGantt :events="events" @ready="onReady" />
</template>
~~~

请使用 `events` 进行交互行为。对需要实时实例的初始化逻辑，请使用 `@ready`。

## 跨越命令式边界

需要通过 props 难以建模的方法时，使用组件引用（ref）来调用方法。

~~~vue
<script setup lang="ts">
import { onMounted, ref } from "vue";
import VueGantt, { type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);

onMounted(() => {
  const gantt = ganttRef.value?.instance;
  if (!gantt) return;
  gantt.showDate(new Date());
});
</script>

<template>
  <VueGantt ref="ganttRef" />
</template>
~~~

如果通过 `instance` 修改了任务/链接数据，请保持外部状态同步。否则下一个 prop 更新可能会覆盖这些更改。

## 高级扩展点

### 自定义 lightbox 组件

用一个 Vue 组件替换内置的任务表单：

~~~vue
<VueGantt :tasks="tasks" :links="links" :customLightbox="CustomLightbox" :data="data" />
~~~

### 自定义行内编辑器

将 Gantt 的行内编辑器名称映射到 Vue 组件：

~~~vue
<VueGantt :config="config" :inlineEditors="inlineEditors" :data="data" />
~~~

### 自定义删除确认流程

通过 `modals` 覆盖删除确认：

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete ${task.text}?`)) callback();
  }
};
~~~

### 任务与资源筛选

使用 `filter` 进行任务筛选，使用 `resourceFilter` 进行资源面板筛选。

## 公共示例场景映射

这些封装特性在公开示例路由中有所覆盖。可以从 GitHub 上的 [`vue-gantt-examples`](https://github.com/DHTMLX/vue-gantt-examples) 本地运行，或尝试 [在线演示](https://dhtmlx.github.io/vue-gantt-examples/)。
- `basic-init`：基线属性、配置和模板
- `templates`：主题/语言切换、基于 Vue 的 `h()`-基列模板、网格端筛选、通过实例实现的展开/折叠
- `custom-form`：`customLightbox`
- `custom-edit-view`：基于事件驱动的外部编辑流程
- `inline-editors`：Vue 行内编辑映射
- `auto-scheduling`：`plugins.auto_scheduling` + `critical_path` 与 `useWorkTime`
- `resource-panel`：resources + `resourceFilter`
- `state-management`：Pinia 存储驱动的更新
- `export-data`：使用导出插件的命令式操作

## 相关文档

- [Configuration Reference](integrations/vue/configuration-props.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)
- [DHTMLX Gantt Guides](guides.md)