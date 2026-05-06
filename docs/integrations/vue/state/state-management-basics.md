---
title: Data Binding & State Management in Vue Gantt
sidebar_label: Basics
description: "Choose a data ownership model for Vue Gantt, wire save callbacks, and avoid state-sync pitfalls."
---

# Data Binding & State Management in Vue Gantt

This guide helps you choose where your app owns Gantt data and how to keep chart edits synchronized. Pick one ownership model per page and keep it consistent.

Vue Gantt supports two common models:

1. **Vue state/store as source of truth** (best default for most apps)
2. **Gantt as source of truth** (performance-focused for chart-heavy pages)

## Mental Model

The wrapper syncs props into a live Gantt instance. If users edit data in the chart, you decide whether:

- the wrapper callback updates Vue state (Vue-owned model), or
- the chart/backend handles changes directly (Gantt-owned model)

The main pitfall is mixed ownership. If Vue and the Gantt instance both act like the source of truth, stale data overwrites are likely.

## Vue State Or Store As Source Of Truth

In this model:

- Vue state (or Pinia) owns `tasks` and `links`
- the wrapper receives arrays through props
- chart edits are captured via `data.save` or `data.batchSave`
- callback handlers update state
- updated state flows back into the wrapper

Type recommendation for this model: use `SerializedTask[]` and `SerializedLink[]` for reactive state arrays.

### Best For

- pages with surrounding Vue UI that must reflect chart state
- apps that already use Pinia or a centralized state layer
- teams that want predictable unidirectional data flow

### Tradeoffs

- more application-state updates for heavy operations
- more sync work when many edits happen in one chart action

### Avoid These Patterns

- mutating task/link data through `instance` while continuing to pass stale arrays from Vue state
- ignoring wrapper callbacks and expecting chart edits to persist in Vue state automatically

### Example: Store/Vue-Owned Flow

~~~vue
<script setup lang="ts">
import { ref } from "vue";
import VueGantt, {
  type SerializedLink,
  type SerializedTask,
  type VueGanttDataConfig
} from "@dhtmlx/trial-vue-gantt";

const tasks = ref<SerializedTask[]>([]);
const links = ref<SerializedLink[]>([]);

const data: VueGanttDataConfig = {
  save: (entity, action, item, id) => {
    if (entity === "task") {
      if (action === "create") tasks.value = [...tasks.value, item as SerializedTask];
      if (action === "update") tasks.value = tasks.value.map(t => String(t.id) === String(id) ? item as SerializedTask : t);
      if (action === "delete") tasks.value = tasks.value.filter(t => String(t.id) !== String(id));
    }

    if (entity === "link") {
      if (action === "create") links.value = [...links.value, item as SerializedLink];
      if (action === "update") links.value = links.value.map(l => String(l.id) === String(id) ? item as SerializedLink : l);
      if (action === "delete") links.value = links.value.filter(l => String(l.id) !== String(id));
    }
  }
};
</script>

<template>
  <VueGantt :tasks="tasks" :links="links" :data="data" />
</template>
~~~

For multi-change operations, move to `data.batchSave` and apply changes in grouped batches.

## Gantt As Source Of Truth

In this model, the chart and backend own most data lifecycle operations. Vue does less live mirroring.

### Best For

- very large datasets
- heavy auto-scheduling or bulk update flows
- chart-focused pages where external UI does not need every live change immediately

### Tradeoffs

- less visibility of live chart state in Vue state/store
- more discipline required if you occasionally push prop snapshots back into the wrapper

### Avoid These Patterns

- partial Vue mirroring without a reconciliation strategy
- refeeding stale server snapshots after users edit the chart

### Example: Gantt-Owned Transport

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

    // Create handlers should return the persistent ID when backend remaps it.
    return await response.json();
  }
};
</script>

<template>
  <VueGantt :data="data" />
</template>
~~~

## Callback Contracts

This section covers the wrapper callback shapes you use in both ownership models.

### `data.save`

`save` is passed to `gantt.createDataProcessor(save)` and receives one change at a time.

Typical function shape:

~~~ts
(entity: string, action: string, data: any, id: string | number) => any
~~~

Use this when changes are mostly singular and easy to process one by one.

### `data.batchSave`

`batchSave` receives grouped changes:

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

- near-term flush batching
- `create` + `update` can be coalesced into one `create` with the latest payload
- `create` + `delete` can be removed from the batch
- internal `!nativeeditor_status` is stripped from payloads

Use this when one user action can produce many updates (for example auto-scheduling).

## ID Remapping And Backend Responsibility

Create actions often start with temporary client-side IDs.

- In `save` mode, backend responses should return persistent IDs so Gantt can remap records.
- In `batchSave` mode, there is no per-item return path. If the server assigns IDs, handle remapping explicitly in your persistence workflow.

Backend responsibilities stay the same in both modes:

- validate incoming payloads
- enforce permissions
- persist authoritative IDs
- return data structures your selected transport mode expects

## What To Read Next

- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)
- [Configuration Reference](integrations/vue/configuration-props.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
