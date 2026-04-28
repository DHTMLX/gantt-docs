---
title: Using Vue Gantt with Pinia
sidebar_label: Pinia
description: "Step-by-step Pinia integration for Vue Gantt: store structure, callback wiring, and optional store-level undo/redo."
---

# Vue Gantt + Pinia Tutorial

This tutorial shows a store-driven Vue Gantt integration using Pinia. It follows the same architecture as the public Vue samples: the store owns `tasks` and `links`, and wrapper callbacks push chart edits back into the store.

## Prerequisites

- Vue 3 project
- Pinia installed (or permission to add it)
- Vue Gantt package installed
- Basic reading of [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)

## 1. Install And Register Pinia

If Pinia is not installed yet:

~~~bash
npm install pinia
~~~

Register Pinia in `src/main.ts`:

~~~ts title="src/main.ts"
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

createApp(App).use(createPinia()).mount("#app");
~~~

## 2. Create A Basic Gantt Store

Create `src/stores/ganttStore.ts`:

~~~ts title="src/stores/ganttStore.ts"
import { defineStore } from "pinia";
import type { BatchChanges, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";

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
    tasks: [] as SerializedTask[],
    links: [] as SerializedLink[],
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

This store keeps one source of truth:

- `tasks` and `links` are canonical data
- `config` is derived state
- `applyBatch` is the wrapper callback entry point

## 3. Bind Store State To `VueGantt`

Create `src/components/GanttBoard.vue`:

~~~vue title="src/components/GanttBoard.vue"
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

This is the core wrapper wiring:

- store values -> wrapper props
- `batchSave` -> store action
- store action -> new state -> wrapper props again

## 4. Verify The Data Flow

Use this flow for predictable updates:

1. Store exposes `tasks`, `links`, and derived `config`.
2. `VueGantt` renders from props.
3. User edits in the chart trigger `data.batchSave`.
4. Store action (`applyBatch`) merges the changes.
5. Updated state flows back into `VueGantt`.

Do not mix this with direct instance mutations unless you also update the store.

## 5. (Optional) Add Store-Level Undo/Redo

Use this if you want undo/redo while keeping Pinia as the source of truth.

Do not enable `gantt.plugins({ undo: true })` in this mode.

### 5.1 Replace The Store With A History Version

Replace the store from step 2 with this version.
It keeps state typed as `SerializedTask[]` / `SerializedLink[]` and avoids `as any` casts in date cloning.

~~~ts title="src/stores/ganttStore.ts"
import { defineStore } from "pinia";
import type { BatchChanges, SerializedLink, SerializedTask } from "@dhtmlx/trial-vue-gantt";

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
    tasks: [] as SerializedTask[],
    links: [] as SerializedLink[],
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

### 5.2 Add Undo/Redo Buttons To The Component

Update `src/components/GanttBoard.vue`:

~~~vue title="src/components/GanttBoard.vue"
<script setup lang="ts">
import { storeToRefs } from "pinia";
import VueGantt from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

import { useGanttStore } from "../stores/ganttStore";

const store = useGanttStore();
const { tasks, links, config, zoomLevel, canUndo, canRedo } = storeToRefs(store);

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

### 5.3 Why This Uses Store-Level History

Use store-level history here because the store is the source of truth:

- Vue UI and chart stay in sync through the same state transitions
- `maxHistory` keeps memory usage bounded
- any new mutation clears redo history automatically
- you avoid two independent history systems

## Result

You now have a Pinia-based integration where:

- Pinia owns `tasks` and `links`
- `data.batchSave` applies chart edits to the store
- `VueGantt` re-renders from store state
- undo/redo can be added without switching ownership to the Gantt instance

## Common Pitfalls

- Replacing store state with stale API snapshots after chart edits
- Using `data.save` for high-volume operations when `batchSave` is a better fit
- Mixing store ownership with direct instance mutations and not reconciling state
- Enabling the built-in Gantt undo plugin together with store-level history

## Alignment With Public Sample

This tutorial matches the same store-driven approach used in:

- `vue/samples-public/src/stores/ganttStore.ts`
- `vue/samples-public/src/examples/state-management/Demo.vue`
- `vue/tests/cypress/e2e/public/007-state-management.cy.ts`
- `vue/samples-public/src/examples/shared/useDemoBatchState.ts`

## What To Read Next

- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Vue Gantt Overview](integrations/vue/overview.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
