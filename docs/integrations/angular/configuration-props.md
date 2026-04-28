---
title: Using DHTMLX Gantt Properties in Angular Gantt
sidebar_label: Configuration
description: "Full reference of Angular Gantt inputs, outputs, callback contracts, and Angular-specific template/customization helpers."
---

# Using DHTMLX Gantt Properties in Angular Gantt

This page documents the public wrapper surface of `@dhtmlx/trial-angular-gantt` and `@dhx/angular-gantt`.

## Available Inputs

<table>
  <thead>
    <tr>
      <th>Input</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tasks</td>
      <td>any[]</td>
      <td>Task collection rendered in the chart/grid. Required.</td>
    </tr>
    <tr>
      <td>links</td>
      <td>any[]</td>
      <td>Dependency collection. Required.</td>
    </tr>
    <tr>
      <td>resources</td>
      <td>any[] | null</td>
      <td>Resource dataset for resource layouts and resource API methods.</td>
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
      <td>config</td>
      <td>Partial&lt;GanttConfigOptions&gt; | null</td>
      <td>Merged into <code>gantt.config</code>.</td>
    </tr>
    <tr>
      <td>templates</td>
      <td>AngularGanttTemplates | null</td>
      <td>Merged into <code>gantt.templates</code>; template functions can return Angular template descriptors.</td>
    </tr>
    <tr>
      <td>plugins</td>
      <td>Record&lt;string, any&gt; | null</td>
      <td>Plugin activation map (for example: [critical_path](/guides/critical-path/), [auto_scheduling](/guides/auto-scheduling/)).</td>
    </tr>
    <tr>
      <td>calendars</td>
      <td>Calendar[] | null</td>
      <td>Working calendar definitions synchronized by <code>id</code>.</td>
    </tr>
    <tr>
      <td>markers</td>
      <td>Marker[] | null</td>
      <td>Vertical timeline markers synchronized by <code>id</code>.</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>string | null</td>
      <td>Locale name passed to <code>gantt.i18n.setLocale(...)</code>.</td>
    </tr>
    <tr>
      <td>theme</td>
      <td>string | null</td>
      <td>Skin name passed to <code>gantt.setSkin(...)</code> when available.</td>
    </tr>
    <tr>
      <td>data</td>
      <td>AngularGanttDataConfig | null</td>
      <td>Transport callbacks: <code>load</code>, <code>save</code>, <code>batchSave</code>.</td>
    </tr>
    <tr>
      <td>events</td>
      <td>AngularGanttEvents | null</td>
      <td>Event-name to handler map for Gantt events.</td>
    </tr>
    <tr>
      <td>customLightbox</td>
      <td>CustomLightboxConfig | null</td>
      <td>Replaces built-in lightbox with an Angular component.</td>
    </tr>
    <tr>
      <td>groupTasks</td>
      <td>any</td>
      <td>Grouping config passed to <code>gantt.groupBy(...)</code>; use <code>false</code> to disable.</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>TaskFilter</td>
      <td>A function used to filter Gantt tasks.</td>
    </tr>
    <tr>
      <td>resourceFilter</td>
      <td>ResourceFilter</td>
      <td>Predicate for filtering rows in the configured resource datastore.</td>
    </tr>
  </tbody>
</table>

## Outputs And Instance Access

### `(ready)`

The wrapper emits `ready` once after initialization and initial sync.

Event payload shape:

~~~ts
{ instance: GanttStatic }
~~~

~~~html
<dhx-gantt [tasks]="tasks" [links]="links" (ready)="onReady($event)"></dhx-gantt>
~~~

### `instance` via `@ViewChild`

Use `@ViewChild(DhxGanttComponent)` when you need direct imperative access.

~~~ts
@ViewChild(DhxGanttComponent) ganttCmp?: DhxGanttComponent;

showToday(): void {
  this.ganttCmp?.instance?.showDate(new Date());
}
~~~

## Data Collections And Synchronization

