---
title: Quick Start with Vue Gantt
sidebar_label: Quick Start
description: "Step-by-step guide to render the official Vue Gantt wrapper in a Vue 3 + Vite app."
---

# Quick Start with Vue Gantt

Use this quick start to render Vue Gantt in a Vue 3 + Vite app with a dedicated Gantt component and `data.save` callback wiring.

## Prerequisites

- Node.js installed
- npm or Yarn
- Vue 3 project (this page shows how to create one with Vite)
- Vue Gantt package access (evaluation or professional)

## 1. Create A Vue 3 Project

~~~bash
npm create vite@latest vue-gantt-quick-start -- --template vue-ts
cd vue-gantt-quick-start
npm install
~~~

If you prefer Yarn, replace the install step with `yarn`.

## 2. Install Vue Gantt

Install the evaluation package:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

If you use the professional package, replace `@dhtmlx/trial-vue-gantt` with `@dhx/vue-gantt` in commands and imports.

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

## What To Read Next

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
