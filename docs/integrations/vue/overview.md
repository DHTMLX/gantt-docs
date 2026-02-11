---
title: Vue Gantt Overview
sidebar_label: Overview
description: "Architecture-level overview of Vue Gantt: capabilities, data flow, events, lifecycle, and advanced customization patterns."
---

# Vue Gantt Overview

Vue Gantt is the official Vue wrapper for DHTMLX Gantt. It combines Vue-friendly composition patterns with full access to the underlying Gantt engine.

If you are new to installation and project bootstrapping, start with [Quick Start with Vue Gantt](integrations/vue/quick-start.md).

## Core Capabilities

The wrapper is designed to cover both straightforward and advanced integration scenarios:

- Declarative setup with props (`config`, `templates`, `plugins`, `theme`, `locale`).
- Data synchronization for tasks/links and advanced stores (`resources`, `resourceAssignments`, `baselines`).
- Dynamic event wiring through the `events` map.
- Vue lifecycle signal through `@ready`.
- Advanced customization via `customLightbox`, `inlineEditors`, `modals`, `templateWrapper`, and filtering/grouping props.
- Public composables/helpers for imperative and typed workflows.

## Basic Wrapper Usage

~~~vue
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  defineGanttConfig,
  defineGanttTemplates,
  type Link,
  type Task
} from "@dhtmlx/trial-vue-gantt";
import "@dhtmlx/trial-vue-gantt/dist/vue-gantt.css";

const tasks = ref<Task[]>([
  {
    id: 1,
    text: "Project",
    start_date: new Date(2026, 0, 5),
    duration: 5,
    open: true,
    parent: 0
  }
]);
const links = ref<Link[]>([]);

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

## Prop-Driven Sync Model And Tradeoffs

The wrapper watches incoming props and syncs them into the current gantt instance.

- `tasks` and `links` are updated incrementally (diff-based add/update/remove).
- For larger change volumes, the wrapper may switch to reset/re-parse behavior.
- `resources`, `resourceAssignments`, and `baselines` are synchronized through their datastores.

See [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md) for full model selection guidance.

## Events Map vs `@ready`

Vue wrapper uses an `events` map for Gantt events and a separate `@ready` lifecycle emit.

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

Use `events` for user interaction behavior. Use `@ready` for one-time setup that needs an initialized instance.

## Ref Access And Imperative Boundaries

When declarative props are not enough, use a component ref and access `instance`.

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

Boundary rule: if you mutate task/link data directly through `instance`, keep your external state/props in sync to avoid accidental overwrite on the next reactive update.

## Advanced Extension Points

### Custom lightbox component

Use `customLightbox` for Vue-based task form replacement:

~~~vue
<VueGantt :tasks="tasks" :links="links" :customLightbox="CustomLightbox" :data="data" />
~~~

### Custom inline editors

Map editor names to Vue components with `inlineEditors`:

~~~vue
<VueGantt :config="config" :inlineEditors="inlineEditors" :data="data" />
~~~

### Custom delete confirmation flow

Override task/link delete confirmations with `modals`:

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete ${task.text}?`)) callback();
  }
};
~~~

### Template wrapping and VNode rendering

Use `templateWrapper` when you need a common wrapper around VNodes returned by templates.

### Resource and panel filtering

Use `filter` (tasks) and `resourceFilter` (resources) for focused views.

## Public Sample Scenario Map

These wrapper capabilities are exercised in public sample routes:

- `basic-init`: baseline props/config/templates.
- `custom-form`: `customLightbox`.
- `custom-edit-view`: event-driven external editor routing.
- `inline-editors`: Vue inline editor mapping.
- `resource-panel`: resources + `resourceFilter`.
- `state-management`: Pinia store-driven updates.
- `export-data`: imperative actions with export plugin.

## Related Articles

- [Configuration Reference](integrations/vue/configuration-props.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)
- [DHTMLX Gantt Guides](guides.md)
