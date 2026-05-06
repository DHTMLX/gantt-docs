---
title: Vue Gantt Overview
sidebar_label: Overview
description: "Architecture-level overview of Vue Gantt: capabilities, data flow, events, lifecycle, and customization extension points."
---

# Vue Gantt Overview

Vue Gantt is the official Vue wrapper for DHTMLX Gantt. It combines Vue-friendly composition patterns with full access to the underlying Gantt engine.

If you need setup instructions first, start with [Quick Start with Vue Gantt](integrations/vue/quick-start.md).

## Mental Model

Vue Gantt is a wrapper around the DHTMLX Gantt engine. The wrapper gives you a Vue component API, but the underlying engine is still the source of chart behavior and low-level methods.

The wrapper layer does three main jobs:

- initializes and destroys the Gantt instance with Vue lifecycle
- syncs selected Vue props into the current Gantt instance
- exposes wrapper-specific extension points (`events`, `@ready`, `customLightbox`, `inlineEditors`, composables)

That means you can stay declarative for most integration work and still drop to `instance` when needed.

## Core Capabilities

The wrapper covers both basic and advanced integration scenarios:

- Declarative setup with props (`config`, `templates`, `plugins`, `theme`, `locale`)
- Data synchronization for `tasks`, `links`, and advanced stores (`resources`, `resourceAssignments`, `baselines`)
- Event wiring through the `events` map
- One-time lifecycle hook through `@ready`
- Vue-based customization hooks (`customLightbox`, `inlineEditors`, `modals`)
- Typed helpers and composables for reusable patterns

## Scenario: Basic Wrapper Setup

Use props for chart configuration and template customization.

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

For the full prop list, use [Configuration Reference](integrations/vue/configuration-props.md).

## Choose A Data Ownership Model

The wrapper syncs incoming props into the current instance. The main decision is where your app treats data as authoritative.

- **Vue state/store as source of truth**: wrapper callbacks (`data.save` / `data.batchSave`) update your state, then updated props flow back into the wrapper.
- **Gantt as source of truth**: Gantt and backend own the main data lifecycle; Vue props are used less often for live chart state.

When Vue owns the data, prefer `SerializedTask[]` and `SerializedLink[]` for reactive state and payload typing.

Sync behavior summary:

- task/link updates are usually diff-based
- the wrapper can switch to reset/re-parse for larger changes
- advanced stores (`resources`, `resourceAssignments`, `baselines`) are synced through their datastores

Use [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md) for the tradeoffs and callback contracts.

## Handle Events And Startup Logic

Use the `events` map for Gantt events and `@ready` for one-time setup after initialization.

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

Use `events` for interaction behavior. Use `@ready` for initialization logic that needs a live instance.

## Cross The Imperative Boundary

Use a component ref when you need methods that are not practical to model through props.

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

If you mutate task/link data through `instance`, keep external state in sync. Otherwise the next prop update can overwrite those changes.

## Advanced Extension Points

### Custom lightbox component

Replace the built-in task form with a Vue component:

~~~vue
<VueGantt :tasks="tasks" :links="links" :customLightbox="CustomLightbox" :data="data" />
~~~

### Custom inline editors

Map Gantt inline editor names to Vue components:

~~~vue
<VueGantt :config="config" :inlineEditors="inlineEditors" :data="data" />
~~~

### Custom delete confirmation flow

Override delete confirmations with `modals`:

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete ${task.text}?`)) callback();
  }
};
~~~

### Task and resource filtering

Use `filter` for task filtering and `resourceFilter` for resource-panel filtering.

## Public Sample Scenario Map

These wrapper features are covered in public sample routes:

- `basic-init`: baseline props, config, and templates
- `custom-form`: `customLightbox`
- `custom-edit-view`: event-driven external editor flow
- `inline-editors`: Vue inline editor mapping
- `resource-panel`: resources + `resourceFilter`
- `state-management`: Pinia store-driven updates
- `export-data`: imperative actions with export plugin

## Related Articles

- [Configuration Reference](integrations/vue/configuration-props.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)
- [DHTMLX Gantt Guides](guides.md)
