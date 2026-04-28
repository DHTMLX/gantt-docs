---
title: Using DHTMLX Gantt Properties in VueGantt
sidebar_label: Configuration
description: "Reference for VueGantt props, data/lifecycle contracts, and exported Vue helpers/composables."
---

# Using DHTMLX Gantt Properties in VueGantt

This page documents the public Vue wrapper surface for `@dhtmlx/trial-vue-gantt` and `@dhx/vue-gantt`.

Use it as a reference after [Overview](integrations/vue/overview.md) or [Quick Start](integrations/vue/quick-start.md).

## Available Props

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tasks</td>
      <td>Task[]</td>
      <td>Task collection rendered in the chart/grid.</td>
    </tr>
    <tr>
      <td>links</td>
      <td>Link[]</td>
      <td>Dependency collection.</td>
    </tr>
    <tr>
      <td>resources</td>
      <td>any[] | null</td>
      <td>Resource dataset for resource layouts and resource-related API methods.</td>
    </tr>
    <tr>
      <td>resourceAssignments</td>
      <td>any[] | null</td>
      <td>Resource assignment dataset.</td>
    </tr>
    <tr>
      <td>baselines</td>
      <td>any[] | null</td>
      <td>Baseline dataset.</td>
    </tr>
    <tr>
      <td>markers</td>
      <td>Marker[] | null</td>
      <td>Vertical timeline markers.</td>
    </tr>
    <tr>
      <td>calendars</td>
      <td>(WrapperCalendar | CalendarConfig)[] | null</td>
      <td>Working calendar definitions (wrapper format or native Gantt config).</td>
    </tr>
    <tr>
      <td>data</td>
      <td>VueGanttDataConfig | null</td>
      <td>Data transport callbacks: <code>load</code>, <code>save</code>, <code>batchSave</code>.</td>
    </tr>
    <tr>
      <td>config</td>
      <td>Partial&lt;GanttConfigOptions&gt;</td>
      <td>Merged into <code>gantt.config</code>.</td>
    </tr>
    <tr>
      <td>plugins</td>
      <td>GanttPlugins</td>
      <td>Plugin activation map (for example <code>auto_scheduling</code>).</td>
    </tr>
    <tr>
      <td>templates</td>
      <td>Partial&lt;GanttTemplates&gt;</td>
      <td>Merged into <code>gantt.templates</code>.</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>string | Record&lt;string, any&gt;</td>
      <td>Locale name or locale object.</td>
    </tr>
    <tr>
      <td>theme</td>
      <td>string</td>
      <td>Skin name.</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>((task: Task) =&gt; boolean) | null</td>
      <td>Task filter predicate.</td>
    </tr>
    <tr>
      <td>resourceFilter</td>
      <td>((resource: any) =&gt; boolean) | null</td>
      <td>Resource filter predicate.</td>
    </tr>
    <tr>
      <td>modals</td>
      <td>GanttModals | null</td>
      <td>Overrides built-in delete confirmation dialogs.</td>
    </tr>
    <tr>
      <td>groupTasks</td>
      <td>any</td>
      <td>Grouping config passed to <code>gantt.groupBy</code>.</td>
    </tr>
    <tr>
      <td>inlineEditors</td>
      <td>Record&lt;string, Component&gt;</td>
      <td>Maps inline editor type names to Vue components.</td>
    </tr>
    <tr>
      <td>customLightbox</td>
      <td>Component | null</td>
      <td>Custom Vue task editor component.</td>
    </tr>
    <tr>
      <td>events</td>
      <td>VueGanttEvents</td>
      <td>Event-name to handler map.</td>
    </tr>
  </tbody>
</table>

## Data Collections And Synchronization

Use these props when Vue state is your source of truth:

- `tasks`, `links`
- optional advanced datasets: `resources`, `resourceAssignments`, `baselines`

~~~vue
<VueGantt
  :tasks="tasks"
  :links="links"
  :resources="resources"
  :resourceAssignments="resourceAssignments"
  :baselines="baselines"
/>
~~~

Sync behavior summary:

- task/link updates are usually diff-based
- the wrapper can switch to reset/re-parse for large changes
- advanced datasets are re-parsed through their datastores

For model selection and callback strategy, see [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md).

## Config, Templates, Plugins, Theme, Locale

Use these props for day-to-day chart setup without imperative API calls.

~~~vue
<script setup lang="ts">
const config = {
  scales: [
    { unit: "year", step: 1, format: "%Y" },
    { unit: "month", step: 1, format: "%F" }
  ],
  columns: [
    { name: "text", tree: true, width: "*" },
    { name: "start_date", align: "center" },
    { name: "duration", align: "center" },
    { name: "add", width: 44 }
  ]
};

