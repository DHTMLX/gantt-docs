---
title: Quick Start with Vue Gantt
sidebar_label: Quick Start
description: "Step-by-step guide to render the official Vue Gantt wrapper in a Vue 3 + Vite app."
---

# Quick Start with Vue Gantt

This quick start uses Vue 3 + Vite and the official wrapper package. It gives you a minimal but production-realistic setup: rendering data and handling save callbacks.

## 1. Create A Vue 3 Project

~~~bash
npm create vite@latest vue-gantt-quick-start -- --template vue-ts
cd vue-gantt-quick-start
npm install
~~~

## 2. Install Vue Gantt

Install the evaluation package:

~~~bash
npm install @dhtmlx/trial-vue-gantt
~~~

If you use the professional package, replace `@dhtmlx/trial-vue-gantt` with `@dhx/vue-gantt` in all commands and imports.

## 3. Add Demo Data

Create `src/demoData.ts`:

~~~ts
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

~~~vue
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

// Keep data callbacks from day one so your app has a clear path
// for handling user edits and syncing with store/backend later.
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

## 5. Start The App

~~~bash
npm run dev
~~~

At this point, your Vue app can render and edit a Gantt chart using the official wrapper.

## Optional: Minimal Reactive Save Handling

As a next step, replace the logging callback with minimal local-state synchronization:

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

## Continue With

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