Use these inputs when Angular state or an RxJS store is your source of truth:

- `tasks`, `links`
- optional advanced stores: `resources`, `resourceAssignments`, `baselines`

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [baselines]="baselines">
</dhx-gantt>
~~~

Synchronization behavior summary:

- task/link updates are diff-based for routine changes,
- wrapper can switch to reset/re-parse when a diff is not safe/effective,
- resource/assignment/baseline stores are refreshed through Gantt datastores.

Use [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md) for model tradeoffs.

## Config, Templates, Plugins, Theme, Locale

Use these inputs for declarative chart setup instead of imperative `instance` calls.

~~~ts
config = {
  scales: [
    { unit: 'year', step: 1, format: '%Y' },
    { unit: 'month', step: 1, format: '%F, %Y' },
    { unit: 'day', step: 1, format: '%d %M' },
  ],
  columns: [
    { name: 'text', tree: true, width: '*' },
    { name: 'start_date', align: 'center' },
    { name: 'duration', align: 'center' },
    { name: 'add', width: 44 },
  ],
};

templates = {
  task_text: (_start: Date, _end: Date, task: any) => `#${task.id}: ${task.text}`,
};
~~~

~~~html
<dhx-gantt
  [config]="config"
  [templates]="templates"
  [plugins]="{ auto_scheduling: true }"
  [locale]="locale"
  [theme]="theme">
</dhx-gantt>
~~~

### Runtime update behavior

- `locale`, `theme`, `config`, `templates`, and `plugins` can be updated after init.
- If `config.layout` changes shape (not just nested values), the wrapper may reinitialize the Gantt layout.
- Keep object identity stable when nothing changed to avoid unnecessary re-application.

## `events` Input

Use a single event map instead of many Angular outputs.

~~~ts
import type { AngularGanttEvents } from '@dhtmlx/trial-angular-gantt';

events: AngularGanttEvents = {
  onTaskCreated: (task) => {
    console.log('created', task);
    return true;
  },
  onAfterTaskUpdate: (id, task) => {
    console.log('updated', id, task);
  },
  onBeforeLightbox: (taskId) => {
    console.log('before lightbox', taskId);
    return true;
  },
};
~~~

The wrapper accepts both a typed subset of common events and arbitrary event names through the same map.

## Data Transport: `load`, `save`, `batchSave`

`data` input shape:

~~~ts
interface AngularGanttDataConfig {
  load?: string | ((gantt: any) => any | Promise<any>);
  save?: string | ((entity: string, action: string, data: any, id: string | number) => any);
  batchSave?: (changes: BatchChanges) => void;
}
~~~

### `load`

- URL string -> wrapper calls `gantt.load(url)`.
- Function -> wrapper calls it with the gantt instance and parses the returned sync/async dataset.

~~~ts
dataConfig = {
  load: async (gantt) => {
    const response = await fetch('/api/gantt');
    const dataset = await response.json();
    return dataset;
  },
};
~~~

`load` is intended for initial loading. The wrapper applies it once per component lifecycle.

### `save`

Per-change callback or transport (wired through `gantt.createDataProcessor(save)`).

~~~ts
dataConfig = {
  save: (entity, action, data, id) => {
    console.log(entity, action, data, id);
  },
};
~~~

### `batchSave`

Grouped callback for high-volume changes (auto-scheduling, bulk edits, chained updates).

~~~ts
import type { BatchChanges } from '@dhtmlx/trial-angular-gantt';

dataConfig = {
  batchSave: (changes: BatchChanges) => {
    if (changes.tasks?.length) {
      console.log('task changes', changes.tasks);
    }
  },
};
~~~

Queue behavior summary:

- near-term batching (small debounce window),
- coalescing `create` + `update` into one `create` with the latest payload,
- dropping `create` + `delete` pairs,
- stripping internal `!nativeeditor_status` from payloads.

## `customLightbox` Input

Use `customLightbox` to replace the built-in Gantt lightbox with an Angular component.

