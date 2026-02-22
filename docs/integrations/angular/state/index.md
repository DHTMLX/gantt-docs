---
title: "Data & State Management"
description: "How to choose and implement Angular-managed or Gantt-managed data flow in Angular Gantt."
---

This section explains how to keep Angular Gantt data consistent with your Angular UI, RxJS stores, and backend behavior.

## Start Here

Read [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md) first.

That article explains:

- Angular state/store as source of truth,
- Gantt as source of truth,
- `data.save` and `data.batchSave` callback contracts.

## Pick Your Data Ownership Model

Use **Angular state or store as source of truth** when:

- surrounding Angular UI must always reflect chart state,
- you are using an RxJS service/store or a centralized state layer,
- predictable unidirectional updates matter more than raw edit throughput.

Use **Gantt as source of truth** when:

- the page is chart-centric,
- update volume is high,
- you want to reduce application-store churn for frequent chart-side changes.

## RxJS Tutorial

Use [Using Angular Gantt with RxJS](integrations/angular/state/rxjs.md) for a practical store-driven implementation built around `BehaviorSubject`, `AsyncPipe`, undo/redo, and `data.batchSave`.

## Minimal Starter Pattern

~~~ts
readonly dataConfig = {
  batchSave: (changes) => this.ganttStore.applyBatch(changes)
};
~~~

Use this pattern when one user action can generate many task/link updates.

## Performance Note

For operations like auto-scheduling, prefer `data.batchSave` over per-change `data.save` so your Angular state updates happen in grouped batches.

Callback shape and tradeoffs are documented in [Basics](integrations/angular/state/state-management-basics.md#callback-contracts).
