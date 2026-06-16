---  
title: Vue Gantt + Pinia 教程  
sidebar_label: Pinia  
description: "逐步 Pinia 集成到 Vue Gantt：存储结构、回调接线，以及可选的存储级撤销/重做。"  
---

# Vue Gantt + Pinia 教程

本教程展示了使用 Pinia 的基于存储驱动的 Vue Gantt 集成。它遵循公开 Vue 示例的相同架构：存储拥有 `tasks` 和 `links`，包装回调将图表的编辑推回存储中。

## 先决条件

- Vue 3 项目  
- 安装了 Pinia（或有权限添加）  
- 安装了 Vue Gantt 包  
- 阅读基础的 [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)

## 1. 安装并注册 Pinia

如果尚未安装 Pinia：

~~~bash
npm install pinia
~~~

在 `src/main.ts` 中注册 Pinia：

~~~ts title="src/main.ts"
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

createApp(App).use(createPinia()).mount("#app");
~~~

## 2. 安装 Vue Gantt

按照 [Vue Gantt installation guide](integrations/vue/installation.md) 的描述安装 Vue Gantt。

在本教程中我们使用评估包：

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

或者

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

如果你已经使用 Professional 包，请在命令和导入中将 `@dhtmlx/trial-vue-gantt` 替换为 `@dhx/vue-gantt`。

## 3. 添加演示数据

创建 `src/demoData.ts`：