~~~ts
import type { CustomLightboxConfig } from '@dhtmlx/trial-angular-gantt';

customLightbox: CustomLightboxConfig = {
  component: TaskEditorComponent,
  onSave: ({ id, task }) => console.log('saved', id, task),
  onCancel: () => console.log('cancel'),
  onDelete: (id) => console.log('delete', id),
};
~~~

The custom component instance receives these inputs from the wrapper:

- `data` (`{ id, task }`)
- `onSave(updatedTask)`
- `onCancel()`
- `onDelete()`

## Templates And Angular Components

Template functions can return regular strings/HTML (native Gantt behavior) or Angular component descriptors created with `templateComponent(...)`.

~~~ts
import { templateComponent } from '@dhtmlx/trial-angular-gantt';

templates = {
  task_text: (_start: Date, _end: Date, task: any) =>
    templateComponent(TaskBadgeTemplateComponent, { task }),
};

config = {
  columns: [
    {
      name: 'status',
      label: templateComponent(HeaderFilterComponent, {
        currentFilter: this.currentFilter,
      }),
      template: (task: any) => templateComponent(StatusCellComponent, { task }),
    },
  ],
};
~~~

Use this for grid headers/cells, task text, scales, and other template-capable surfaces supported by Gantt.

## Grouping, Resources, Filters, Calendars, Markers

These inputs are typically used in advanced timelines and resource views.

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [groupTasks]="groupConfig"
  [filter]="taskFilter"
  [resourceFilter]="resourceFilter"
  [calendars]="calendars"
  [markers]="markers"
  [config]="config">
</dhx-gantt>
~~~

Notes:

- `filter` accepts a `(task: any) => boolean` function or `null`. When set, only tasks for which the function returns `true` are displayed. Set to `null` to show all tasks.
- `resourceFilter` works against the resource datastore configured by `config.resource_store`.
- `groupTasks` can be toggled with `false` or a grouping config object.
- `calendars` and `markers` are synchronized by `id`, so keep IDs stable.

### Task filtering

Use the `filter` input to control which tasks are visible. The wrapper attaches an `onBeforeTaskDisplay` listener under the hood and triggers a re-render when the filter reference changes.

~~~ts
import type { TaskFilter } from '@dhtmlx/trial-angular-gantt';

taskFilter: TaskFilter = null;

showCompleted(): void {
  this.taskFilter = (task) => !!task.completed;
}

resetFilter(): void {
  this.taskFilter = null;
}
~~~

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [filter]="taskFilter">
</dhx-gantt>
~~~

Keep a stable reference when the filter logic has not changed — the wrapper compares by identity and re-renders only when the reference changes.

## Exported Types And Helpers

Useful public exports from the wrapper package:

- `DhxGanttComponent`
- `DhxGanttModule`
- `templateComponent(...)`
- `isAngularTemplateRenderable(...)`
- `AngularGanttDataConfig`
- `AngularGanttEvents`
- `BatchChanges`, `DataCallbackChange`
- `SerializedTask`, `SerializedLink`
- `TaskFilter`
- `ResourceFilter`
- `GanttStatic`
- `CustomLightboxConfig`
- `Calendar`, `Marker`

### `SerializedTask` vs `Task`

The wrapper exports two task-related types:

- **`SerializedTask`** — use for data you own: store state, API responses, initial literals, `batchSave` payloads. Dates can be `Date` objects or strings matching `date_format`.
- **`Task`** (re-exported from `@dhx/gantt`) — for data gantt owns: inside event handlers, after gantt parses. Dates are `Date` objects. Has `$`-prefixed system properties.

`SerializedLink` is the link-side counterpart of `SerializedTask`.

## Continue With

- [Angular Gantt Overview](integrations/angular/overview.md)
- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)
- [RxJS State Management Tutorial](integrations/angular/state/rxjs.md)
- [dhtmlxGantt with Angular (Low-Level Integration)](integrations/angular/js-gantt-angular.md)