const templates = {
  task_text: (_start, _end, task) => `#${task.id}: ${task.text}`
};
</script>

<template>
  <VueGantt
    :config="config"
    :templates="templates"
    :plugins="{ auto_scheduling: true }"
    theme="terrace"
    locale="en"
  />
</template>
~~~

## Events, Lifecycle, And Instance Access

### `events`

Use one `events` map instead of wrapper-specific props for each Gantt event:

~~~ts
const events = {
  onTaskCreated: task => {
    console.log(task);
    return true;
  },
  onBeforeLightbox: id => {
    console.log(id);
    return true;
  }
};
~~~

### `@ready`

`ready(instance)` fires once after initialization and the first sync:

~~~vue
<VueGantt :events="events" @ready="onReady" />
~~~

### `instance` Via Component Ref

~~~ts
import { ref } from "vue";
import type { VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);

function showToday() {
  ganttRef.value?.instance?.showDate(new Date());
}
~~~

Use this for advanced operations that are not practical through props.

## Data Transport: `load`, `save`, `batchSave`

`data` prop shape:

~~~ts
interface VueGanttDataConfig {
  load?: string | ((gantt: GanttStatic) => DataSet | Promise<DataSet>);
  save?: string | RouterFunction;
  batchSave?: (changes: BatchChanges) => void;
}
~~~

### `load`

- URL string -> `gantt.load(url)`
- Function -> returns a sync or async dataset

### `save`

Per-change callback or router transport via dataProcessor.

### `batchSave`

Grouped callback for high-volume updates:

- `tasks`
- `links`
- `resources`
- `resourceAssignments`

~~~ts
const data = {
  batchSave: changes => {
    if (changes.tasks?.length) {
      console.log("task changes", changes.tasks);
    }
  }
};
~~~

Use `batchSave` when one chart action can trigger many updates (for example auto-scheduling or bulk edits).

## Customization Hooks

### `customLightbox`

Replace the built-in task form UI with a Vue component.

### `inlineEditors`

Map Gantt inline editor type names to Vue components.

### `templateWrapper`

Wrap VNodes produced by the wrapper template bridge.

### `modals`

Override delete confirmations and call `callback()` to confirm deletion.

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete task ${task.text}?`)) callback();
  }
};
~~~

For practical examples, see [Customization Patterns](integrations/vue/customization-patterns.md).

## Grouping, Filtering, Resources, Calendars, Markers

These props are often used together in advanced timeline views:

~~~vue
<VueGantt
  :groupTasks="groupConfig"
  :filter="taskFilter"
  :resourceFilter="resourceFilter"
  :calendars="calendars"
  :markers="markers"
  :resources="resources"
  :resourceAssignments="resourceAssignments"
/>
~~~

Common usage:

- `groupTasks` for grouped views
- `filter` and `resourceFilter` for focused slices
- `calendars` and `markers` for schedule rules and timeline highlighting

## Exported Helpers And Composables

The package exports both a default `VueGantt` component export and named exports.

From `@dhtmlx/trial-vue-gantt` or `@dhx/vue-gantt`:

### Type Exports

| Export | Description |
|--------|------------|
| `SerializedTask` | User-facing task shape with `Date \| string` dates. Use for store state, initial data, and `batchSave` payloads. |
| `SerializedLink` | User-facing link shape. Use alongside `SerializedTask` in store state and data definitions. |

Use `SerializedTask` and `SerializedLink` for data you own (Pinia state, `ref<>`, API responses, initial literals). Use `Task` and `Link` for data gantt owns (inside event handlers, template callbacks, filter functions), where runtime task objects include internal `$`-prefixed properties.

### Helper Factories

- `defineGanttConfig(config)` for typed config authoring
- `defineGanttTemplates(templates)` for typed template maps
- `defineGanttEvents(events)` for typed event map authoring
- `defineInlineEditors(inlineEditors)` for typed inline editor maps

### Composables

- `useWorkTime(ganttRef)` for work-time checks and date calculations
- `useResourceAssignments(ganttRef)` for task-resource/assignment reads
- `useGanttDatastore(ganttRef, storeName)` for raw datastore access
- `useGanttActions(ganttRef)` for wrapper-safe imperative actions (undo/redo/export/render)
- `useGanttEvent(ganttRef, eventName, handler)` for lifecycle-safe attach/detach of a single event

~~~ts
import { ref } from "vue";
import { useGanttActions, type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);
const actions = useGanttActions(ganttRef);

function exportPdf() {
  actions.exportToPDF();
}
~~~

## What To Read Next

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)
