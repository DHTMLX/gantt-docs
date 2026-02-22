---
title: Quick Start with Vue Gantt
sidebar_label: Quick Start
description: "Step-by-step guide to render the official Vue Gantt wrapper in a Vue 3 + Vite app."
---

# Quick Start with Vue Gantt

This quick start uses Vue 3 + Vite and the official wrapper package. It gives you a minimal setup that already includes `data.save` callback wiring.

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

Create `src/demoData.ts`:

~~~ts title="src/demoData.ts"
import type { Link, Task } from "@dhtmlx/trial-vue-gantt";

export const tasks: Task[] = [
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

export const links: Link[] = [{ id: 1, source: 1, target: 2, type: "0" }];
~~~

## 4. Render The Wrapper Component

Replace `src/App.vue`:

~~~vue title="src/App.vue"
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  type Link,
  type Task,
  type VueGanttDataConfig
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { links as initialLinks, tasks as initialTasks } from "./demoData";

const tasks = ref<Task[]>(initialTasks);
const links = ref<Link[]>(initialLinks);

const data: VueGanttDataConfig = {
  save: (entity, action, item, id) => {
    console.log("save", { entity, action, item, id });
  }
};
</script>

<template>
  <div style="height: 100vh; width: 100vw;">
    <VueGantt :tasks="tasks" :links="links" :data="data" />
  </div>
</template>
~~~

If you use the professional package, replace both imports:

- `@dhtmlx/trial-vue-gantt` -> `@dhx/vue-gantt`
- `@dhtmlx/trial-vue-gantt/dist/vue-gantt.css` -> `@dhx/vue-gantt/dist/vue-gantt.css`

## 5. Start The App

~~~bash
npm run dev
~~~

Open the local Vite URL. You should see a working Gantt chart and console logs when you edit tasks or links.

## 6. (Optional) Replace Logging With Local Save Handling

Use this when you want Vue state to stay in sync with chart edits before adding a backend or store.

~~~ts
const data: VueGanttDataConfig = {
  save: (entity, action, item, id) => {
    if (entity === "task") {
      if (action === "create") tasks.value = [...tasks.value, item as Task];
      if (action === "update") tasks.value = tasks.value.map(t => String(t.id) === String(id) ? item as Task : t);
      if (action === "delete") tasks.value = tasks.value.filter(t => String(t.id) !== String(id));
    }

    if (entity === "link") {
      if (action === "create") links.value = [...links.value, item as Link];
      if (action === "update") links.value = links.value.map(l => String(l.id) === String(id) ? item as Link : l);
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
