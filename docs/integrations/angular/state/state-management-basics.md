---
title: Data Binding & State Management in Angular Gantt
sidebar_label: Basics
description: "Choose the right data ownership model, implement callback contracts, and avoid sync pitfalls in Angular Gantt."
---

# Data Binding & State Management in Angular Gantt

Angular Gantt supports two data ownership models:

1. **Angular state/store as source of truth** (recommended for most applications).
2. **Gantt as source of truth** (performance-focused for specialized pages).

Choose one model per page/feature area and keep it consistent.

## Angular State Or Store As Source Of Truth

In this model:

- your component state or RxJS store owns `tasks` and `links`,
- the wrapper receives arrays through inputs,
- chart changes are captured via `data.save` or `data.batchSave`,
- callbacks update your state/store and new arrays flow back into `<dhx-gantt>`.

### Best for

- Angular pages with toolbars/forms that must stay in sync with the chart,
- team codebases already built around services and RxJS,
- predictable state transitions and easier debugging.

### Tradeoffs

- more application-state updates for heavy chart operations,
- more frequent synchronization work during bulk edits.

### Anti-patterns to avoid

- mutating data through `instance` while still pushing stale `tasks`/`links` arrays from Angular state,
- ignoring `data.save` / `data.batchSave` and expecting chart edits to persist in your app state automatically.

### Full-flow example (component state)

~~~ts
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
  type SerializedTask,
  type SerializedLink,
} from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links" [data]="dataConfig"></dhx-gantt>`,
})
export class GanttPageComponent {
  tasks: SerializedTask[] = [];
  links: SerializedLink[] = [];

  dataConfig: AngularGanttDataConfig = {
    save: (entity, action, item, id) => {
      if (entity === 'task') {
        if (action === 'create') this.tasks = [...this.tasks, item];
        if (action === 'update') this.tasks = this.tasks.map((t) => String(t.id) === String(id) ? { ...t, ...item } : t);
        if (action === 'delete') this.tasks = this.tasks.filter((t) => String(t.id) !== String(id));
      }

      if (entity === 'link') {
        if (action === 'create') this.links = [...this.links, item];
        if (action === 'update') this.links = this.links.map((l) => String(l.id) === String(id) ? { ...l, ...item } : l);
        if (action === 'delete') this.links = this.links.filter((l) => String(l.id) !== String(id));
      }
    },
  };
}
~~~

## Gantt As Source Of Truth

In this model, the chart and backend own most of the runtime data lifecycle.

### Best for

- very large datasets,
- chart-centric screens,
- heavy auto-scheduling or chained edits where frequent app-store updates are expensive.

### Tradeoffs

- less immediate visibility of live chart state in Angular services/components,
- extra discipline required when mixing occasional input updates with imperative operations.

### Anti-patterns to avoid

- partial mirroring without a clear reconciliation plan,
- refeeding stale server snapshots after users already changed data in the chart.

### Server transport example

~~~ts
dataConfig = {
  load: '/api/gantt/load',
  save: async (entity: string, action: string, payload: any, id: string | number) => {
    const response = await fetch(`/api/gantt/${entity}`, {
      method: action === 'delete' ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload, id }),
    });

    return await response.json();
  },
};
~~~

Use this when your backend is the authoritative state owner and Angular does not need to mirror every edit in real time.

## Callback Contracts {#callback-contracts}

### `data.save`

`save` is passed to `gantt.createDataProcessor(save)` and receives per-change payloads.

Typical function shape:

~~~ts
(entity: string, action: string, data: any, id: string | number) => any
~~~

Use this when changes are mostly singular and easy to apply one-by-one.

### `data.batchSave`

`batchSave` receives grouped payloads:

~~~ts
interface BatchChanges {
  tasks?: DataCallbackChange[];
  links?: DataCallbackChange[];
  resources?: DataCallbackChange[];
  resourceAssignments?: DataCallbackChange[];
}
~~~

Entity-to-bucket mapping includes:

- `task` / `tasks` -> `tasks`
- `link` / `links` -> `links`
- `resource` / `resources` -> `resources`
- `assignment` / `resourceAssignment` / `resourceAssignments` -> `resourceAssignments`

Queue behavior summary:

- small debounce-based batching,
- `create` + `update` coalesced into one `create` with the latest data,
- `create` + `delete` removed,
- internal `!nativeeditor_status` stripped from payloads.

Use this when one chart action can trigger many downstream changes.

## Loading Data Into Angular State

### Local component state

Use local component fields for small pages or prototypes.

Load data in Angular, then assign arrays to `tasks` and `links` inputs. Keep callback handlers in the same component.

### RxJS services / stores (recommended for medium-large apps)

Use an injectable service with a `BehaviorSubject` (or similar) to hold tasks, links, and UI state.

This is the pattern used in the Angular public sample and documented in [Using Angular Gantt with RxJS](integrations/angular/state/rxjs.md).

### Loading from an API into Angular state

Typical flow:

1. Fetch data in a service or route resolver.
2. Normalize or map date formats if needed.
3. Push data into your store/component state.
4. Pass the arrays to `<dhx-gantt>`.
5. Handle edits with `data.save` or `data.batchSave` and persist to backend.

Use this when Angular state is your source of truth and the backend is still the long-term persistent source.

## Gantt As Source Of Truth In An Angular App

### When this model makes sense

Choose it when the page is mostly the chart and the surrounding Angular UI does not need to react to every task/link update.

### Providing initial data

You can initialize Gantt-managed data with any of these patterns:

- `data.load` URL
- `data.load` function (sync or async)
- initial `tasks`/`links` arrays, then stop treating them as live source-of-truth inputs

### How updates work

The Gantt instance applies user changes internally and sends them through `save` or `batchSave`.

Angular does not need to reassign `tasks`/`links` after each change unless you explicitly want to mirror them.

## ID Remapping And Backend Responsibility

Create actions often begin with temporary client-side IDs.

- In `save` mode, backend responses should return persistent IDs so Gantt can remap internal records.
- In `batchSave` mode, there is no per-item return path, so ID remapping must be handled explicitly in your persistence workflow if the backend assigns new IDs.

Backend remains responsible for:

- validation,
- permission checks,
- persistent ID assignment,
- consistent response payloads.

## Continue With

- [Using Angular Gantt with RxJS](integrations/angular/state/rxjs.md)
- [Configuration Reference](integrations/angular/configuration-props.md)
- [Angular Gantt Overview](integrations/angular/overview.md)
