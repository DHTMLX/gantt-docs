---
title: "Data & State Management"
description: "How to choose and implement Vue-managed or Gantt-managed data flow in Vue Gantt."
---

This section explains how to keep Vue Gantt data consistent with your Vue UI, store, and backend behavior.

## Start Here

Read [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md) first.

That guide covers:

- Vue state/store as source of truth
- Gantt as source of truth
- `data.save` and `data.batchSave` callback contracts

## Pick Your Data Ownership Model

Use **Vue state or store as source of truth** when:

- surrounding Vue UI must reflect the latest chart state
- you already use Pinia or another store as authoritative state
- predictable unidirectional updates matter more than raw edit throughput

Use **Gantt as source of truth** when:

- the page is chart-centric
- update volume is high
- you want to reduce store churn for frequent chart-side changes

## Pinia Tutorial

Use [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md) for a store-driven implementation with `batchSave` and optional store-level undo/redo.

## Minimal Starter Pattern

~~~ts
const data = {
  batchSave: changes => ganttStore.applyBatch(changes)
};
~~~

Use this pattern when one chart action can produce many task/link updates.

## Performance Note

For operations like auto-scheduling, prefer `data.batchSave` over per-change `data.save` so state updates run in grouped batches.

Callback shape and tradeoffs are documented in [Batch Save Contract](integrations/vue/state/state-management-basics.md#databatchsave).
