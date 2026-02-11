---
title: Data Binding & State Management in Vue Gantt
sidebar_label: Basics
description: "Choose the right data ownership model, implement save contracts, and avoid state-sync pitfalls in Vue Gantt."
---

# Data Binding & State Management in Vue Gantt

Vue Gantt supports two data ownership models:

1. **Vue state/store as source of truth** (recommended for most apps).
2. **Gantt as source of truth** (performance-focused for specialized cases).

Choose one model per page/app section and keep it consistent.

## Vue State Or Store As Source Of Truth

In this model:

- your reactive state (or Pinia store) owns tasks/links,
- wrapper receives arrays through props,
- chart changes are captured via `data.save` or `data.batchSave`,
- callbacks update state and new state flows back into props.

### Best for

- apps with additional Vue UI that must mirror chart state,
- teams already using Pinia/Vue state for business workflows,
- predictable unidirectional data flow.

### Tradeoffs

- more store updates for heavy operations,
- more frequent sync cycles for large batched edits.

### Anti-patterns to avoid

- mutating wrapper instance data imperatively while also feeding stale arrays from state,
- ignoring callback updates and expecting chart-side edits to persist in external state automatically.

### Full-flow example

~~~vue
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  type Link,
  type Task,
  type VueGanttDataConfig
} from "@dhtmlx/trial-vue-gantt";

const tasks = ref<Task[]>([]);
const links = ref<Link[]>([]);

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
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :data="data" />
</template>
~~~

## Gantt As Source Of Truth

In this model, the chart and backend own most data lifecycle operations.

### Best for

- very large datasets,
- heavy auto-scheduling/bulk update flows,
- chart-focused pages where external state mirroring is not required on every change.

### Tradeoffs

- reduced visibility of live chart state in external Vue store,
- extra discipline needed when mixing imperative API operations with occasional prop updates.

### Anti-patterns to avoid

- partially mirroring data in Vue store without a clear reconciliation strategy,
- repeatedly refeeding stale arrays from server snapshots after user edits.

### Server transport example

~~~vue
<script setup lang="ts">
import VueGantt from "@dhtmlx/trial-vue-gantt";

const data = {
  load: "/api/gantt/load",
  save: async (entity: string, action: string, payload: any, id: string | number) => {
    const response = await fetch(`/api/gantt/${entity}`, {
      method: action === "delete" ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, payload, id })
    });

    // For create operations, backend should return a persistent id.
    return await response.json();
  }
};
</script>

<template>
  <VueGantt :data="data" />
</template>
~~~

## Callback Contracts

### `data.save`

`save` is passed to `gantt.createDataProcessor(save)` and receives per-change payloads.

Typical function shape:

~~~ts
(entity: string, action: string, data: any, id: string | number) => any
~~~

Use this when changes are mostly singular and easy to process one-by-one.

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

Entity-to-bucket mapping:

- `task` / `tasks` -> `tasks`
- `link` / `links` -> `links`
- `resource` / `resources` -> `resources`
- `assignment` / `resourceAssignment` / `resourceAssignments` -> `resourceAssignments`

Queue behavior summary:

- near-term flush batching,
- `create` + `update` coalesced into one `create` with latest data,
- `create` + `delete` removed,
- internal `!nativeeditor_status` stripped from payload.

Use this when large operations can produce many updates at once.

## ID Remapping And Backend Responsibility

Create actions often start with temporary client-side IDs.

- In `save` mode, backend responses should return persistent IDs so Gantt can remap internal records.
- In `batchSave` mode, there is no per-item return path; if server assigns IDs, apply explicit remapping through instance methods as part of your persistence workflow.

Backend remains responsible for:

- validating incoming payloads,
- enforcing permissions,
- resolving and persisting authoritative IDs,
- returning consistent structures expected by your chosen transport mode.

## Continue With

- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
