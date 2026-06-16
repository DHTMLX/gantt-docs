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
      <td>[Gantt extensions](/guides/extensions-list/) to activate (for example [auto_scheduling](/guides/auto-scheduling/)).</td>
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
    <tr>
      <td>htmlTemplatePolicy</td>
      <td>HtmlTemplatePolicy</td>
      <td>Controls how string values returned from template functions are rendered. <code>"basic-sanitize"</code> (default) allowlist-sanitizes the returned HTML: safe formatting, classes, limited inline styles, <code>data-*</code> attributes and <code>img</code> are kept, while scripts, event handlers and dangerous URLs are removed. <code>"escape"</code> renders the string as text; <code>"unsafe-html"</code> renders the raw string (pre-v10 behavior); a custom sanitizer object (<code>mode: "sanitize"</code> with a <code>sanitize(html)</code> function) lets you plug in a library such as DOMPurify. For per-template control, wrap individual template functions with the exported <code>allowRawHTML()</code> helper. See [Migration notes](/migration#91---92).</td>
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

The map is typed as `VueGanttEvents`. The wrapper declares the following known events with full type signatures; any other Gantt event name is also accepted (custom events are typed as string-keyed handlers).

| Event | Signature | Notes |
|-------|-----------|-------|
| `onBeforeLightbox` | `(taskId: string \| number) => boolean \| void` | Return `false` to suppress the built-in lightbox (for example to route to an external editor). |
| `onTaskCreated` | `(task: Task) => boolean \| void` | Return `false` to cancel task creation. |
| `onAfterTaskAdd` | `(id: string \| number, task: Task) => void` | Fires after a task is added. |
| `onAfterTaskUpdate` | `(id: string \| number, task: Task) => void` | Fires after a task is updated. |
| `onAfterTaskDelete` | `(id: string \| number, task: Task) => void` | Fires after a task is deleted. |
| `onAfterLinkAdd` | `(id: string \| number, link: Link) => void` | Fires after a dependency link is added. |
| `onAfterLinkUpdate` | `(id: string \| number, link: Link) => void` | Fires after a dependency link is updated. |
| `onAfterLinkDelete` | `(id: string \| number, link: Link) => void` | Fires after a dependency link is deleted. |

For the full Gantt event list (including events not enumerated above), see the [Gantt events overview](api/overview/events-overview.md). Use `defineGanttEvents(...)` to author the map with autocomplete on these known events.

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

Import every type from the wrapper package itself (`@dhx/vue-gantt` or `@dhtmlx/trial-vue-gantt`). The wrapper bundles the underlying Gantt engine and re-exports its types alongside the Vue-specific ones - there is no separate `@dhx/gantt` package to install or import from.

**Wrapper-owned types**

| Export | Description |
|--------|------------|
| `SerializedTask` | User-facing task shape with `Date \| string` dates. Use for store state, initial data, and `save`/`batchSave` payloads. |
| `SerializedLink` | User-facing link shape. Use alongside `SerializedTask` in store state and data definitions. |
| `VueGanttRef` | Type of the value exposed via component ref - `{ instance: GanttStatic \| null }`. |
| `VueGanttDataConfig` | Shape of the `data` prop (`load`, `save`, `batchSave`). |
| `BatchChanges` | Argument passed to `data.batchSave` - grouped `tasks`/`links`/`resources`/`resourceAssignments` changes. |
| `DataCallbackChange` | Individual change entry inside a `BatchChanges` bucket - `{ entity, action, data, id }`. |
| `Marker` | Shape of items in the `markers` prop. |
| `WrapperCalendar` | Wrapper-friendly calendar shape accepted by the `calendars` prop (alongside raw `CalendarConfig`). |
| `GanttModals` | Shape of the `modals` prop - `onBeforeTaskDelete` and `onBeforeLinkDelete` callback signatures. |
| `CustomLightboxProps` | Props received by your `customLightbox` component (`data`, `onSave`, `onCancel`, `onDelete`, `ganttInstance`). |
| `InlineEditorComponentProps` | Props received by your inline editor components (`initialValue`, `task`, `save`, `cancel`, `ganttInstance`). |
| `VueGanttEvents` | Type of the `events` prop - known events plus string-keyed custom events. |

**Frequently used types from the Gantt engine**

The wrapper re-exports every type from the underlying Gantt engine. The ones below come up most often in wrapper code - each row maps a core type to where it shows up in the Vue API.

| Export | Where it appears in wrapper code |
|--------|------------|
| `Task`, `Link` | Runtime task/link shapes (include `$`-prefixed properties). Used inside event handlers, template callbacks, and filter functions. |
| `GanttStatic` | Type of `ganttRef.value?.instance` and the `@ready` argument. |
| `GanttConfigOptions` | Shape of the object passed to the `config` prop. |
| `GanttTemplates` | Shape of the object passed to the `templates` prop. |
| `GanttPlugins` | Shape of the object passed to the `plugins` prop. |
| `CalendarConfig` | Raw Gantt calendar shape - alternative to `WrapperCalendar` in the `calendars` prop. |

Every other type from the Gantt engine is also exported from the wrapper - if you can import a name from `@dhx/gantt` in the standalone library, you can import it from `@dhx/vue-gantt` here.

Use `SerializedTask` and `SerializedLink` for data you own (Pinia state, `ref<>`, API responses, initial literals). Use `Task` and `Link` for data gantt owns (inside event handlers, template callbacks, filter functions), where runtime task objects include internal `$`-prefixed properties.

### Helper Factories

- `defineGanttConfig(config)` for typed config authoring
- `defineGanttTemplates(templates)` for typed template maps
- `defineGanttEvents(events)` for typed event map authoring
- `defineInlineEditors(inlineEditors)` for typed inline editor maps

These are **TypeScript-only identity helpers** - at runtime, `defineGanttTemplates(x)` returns `x` unchanged. You can skip them entirely without any behavior change. Their value is **type preservation on object literals**: you get autocomplete on `templates.task_text`, `config.scales[0].unit`, `events.onAfterTaskAdd`, etc., without manually annotating the variable.

If you skip them in TypeScript, either annotate the variable yourself or pass the literal inline on the prop:

~~~ts
// Option 1: explicit type annotation
const templates: Partial<GanttTemplates> = {
  task_text: (_s, _e, task) => task.text
};

// Option 2: helper for autocomplete on the literal
const templates = defineGanttTemplates({
  task_text: (_s, _e, task) => task.text
});

// Option 3: inline literal - inference works through the prop type
<VueGantt :templates="{ task_text: (_s, _e, task) => task.text }" />
~~~

### Composables

The wrapper exposes five composables that wrap common instance-side calls in a ref-aware, lifecycle-safe form. Each one takes a `Ref<VueGanttRef | null>` so it can wait for the instance to become available.

#### `useGanttActions(ganttRef)`

Returns wrapper-safe imperative actions:

| Method | Signature | Notes |
|--------|-----------|-------|
| `undo()` | `() => void` | Requires `plugins: { undo: true }`. |
| `redo()` | `() => void` | Requires `plugins: { undo: true }`. |
| `render()` | `() => void` | Forces a redraw - pair with `instance.eachTask(...)` for bulk mutations. |
| `exportToPDF()` | `() => void` | Requires `plugins: { export_api: true }`. |
| `exportToPNG()` | `() => void` | Requires `plugins: { export_api: true }`. |
| `exportToExcel(config?)` | `(config?: object) => void` | Requires `plugins: { export_api: true }`. Pass exporter options through `config`. |
| `exportToMSProject()` | `() => void` | Requires `plugins: { export_api: true }`. |

~~~ts
import { ref } from "vue";
import { useGanttActions, type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);
const actions = useGanttActions(ganttRef);

const exportPdf = () => actions.exportToPDF();
const exportExcel = () => actions.exportToExcel({ visual: "base-colors" });
~~~

#### `useWorkTime(ganttRef)`

Returns a computed wrapper around the Gantt work-time API. Useful in templates and constraint calculations.

| Method | Signature |
|--------|-----------|
| `isWorkTime({ date, task?, unit? })` | `(args) => boolean` |
| `calculateEndDate({ start, duration, unit?, task? })` | `(args) => Date` |
| `calculateDuration({ start, end, task? })` | `(args) => number` |
| `getClosestWorkTime({ date, task?, unit, dir? })` | `(args) => Date` |

~~~ts
import { useWorkTime, type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);
const workTime = useWorkTime(ganttRef);

const templates = {
  scale_cell_class: (date: Date) =>
    workTime.value.isWorkTime({ date }) ? "" : "weekend"
};
~~~

#### `useGanttDatastore<T>(ganttRef, storeName)`

Returns a computed reader for any Gantt datastore (for example `"task"`, `"link"`, `"resource"`).

| Method | Signature |
|--------|-----------|
| `getItem(id)` | `(id: string \| number) => T \| null` |
| `getItems()` | `() => T[]` |
| `hasChild(id)` | `(id: string \| number) => boolean` |
| `getChildren(id)` | `(id: string \| number) => (string \| number)[]` |

~~~ts
import type { Task } from "@dhtmlx/trial-vue-gantt";
import { useGanttDatastore } from "@dhtmlx/trial-vue-gantt";

const taskStore = useGanttDatastore<Task>(ganttRef, "task");

const rootTasks = computed(() => taskStore.value.getChildren(0));
~~~

#### `useResourceAssignments(ganttRef)`

Returns a computed reader for resource/task assignment data.

| Method | Signature |
|--------|-----------|
| `getResourceAssignments(resourceId, taskId?)` | `(resourceId: string \| number, taskId?: string \| number) => any[]` |
| `getTaskResources(taskId)` | `(taskId: string \| number) => any[]` |

~~~ts
import { useResourceAssignments } from "@dhtmlx/trial-vue-gantt";

const assignments = useResourceAssignments(ganttRef);

const showAssignments = (resourceId: string | number) => {
  console.log(assignments.value.getResourceAssignments(resourceId));
};
~~~

#### `useGanttEvent(ganttRef, eventName, handler)`

Attaches a single Gantt event with a lifecycle-safe lifetime. The handler is detached automatically on component unmount and re-attached if `ganttRef`, `eventName`, or `handler` change. Returns `{ detach }` for manual control.

~~~ts
import { useGanttEvent } from "@dhtmlx/trial-vue-gantt";

const { detach } = useGanttEvent(ganttRef, "onTaskDblClick", id => {
  console.log("dbl-click", id);
});

// Optional: detach early
// detach();
~~~

Use this when one-off listeners do not fit cleanly into the `events` map (for example listeners that need to update or unsubscribe based on local state).

## What To Read Next

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)
