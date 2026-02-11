---
title: Using Vue Gantt with Pinia
sidebar_label: Pinia
description: "Step-by-step Pinia integration for Vue Gantt: store structure, callback wiring, and update flow rationale."
---

# Vue Gantt + Pinia Tutorial

This tutorial shows a store-driven integration based on the same architecture used by public Vue samples.

## Prerequisites

- Vue 3 project
- Pinia installed and registered
- Vue Gantt package installed

Recommended reading before this tutorial:

- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)

## 1. Setup Pinia In The App

If Pinia is not set up yet:

~~~bash
npm install pinia
~~~

Register Pinia in `src/main.ts`:

~~~ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

createApp(App).use(createPinia()).mount("#app");
~~~

## 2. Build The Store Shape

Create `src/stores/ganttStore.ts`:

~~~ts
import { defineStore } from "pinia";
import type { BatchChanges, Link, Task } from "@dhtmlx/trial-vue-gantt";

type ZoomLevel = "day" | "month" | "year";

function applyBatchChanges(tasks: Task[], links: Link[], changes: BatchChanges) {
  let nextTasks = [...tasks];
  let nextLinks = [...links];

  for (const change of changes.tasks || []) {
    if (change.action === "create") nextTasks.push(change.data as Task);
    if (change.action === "update") nextTasks = nextTasks.map(t => String(t.id) === String(change.id) ? change.data as Task : t);
    if (change.action === "delete") nextTasks = nextTasks.filter(t => String(t.id) !== String(change.id));
  }

  for (const change of changes.links || []) {
    if (change.action === "create") nextLinks.push(change.data as Link);
    if (change.action === "update") nextLinks = nextLinks.map(l => String(l.id) === String(change.id) ? change.data as Link : l);
    if (change.action === "delete") nextLinks = nextLinks.filter(l => String(l.id) !== String(change.id));
  }

  return { tasks: nextTasks, links: nextLinks };
}

export const useGanttStore = defineStore("gantt", {
  state: () => ({
    tasks: [] as Task[],
    links: [] as Link[],
    zoomLevel: "day" as ZoomLevel
  }),
  getters: {
    config: state => ({
      zoom: {
        current: state.zoomLevel,
        levels: [
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
        ]
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

Why this structure works:

- store owns canonical tasks/links,
- zoom configuration is derived from store state,
- `applyBatch` centralizes reconciliation logic from wrapper callbacks.

## 3. Bind Store State To VueGantt

Create `src/components/GanttBoard.vue`:

~~~vue
<script setup lang="ts">
import { storeToRefs } from "pinia";
import VueGantt from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { useGanttStore } from "../stores/ganttStore";

const store = useGanttStore();
const { tasks, links, config, zoomLevel } = storeToRefs(store);

const data = {
  batchSave: changes => store.applyBatch(changes)
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

## 4. Data Flow And Rationale

This flow is the core reason Pinia integration stays predictable:

1. Store exposes `tasks`, `links`, and derived `config`.
2. `VueGantt` renders based on those props.
3. User edits inside chart trigger `data.batchSave`.
4. Store action (`applyBatch`) merges updates.
5. Updated state is pushed back into props automatically.

This pattern keeps one source of truth and avoids state divergence.

## 5. Common Pitfalls

- **Stale state overwrite**: avoid setting tasks/links from stale API snapshots after interactive edits.
- **Over-rendering from single-item callbacks**: prefer `batchSave` when many updates happen in one operation.
- **Mixed ownership confusion**: do not treat both store and instance-mutated chart as independent authorities.

## 6. Alignment With Public Sample

This tutorial mirrors the same architectural approach used in:

- `vue/samples-public/src/stores/ganttStore.ts`
- `vue/samples-public/src/examples/state-management/Demo.vue`
- helper pattern used by `vue/samples-public/src/examples/shared/useDemoBatchState.ts`

## Continue With

- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Vue Gantt Overview](integrations/vue/overview.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
