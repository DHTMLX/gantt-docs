---
title: 使用 Vue Gantt 快速上手
sidebar_label: 快速上手
description: "逐步指南，演示在一个 Vue 3 + Vite 应用中渲染官方 Vue Gantt 封装。"
---

# Vue Gantt 快速上手

:::note
本教程涵盖 DHTMLX Gantt 的 Commercial、Enterprise 和 Ultimate 版本中包含的 Vue 封装。 
如果您使用的是免费的 Community 版本（v10+）、旧版 GPL 版本（v9.x及更早）或 Individual 版本，请按照替代指南： 
[如何开始使用 Vue](integrations/vue/js-gantt-vue.md)。
:::

The **Vue Gantt** 组件是 **DHTMLX Gantt** 的官方封装。 
本指南将带你创建一个小型的 Vue 3 + Vite 应用，并使用试用包渲染一个基本的甘特图。

If you're new to Vue, start with the official [Vue documentation](https://vuejs.org/guide/introduction.html). 

Check [a complete working project that follows this tutorial on GitHub](https://github.com/DHTMLX/vue-gantt-quick-start).

## Prerequisites

- Node.js 已安装
- npm 或 Yarn
- Vue 3 项目（本页演示如何用 Vite 创建一个）
- Vue Gantt 包访问（评估版或专业版）

## 1. Create A Vue 3 Project

~~~bash
npm create vite@latest vue-gantt-quick-start -- --template vue-ts
cd vue-gantt-quick-start
npm install
~~~

If you prefer Yarn, replace the install step with `yarn`.

## 2. Install Vue Gantt

Install Vue Gantt as described in the [Vue Gantt installation guide](integrations/vue/installation.md).

In this tutorial we use the evaluation package:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

or

~~~bash
yarn add @dhtmlx/trial-vue-gantt
~~~

If you already use the Professional package, replace `@dhtmlx/trial-vue-gantt` with `@dhx/vue-gantt` in the commands and imports.

## 3. Add Demo Data

Create `src/demoData.ts` (for externally-owned data in Vue state, prefer `SerializedTask` / `SerializedLink`):

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

## 4. Create A Gantt Component

Create `src/components/GanttChart.vue`:

~~~vue title="src/components/GanttChart.vue"
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  type SerializedLink,
  type SerializedTask,
  type VueGanttDataConfig
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { links as initialLinks, tasks as initialTasks } from "../demoData";

const tasks = ref<SerializedTask[]>(initialTasks);
const links = ref<SerializedLink[]>(initialLinks);

const data: VueGanttDataConfig = {
  save: (entity, action, item, id) => {
    console.log("save", { entity, action, item, id });
  }
};
</script>

<template>
  <div style="height: 100%; width: 100%;">
    <VueGantt :tasks="tasks" :links="links" :data="data" />
  </div>
</template>
~~~

If you use the professional package, replace both imports:

- `@dhtmlx/trial-vue-gantt` -> `@dhx/vue-gantt`
- `@dhtmlx/trial-vue-gantt/dist/vue-gantt.css` -> `@dhx/vue-gantt/dist/vue-gantt.css`

## 5. Render Gantt In The App Shell

Replace `src/App.vue`:

~~~vue title="src/App.vue"
<script setup lang="ts">
import GanttChart from "./components/GanttChart.vue";
</script>

<template>
  <div style="height: 100vh; width: 100vw;">
    <GanttChart />
  </div>
</template>
~~~

## 6. Start The App

~~~bash
npm run dev
~~~

Open the local Vite URL. You should see a working Gantt chart and console logs when you edit tasks or links.

If you are adding Gantt to an existing app, keep your current `App.vue` layout and render `<GanttChart />` in the target page/component. Make sure the parent layout provides a height to the Gantt area.

## 7. (Optional) Replace Logging With Local Save Handling

Use this when you want Vue state to stay in sync with chart edits before adding a backend or store. Update `src/components/GanttChart.vue`.

~~~ts
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
~~~

For multi-change operations (for example auto-scheduling), prefer `data.batchSave`.

## Result

You now have a Vue 3 app rendering the official Vue Gantt wrapper with:

- reactive `tasks` and `links` props
- wrapper CSS imported
- `data.save` callback wiring for user edits

This is the same minimal example used in the [GitHub demo project](https://github.com/DHTMLX/vue-gantt-quick-start).

## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/DHTMLX/vue-gantt-quick-start).

## What To Read Next

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)