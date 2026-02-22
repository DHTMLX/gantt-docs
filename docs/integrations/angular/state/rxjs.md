---
title: Using Angular Gantt with RxJS
sidebar_label: RxJS
description: "Step-by-step guide to integrating Angular Gantt with an RxJS store service using BehaviorSubject and data.batchSave."
---

# Angular Gantt + RxJS Tutorial

This tutorial shows a practical Angular pattern for wrapper-driven Gantt state management using an injectable RxJS service.

The result:

- `BehaviorSubject` holds tasks/links/UI state,
- template binds with `AsyncPipe`,
- Gantt edits flow into the store through `data.batchSave`,
- undo/redo and zoom changes are handled in the same service.

## Prerequisites

- Angular app with Angular Gantt installed (see [Installation](integrations/angular/installation.md))
- Working wrapper render (see [Quick Start](integrations/angular/quick-start.md))
- Basic Angular DI and RxJS knowledge

## 1. Define A Batch Apply Helper

Create `src/app/gantt-state/apply-batch-changes.ts` to apply grouped changes from `data.batchSave`.

~~~ts
import type { BatchChanges, DataCallbackChange } from '@dhtmlx/trial-angular-gantt';

const toId = (value: string | number) => String(value);

function applyEntityChanges(prev: any[], changes: DataCallbackChange[] = []): any[] {
  const next = [...prev];

  changes.forEach((change) => {
    const index = next.findIndex((item) => toId(item.id) === toId(change.id));

    if (change.action === 'update' && index !== -1) {
      next[index] = { ...next[index], ...change.data };
      return;
    }

    if (change.action === 'create') {
      next.push(change.data);
      return;
    }

    if (change.action === 'delete' && index !== -1) {
      next.splice(index, 1);
    }
  });

  return next;
}

export function applyBatchChanges(tasks: any[], links: any[], changes: BatchChanges) {
  return {
    tasks: applyEntityChanges(tasks, changes.tasks),
    links: applyEntityChanges(links, changes.links),
  };
}
~~~

This is the core reducer-like step for grouped Gantt changes.

## 2. Create An Injectable RxJS Store Service

Create `src/app/gantt-state/gantt-rx-store.service.ts`.

~~~ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import type { AngularGanttDataConfig, BatchChanges } from '@dhtmlx/trial-angular-gantt';
import { applyBatchChanges } from './apply-batch-changes';

export type ZoomLevel = 'day' | 'month' | 'year';

interface Snapshot {
  tasks: any[];
  links: any[];
  zoomLevel: ZoomLevel;
}

interface StoreState {
  tasks: any[];
  links: any[];
  zoomLevel: ZoomLevel;
  config: any;
  past: Snapshot[];
  future: Snapshot[];
}

interface ViewModel {
  tasks: any[];
  links: any[];
  zoomLevel: ZoomLevel;
  canUndo: boolean;
  canRedo: boolean;
  config: any;
}

const zoomLevels = [
  {
    name: 'day',
    scale_height: 27,
    min_column_width: 80,
    scales: [{ unit: 'day', step: 1, format: '%d %M' }],
  },
  {
    name: 'month',
    scale_height: 50,
    min_column_width: 120,
    scales: [
      { unit: 'month', format: '%F, %Y' },
      { unit: 'week', format: 'Week #%W' },
    ],
  },
  {
    name: 'year',
    scale_height: 50,
    min_column_width: 36,
    scales: [{ unit: 'year', step: 1, format: '%Y' }],
  },
] as const;

function cloneTask(task: any) {
  return {
    ...task,
    start_date: task.start_date instanceof Date ? new Date(task.start_date.getTime()) : task.start_date,
    end_date: task.end_date instanceof Date ? new Date(task.end_date.getTime()) : task.end_date,
  };
}

function cloneLink(link: any) {
  return { ...link };
}

function createConfig(zoomLevel: ZoomLevel) {
  return {
    date_format: '%Y-%m-%d %H:%i',
    zoom: {
      current: zoomLevel,
      levels: zoomLevels,
    },
  };
}

@Injectable()
export class GanttRxStoreService {
  private readonly maxHistory = 50;

  private readonly stateSubject = new BehaviorSubject<StoreState>({
    tasks: [
      { id: 1, text: 'Project', type: 'project', open: true, start_date: '2026-02-02 00:00', duration: 8, parent: 0 },
      { id: 2, text: 'Planning', start_date: '2026-02-02 00:00', duration: 3, parent: 1 },
      { id: 3, text: 'Implementation', start_date: '2026-02-05 00:00', duration: 4, parent: 1 },
    ],
    links: [{ id: 1, source: 2, target: 3, type: '0' }],
    zoomLevel: 'day',
    config: createConfig('day'),
    past: [],
    future: [],
  });

  readonly vm$ = this.stateSubject.asObservable().pipe(
    map((state): ViewModel => ({
      tasks: state.tasks,
      links: state.links,
      zoomLevel: state.zoomLevel,
      canUndo: state.past.length > 0,
      canRedo: state.future.length > 0,
      config: state.config,
    }))
  );

  readonly dataConfig: AngularGanttDataConfig = {
    batchSave: (changes: BatchChanges) => this.applyBatch(changes),
  };

  setZoom(level: ZoomLevel): void {
    const state = this.stateSubject.value;
    if (state.zoomLevel === level) return;

    const withHistory = this.pushHistory(state);
    this.stateSubject.next({
      ...withHistory,
      zoomLevel: level,
      config: {
        ...withHistory.config,
        zoom: { ...withHistory.config.zoom, current: level },
      },
    });
  }