~~~ts title="src/demoData.ts"
import type { SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";

export const tasks: SerializedTask[] = [
  {
    id: 1,
    text: "Office itinerancy",
    type: "project",
    start_date: new Date(2026, 0, 5),
    duration: 10,
    progress: 0.4,
    open: true,
    parent: 0
  },
  {
    id: 2,
    text: "Planning",
    start_date: new Date(2026, 0, 5),
    duration: 4,
    progress: 0.6,
    parent: 1
  }
];

export const links: SerializedLink[] = [{ id: 1, source: 1, target: 2, type: "0" }];
~~~

## 4. 创建一个基本的 Gantt 存储

创建 `src/stores/ganttStore.ts`：

~~~ts title="src/stores/ganttStore.ts"
import { defineStore } from "pinia";
import type { BatchChanges, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";
import { links, tasks } from "../demoData";

type ZoomLevel = "day" | "month" | "year";

const zoomLevels = [
  {
    name: "day",
    scale_height: 27,
    min_column_width: 80,
    scales: [{ unit: "day", step: 1, format: "%d %M" }]
  },
  {
    name: "month",
    scale_height: 50,
    min_column_width: 120,
    scales: [
      { unit: "month", format: "%F, %Y" },
      { unit: "week", format: "Week #%W" }
    ]
  },
  {
    name: "year",
    scale_height: 50,
    min_column_width: 36,
    scales: [{ unit: "year", step: 1, format: "%Y" }]
  }
];

function applyBatchChanges(tasks: SerializedTask[], links: SerializedLink[], changes: BatchChanges) {
  let nextTasks = [...tasks];
  let nextLinks = [...links];

  for (const change of changes.tasks || []) {
    if (change.action === "create") nextTasks.push(change.data as SerializedTask);
    if (change.action === "update") {
      nextTasks = nextTasks.map(t => String(t.id) === String(change.id) ? change.data as SerializedTask : t);
    }
    if (change.action === "delete") {
      nextTasks = nextTasks.filter(t => String(t.id) !== String(change.id));
    }
  }

  for (const change of changes.links || []) {
    if (change.action === "create") nextLinks.push(change.data as SerializedLink);
    if (change.action === "update") {
      nextLinks = nextLinks.map(l => String(l.id) === String(change.id) ? change.data as SerializedLink : l);
    }
    if (change.action === "delete") {
      nextLinks = nextLinks.filter(l => String(l.id) !== String(change.id));
    }
  }

  return { tasks: nextTasks, links: nextLinks };
}

export const useGanttStore = defineStore("gantt", {
  state: () => ({
    tasks: tasks,
    links: links,
    zoomLevel: "day" as ZoomLevel
  }),
  getters: {
    config: state => ({
      zoom: {
        current: state.zoomLevel,
        levels: zoomLevels
      }
    })
  },
  actions: {
    setZoom(level: ZoomLevel) {
      this.zoomLevel = level;
    },
    applyBatch(changes: BatchChanges) {
      const next = applyBatchChanges(this.tasks, this.links, changes);
      this.tasks = next.tasks;
      this.links = next.links;
    }
  }
});
~~~  

此存储保持单一信息源：

- `tasks` 和 `links` 是规范数据
- `config` 是派生状态
- `applyBatch` 是包装回调的入口点

## 5. 将存储状态绑定到 `VueGantt`

创建 `src/components/GanttChart.vue`：

~~~vue title="src/components/GanttChart.vue"
<script setup lang="ts">
import { storeToRefs } from "pinia";
import VueGantt, { type BatchChanges } from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { useGanttStore } from "../stores/ganttStore";

const store = useGanttStore();
const { tasks, links, config, zoomLevel } = storeToRefs(store);

const data = {
  batchSave: (changes: BatchChanges) => store.applyBatch(changes)
};

const setZoom = (level: "day" | "month" | "year") => {
  store.setZoom(level);
};
</script>

<template>
  <section>
    <div style="display:flex; gap:8px; margin-bottom:10px;">
      <button type="button" :class="{ active: zoomLevel === 'day' }" @click="setZoom('day')">Day</button>
      <button type="button" :class="{ active: zoomLevel === 'month' }" @click="setZoom('month')">Month</button>
      <button type="button" :class="{ active: zoomLevel === 'year' }" @click="setZoom('year')">Year</button>
    </div>

    <div style="height: 80vh;">
      <VueGantt :tasks="tasks" :links="links" :config="config" :data="data" />
    </div>
  </section>
</template>
~~~  

这是核心包装接线：

- store 值 -> wrapper 属性
- `batchSave` -> 存储动作
- 存储动作 -> 新状态 -> wrapper 属性再次更新

## 6. 在应用外壳中渲染 Gantt

替换 `src/App.vue`：

~~~vue title="src/App.vue"
<script setup lang="ts">
import GanttChart from "./components/GanttChart.vue";
</script>

<template>
  <div :style="{ height: '100%', width: '100%' }">
    <GanttChart />
  </div>
</template>
~~~  

## 7. 验证数据流

使用以下流程确保更新是可预测的：

1. 存储暴露 `tasks`、`links`，以及派生的 `config`。  
2. `VueGantt` 从 props 渲染。  
3. 用户在图表中进行编辑会触发 `data.batchSave`。  
4. 存储动作（`applyBatch`）合并更改。  
5. 更新后的状态再回流到 `VueGantt`。

除非你也更新存储，否则不要将其与直接对实例的变更混用。

## 8.（可选）添加存储级撤销/重做

在希望实现撤销/重做的同时保持 Pinia 作为真实数据源时使用此方法。

在此模式下请勿启用 `gantt.plugins({ undo: true })`。

### 8.1 用历史版本替换 Store

用本版本替换步骤 2 的 Store。它将状态保持为 `SerializedTask[]` / `SerializedLink[]`，并在日期克隆中避免 `as any` 的类型转换。

~~~ts title="src/stores/ganttStore.ts"
import { defineStore } from "pinia";
import type { BatchChanges, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";
import { links, tasks } from "../demoData";

type ZoomLevel = "day" | "month" | "year";

type Snapshot = {
  tasks: SerializedTask[];
  links: SerializedLink[];
  zoomLevel: ZoomLevel;
};

type HistoryState = {
  tasks: SerializedTask[];
  links: SerializedLink[];
  zoomLevel: ZoomLevel;
  past: Snapshot[];
  future: Snapshot[];
  maxHistory: number;
};

const zoomLevels = [
  {
    name: "day",
    scale_height: 27,
    min_column_width: 80,
    scales: [{ unit: "day", step: 1, format: "%d %M" }]
  },
  {
    name: "month",
    scale_height: 50,
    min_column_width: 120,
    scales: [
      { unit: "month", format: "%F, %Y" },
      { unit: "week", format: "Week #%W" }
    ]
  },
  {
    name: "year",
    scale_height: 50,
    min_column_width: 36,
    scales: [{ unit: "year", step: 1, format: "%Y" }]
  }
];

function applyBatchChanges(tasks: SerializedTask[], links: SerializedLink[], changes: BatchChanges) {
  let nextTasks = [...tasks];
  let nextLinks = [...links];

  for (const change of changes.tasks || []) {
    if (change.action === "create") nextTasks.push(change.data as SerializedTask);
    if (change.action === "update") {
      nextTasks = nextTasks.map(t => String(t.id) === String(change.id) ? change.data as SerializedTask : t);
    }
    if (change.action === "delete") {
      nextTasks = nextTasks.filter(t => String(t.id) !== String(change.id));
    }
  }

  for (const change of changes.links || []) {
    if (change.action === "create") nextLinks.push(change.data as SerializedLink);
    if (change.action === "update") {
      nextLinks = nextLinks.map(l => String(l.id) === String(change.id) ? change.data as SerializedLink : l);
    }
    if (change.action === "delete") {
      nextLinks = nextLinks.filter(l => String(l.id) !== String(change.id));
    }
  }

  return { tasks: nextTasks, links: nextLinks };
}

const cloneDate = (value: Date | string | undefined): Date | string | undefined => {
  if (value instanceof Date) return new Date(value.getTime());
  return value;
};

const cloneTask = (task: SerializedTask): SerializedTask => {
  const next: SerializedTask = { ...task };
  next.start_date = cloneDate(task.start_date);
  next.end_date = cloneDate(task.end_date);
  return next;
};

const cloneLink = (link: SerializedLink): SerializedLink => ({ ...link });

const createSnapshot = (state: HistoryState): Snapshot => ({
  tasks: state.tasks.map(cloneTask),
  links: state.links.map(cloneLink),
  zoomLevel: state.zoomLevel
});

export const useGanttStore = defineStore("gantt", {
  state: () => ({
    tasks: tasks,
    links: links,
    zoomLevel: "day" as ZoomLevel,
    past: [] as Snapshot[],
    future: [] as Snapshot[],
    maxHistory: 50
  }),
  getters: {
    config: state => ({
      zoom: {
        current: state.zoomLevel,
        levels: zoomLevels
      }
    }),
    canUndo: state => state.past.length > 0,
    canRedo: state => state.future.length > 0
  },
  actions: {
    pushHistory() {
      this.past = [...this.past, createSnapshot(this as HistoryState)];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.future = [];
    },
    restoreSnapshot(snapshot: Snapshot) {
      this.tasks = snapshot.tasks.map(cloneTask);
      this.links = snapshot.links.map(cloneLink);
      this.zoomLevel = snapshot.zoomLevel;
    },
    setZoom(level: ZoomLevel) {
      if (this.zoomLevel === level) return;
      this.pushHistory();
      this.zoomLevel = level;
    },
    applyBatch(changes: BatchChanges) {
      const hasChanges = (changes.tasks?.length ?? 0) > 0 || (changes.links?.length ?? 0) > 0;
      if (!hasChanges) return;

      this.pushHistory();
      const next = applyBatchChanges(this.tasks, this.links, changes);
      this.tasks = next.tasks;
      this.links = next.links;
    },
    undo() {
      if (this.past.length === 0) return;

      const previous = this.past[this.past.length - 1];
      const current = createSnapshot(this as HistoryState);

      this.past = this.past.slice(0, -1);
      this.future = [current, ...this.future];
      this.restoreSnapshot(previous);
    },
    redo() {
      if (this.future.length === 0) return;

      const next = this.future[0];
      const current = createSnapshot(this as HistoryState);

      this.future = this.future.slice(1);
      this.past = [...this.past, current];
      if (this.past.length > this.maxHistory) {
        this.past = this.past.slice(this.past.length - this.maxHistory);
      }
      this.restoreSnapshot(next);
    }
  }
});
~~~  

### 8.2 在组件中添加 Undo/Redo 按钮

更新 `src/components/GanttChart.vue`：

~~~vue title="src/components/GanttChart.vue"
<script setup lang="ts">
import { storeToRefs } from "pinia";
import VueGantt, { type BatchChanges } from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { useGanttStore } from "../stores/ganttStore";

const store = useGanttStore();
const { tasks, links, config, zoomLevel, canUndo, canRedo } = storeToRefs(store);

const data = {
  batchSave: (changes: BatchChanges) => store.applyBatch(changes)
};

const setZoom = (level: "day" | "month" | "year") => {
  store.setZoom(level);
};
</script>

<template>
  <section>
    <div style="display:flex; gap:8px; margin-bottom:10px;">
      <button type="button" :disabled="!canUndo" @click="store.undo()">Undo</button>
      <button type="button" :disabled="!canRedo" @click="store.redo()">Redo</button>
      <button type="button" :class="{ active: zoomLevel === 'day' }" @click="setZoom('day')">Day</button>
      <button type="button" :class="{ active: zoomLevel === 'month' }" @click="setZoom('month')">Month</button>
      <button type="button" :class="{ active: zoomLevel === 'year' }" @click="setZoom('year')">Year</button>
    </div>

    <div style="height: 80vh;">
      <VueGantt :tasks="tasks" :links="links" :config="config" :data="data" />
    </div>
  </section>
</template>
~~~  

### 8.3 为什么使用 Store 级历史

这里使用 store 级历史，因为存储是事实上的唯一数据来源：

- Vue UI 和图表通过相同的状态转换保持同步
- `maxHistory` 保持内存使用有限
- 任何新的变更都会自动清除重做历史
- 你避免了两个独立的历史系统

## 结果

现在你拥有一个基于 Pinia 的集成，其中：

- Pinia 拥有 `tasks` 和 `links`
- `data.batchSave` 将图表的编辑应用到存储中
- `VueGantt` 根据存储状态重新渲染
- 可以在不将所有权切换给 Gantt 实例的情况下添加撤销/重做

## 常见陷阱

- 在图表编辑后用过时的 API 快照替换存储状态
- 使用 `data.save` 来执行高量级操作，而 `batchSave` 更合适
- 将存储所有权与直接对实例的变更混用，且不对齐状态
- 在开启内置 Gantt 撤销插件时同时启用存储级历史

## GitHub 演示仓库

一个符合本教程的完整工作示例项目可在 GitHub 上查看：[提供在 GitHub](https://github.com/DHTMLX/vue-gantt-pinia-starter).

## 下一步阅读

- [数据绑定与状态管理基础](integrations/vue/state/state-management-basics.md)
- [配置参考](integrations/vue/configuration-props.md)
- [Vue Gantt 概览](integrations/vue/overview.md)
- [自定义模式](integrations/vue/customization-patterns.md)