---
title: Using DHTMLX Gantt Properties in VueGantt
sidebar_label: Configuration
description: "Full reference of VueGantt props, data/lifecycle contracts, and exported Vue helper/composable APIs."
---

# Using DHTMLX Gantt Properties in VueGantt

This page documents the public wrapper surface of `@dhtmlx/trial-vue-gantt` and `@dhx/vue-gantt`.

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
      <td>Task collection rendered in chart/grid.</td>
    </tr>
    <tr>
      <td>links</td>
      <td>Link[]</td>
      <td>Dependency collection.</td>
    </tr>
    <tr>
      <td>resources</td>
      <td>any[] | null</td>
      <td>Resource dataset for resource-related layouts and methods.</td>
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
      <td>Working calendar definitions (wrapper format or native config).</td>
    </tr>
    <tr>
      <td>data</td>
      <td>VueGanttDataConfig | null</td>
      <td>Transport callbacks: <code>load</code>, <code>save</code>, <code>batchSave</code>.</td>
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
      <td>templateWrapper</td>
      <td>((node: VNode) =&gt; VNode) | null</td>
      <td>Wrapper callback for VNodes rendered through wrapper template bridge.</td>
    </tr>
    <tr>
      <td>events</td>
      <td>VueGanttEvents</td>
      <td>Event-name to handler map.</td>
    </tr>
  </tbody>
</table>

## Data Collections And Synchronization

Use these props when external Vue state is your source of truth:

- `tasks`, `links`
- optional advanced stores: `resources`, `resourceAssignments`, `baselines`

~~~vue
<VueGantt
  :tasks="tasks"
  :links="links"
  :resources="resources"
  :resourceAssignments="resourceAssignments"
  :baselines="baselines"
/>
~~~

Synchronization behavior summary:

- task/link updates are diff-based for routine changes,
- wrapper can switch to reset/re-parse for large changes,
- advanced stores are re-parsed through corresponding datastores.

Use [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md) for model tradeoffs.

## Config, Templates, Plugins, Theme, Locale

These props control core Gantt behavior without imperative API calls.

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

When to prefer this path: day-to-day chart setup where declarative props are enough.

## Events, Lifecycle, And Instance Access

### `events`

Use one event map instead of per-event wrapper props:

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

`ready(instance)` fires once after initialization and first sync:

~~~vue
<VueGantt :events="events" @ready="onReady" />
~~~

### `instance` via ref

~~~ts
import { ref } from "vue";
import type { VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);

function showToday() {
  ganttRef.value?.instance?.showDate(new Date());
}
~~~

When to prefer this path: advanced imperative operations not covered by props.

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

- URL string -> `gantt.load(url)`.
- Function -> returns sync/async dataset.

### `save`

Per-change callback/transport through dataProcessor.

### `batchSave`

Grouped callback with buckets:

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

When to prefer `batchSave`: high-volume edit scenarios (auto-scheduling, bulk updates).

## Customization Hooks

### `customLightbox`

Replace built-in task form UI with a Vue component.

### `inlineEditors`

Map inline editor type names to Vue editor components.

### `templateWrapper`

Wrap VNodes produced by template interception bridge.

### `modals`

Override delete confirmations and call `callback()` to confirm deletion.

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete task ${task.text}?`)) callback();
  }
};
~~~

For complete practical patterns, read [Customization Patterns](integrations/vue/customization-patterns.md).

## Grouping, Filtering, Resources, Calendars, Markers

These props are commonly used together in advanced timelines:

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

When to use:

- `groupTasks`: grouped board-style views,
- `filter` and `resourceFilter`: focused workload slices,
- `calendars` and `markers`: schedule rules and timeline highlighting.

## Exported Helpers And Composables

From `@dhtmlx/trial-vue-gantt` or `@dhx/vue-gantt`:

### Helper factories

- `defineGanttConfig(config)`: use when you want typed config identity helper.
- `defineGanttTemplates(templates)`: use for typed template maps.
- `defineGanttEvents(events)`: use for typed event map authoring.
- `defineInlineEditors(inlineEditors)`: use for typed inline editor maps.

### Composables

- `useWorkTime(ganttRef)`: work-time checks and work-time date calculations.
- `useResourceAssignments(ganttRef)`: read task-resource and resource-assignment links.
- `useGanttDatastore(ganttRef, storeName)`: access raw datastore reads.
- `useGanttActions(ganttRef)`: safe wrappers for undo/redo/render/export calls.
- `useGanttEvent(ganttRef, eventName, handler)`: lifecycle-safe attach/detach for one event.

~~~ts
import { ref } from "vue";
import { useGanttActions, type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);
const actions = useGanttActions(ganttRef);

function exportPdf() {
  actions.exportToPDF();
}
~~~

## Continue With

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)