  undo(): void {
    const state = this.stateSubject.value;
    if (!state.past.length) return;

    const previous = state.past[state.past.length - 1];
    const current = this.createSnapshot(state);

    this.stateSubject.next({
      ...state,
      tasks: previous.tasks.map(cloneTask),
      links: previous.links.map(cloneLink),
      zoomLevel: previous.zoomLevel,
      config: {
        ...state.config,
        zoom: { ...state.config.zoom, current: previous.zoomLevel },
      },
      past: state.past.slice(0, -1),
      future: [current, ...state.future],
    });
  }

  redo(): void {
    const state = this.stateSubject.value;
    if (!state.future.length) return;

    const next = state.future[0];
    const current = this.createSnapshot(state);

    this.stateSubject.next({
      ...state,
      tasks: next.tasks.map(cloneTask),
      links: next.links.map(cloneLink),
      zoomLevel: next.zoomLevel,
      config: {
        ...state.config,
        zoom: { ...state.config.zoom, current: next.zoomLevel },
      },
      past: this.trimPast([...state.past, current]),
      future: state.future.slice(1),
    });
  }

  applyBatch(changes: BatchChanges): void {
    const hasChanges = (changes.tasks?.length ?? 0) > 0 || (changes.links?.length ?? 0) > 0;
    if (!hasChanges) return;

    const state = this.stateSubject.value;
    const withHistory = this.pushHistory(state);
    const next = applyBatchChanges(withHistory.tasks, withHistory.links, changes);

    this.stateSubject.next({
      ...withHistory,
      tasks: next.tasks,
      links: next.links,
    });
  }

  private pushHistory(state: StoreState): StoreState {
    return {
      ...state,
      past: this.trimPast([...state.past, this.createSnapshot(state)]),
      future: [],
    };
  }

  private createSnapshot(state: StoreState): Snapshot {
    return {
      tasks: state.tasks.map(cloneTask),
      links: state.links.map(cloneLink),
      zoomLevel: state.zoomLevel,
    };
  }

  private trimPast(past: Snapshot[]): Snapshot[] {
    return past.length <= this.maxHistory ? past : past.slice(past.length - this.maxHistory);
  }
}
~~~

Why this shape works:

- `vm$` exposes a render-ready view model for the component.
- `dataConfig.batchSave` keeps chart edits inside one store boundary.
- snapshots make undo/redo independent from Gantt internals.

## 3. Bind The Component To The Store With `AsyncPipe`

Create `src/app/gantt-state/gantt-rx-page.component.ts`.

~~~ts
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';
import { GanttRxStoreService, type ZoomLevel } from './gantt-rx-store.service';

@Component({
  selector: 'app-gantt-rx-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, DhxGanttComponent],
  providers: [GanttRxStoreService],
  templateUrl: './gantt-rx-page.component.html',
})
export class GanttRxPageComponent {
  private readonly store = inject(GanttRxStoreService);

  readonly vm$ = this.store.vm$;
  readonly dataConfig = this.store.dataConfig;

  setZoom(level: ZoomLevel): void {
    this.store.setZoom(level);
  }

  undo(): void {
    this.store.undo();
  }

  redo(): void {
    this.store.redo();
  }
}
~~~

Create `src/app/gantt-state/gantt-rx-page.component.html`.

~~~html
<section *ngIf="vm$ | async as vm">
  <div style="display:flex; gap:8px; margin-bottom:8px; align-items:center;">
    <button (click)="undo()" [disabled]="!vm.canUndo">Undo</button>
    <button (click)="redo()" [disabled]="!vm.canRedo">Redo</button>
    <button (click)="setZoom('day')" [disabled]="vm.zoomLevel === 'day'">Day</button>
    <button (click)="setZoom('month')" [disabled]="vm.zoomLevel === 'month'">Month</button>
    <button (click)="setZoom('year')" [disabled]="vm.zoomLevel === 'year'">Year</button>
  </div>

  <div style="height: 600px;">
    <dhx-gantt [tasks]="vm.tasks" [links]="vm.links" [config]="vm.config" [data]="dataConfig"></dhx-gantt>
  </div>
</section>
~~~

This keeps the component thin. The service owns mutations, history, and Gantt callback handling.

## 4. Wire It Into The App

Use the RxJS page component as your root page (or route target).

~~~ts
import { Component } from '@angular/core';
import { GanttRxPageComponent } from './gantt-state/gantt-rx-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttRxPageComponent],
  template: `<app-gantt-rx-page></app-gantt-rx-page>`,
})
export class AppComponent {}
~~~

## 5. Data Flow And Rationale

Flow for a typical edit (for example dragging a task):

1. User edits a task in the chart.
2. Gantt emits multiple low-level changes.
3. Wrapper batches them and calls `data.batchSave(changes)`.
4. Store applies grouped changes with `applyBatchChanges(...)`.
5. Store emits next state through `vm$`.
6. Angular rebinds `<dhx-gantt>` with updated `tasks` and `links`.

This keeps your Angular state as the source of truth and still handles high-volume chart actions efficiently.

## 6. Common Pitfalls

- Using `data.save` instead of `batchSave` for auto-scheduling-heavy pages (too many store updates).
- Mutating `vm.tasks` or `vm.links` directly in the component template or component class.
- Reusing snapshot arrays without cloning when implementing undo/redo (history corruption).
- Mixing imperative `gantt.instance` data mutations with store-driven inputs unless you also update the store.

## 7. Continue With

- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)
- [Configuration Reference](integrations/angular/configuration-props.md)
- [Angular Gantt Overview](integrations/angular/overview.md)
