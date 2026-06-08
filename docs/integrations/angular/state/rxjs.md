---
title: Using Angular Gantt with RxJS
sidebar_label: RxJS
description: "Step-by-step guide to integrating Angular Gantt with an RxJS state service using BehaviorSubject and data.batchSave."
---

# Angular Gantt + RxJS Tutorial

This tutorial shows a practical Angular pattern for state-driven Gantt management using an injectable RxJS service.

The result:

- a `BehaviorSubject` holds tasks, links, and Gantt config,
- the component composes a view model with `combineLatest` and binds with `AsyncPipe`,
- Gantt edits flow into the store through `data.batchSave`,
- undo/redo and zoom changes are handled in the same service against snapshots of the state.

A complete working project that follows this tutorial is on GitHub: [angular-gantt-rxjs-starter](https://github.com/DHTMLX/angular-gantt-rxjs-starter).

## Prerequisites

- Angular app with Angular Gantt installed (see [Installation](integrations/angular/installation.md))
- Working wrapper render (see [Quick Start](integrations/angular/quick-start.md))
- Basic Angular DI and RxJS knowledge

## Project layout

We split the Gantt feature into three folders so each piece has one job:

```text
src/app/
  data/
    gantt-seed.data.ts           initial tasks, links, and zoom config
  gantt/
    gantt-shell.component.*      feature shell and DHTMLX Gantt host
    gantt-toolbar.component.ts   zoom and history controls
    gantt.types.ts               shared Gantt feature types
  state/
    apply-batch-changes.ts       pure task/link batch change helper
    gantt-state.models.ts        RxJS state and history types
    gantt-state.service.ts       RxJS state, batch flow, zoom, history
```

`GanttStateService` is provided by `GanttShellComponent` (not at root), so each rendered shell gets isolated tasks, links, and undo/redo history.

## 1. Define types and seed data

### Shared types: `src/app/gantt/gantt.types.ts`

```ts
import type { GanttConfigOptions, ZoomLevel } from '@dhtmlx/trial-angular-gantt';

export type ZoomLevelName = 'day' | 'month' | 'year';

export interface GanttConfig {
  zoom: {
    current: ZoomLevelName;
    levels: readonly ZoomLevel[];
  };
  options?: Partial<GanttConfigOptions>;
}
```

`ZoomLevelName` is a narrow string union the toolbar and store exchange. `GanttConfig` keeps zoom state alongside any additional Gantt options the feature needs.

### State models: `src/app/state/gantt-state.models.ts`

```ts
import type { SerializedLink, SerializedTask } from '@dhtmlx/trial-angular-gantt';
import type { GanttConfig } from '../gantt/gantt.types';

export interface HistorySnapshot {
  tasks: SerializedTask[];
  links: SerializedLink[];
  config: GanttConfig;
}

export interface GanttState {
  tasks: SerializedTask[];
  links: SerializedLink[];
  config: GanttConfig;
  past: HistorySnapshot[];
  future: HistorySnapshot[];
  maxHistory: number;
}
```

Snapshots include `config` (which carries the current zoom level), so undo restores zoom along with data.

### Seed data: `src/app/data/gantt-seed.data.ts`

```ts
import type { SerializedLink, SerializedTask, ZoomLevel } from '@dhtmlx/trial-angular-gantt';
import type { GanttConfig } from '../gantt/gantt.types';

export const defaultZoomLevels: readonly ZoomLevel[] = [
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
];

export const seedTasks: SerializedTask[] = [
  { id: '1', text: 'Project setup', type: 'project', start_date: '2026-04-02T00:00:00.000Z', duration: 8, progress: 0.35, parent: 0, open: true },
  { id: '2', text: 'Install Angular shell', type: 'task', start_date: '2026-04-02T00:00:00.000Z', duration: 2, progress: 1, parent: '1' },
  { id: '3', text: 'Verify Gantt wrapper', type: 'task', start_date: '2026-04-04T00:00:00.000Z', duration: 3, progress: 0.4, parent: '1' },
  { id: '4', text: 'Static render ready', type: 'milestone', start_date: '2026-04-08T00:00:00.000Z', duration: 0, progress: 0, parent: '1' },
];

export const seedLinks: SerializedLink[] = [
  { id: '1', source: '2', target: '3', type: '0' },
  { id: '2', source: '3', target: '4', type: '0' },
];

export const defaultGanttConfig: GanttConfig = {
  zoom: {
    current: 'day',
    levels: defaultZoomLevels,
  },
  options: {
    row_height: 36,
    bar_height: 24,
  },
};
```

Use string ids and ISO date strings throughout. The wrapper accepts both, but mixing styles makes diffs and snapshots harder to reason about.

## 2. Define the batch apply helper

`src/app/state/apply-batch-changes.ts` is a pure function that applies a list of `DataCallbackChange` records to an entity array. It is shared by tasks and links via a generic, so the store calls it twice with different types.

```ts
import type { DataCallbackChange, TaskId } from '@dhtmlx/trial-angular-gantt';

type EntityWithId = {
  id: TaskId;
};

function idsMatch(left: TaskId, right: TaskId): boolean {
  return String(left) === String(right);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isSupportedAction(action: string): action is 'create' | 'update' | 'delete' {
  return action === 'create' || action === 'update' || action === 'delete';
}

export function applyEntityChanges<T extends EntityWithId>(
  entities: T[],
  changes: DataCallbackChange[] = [],
): T[] {
  const nextEntities = [...entities];

  changes.forEach((change) => {
    if (!isSupportedAction(change.action)) {
      return;
    }

    const index = nextEntities.findIndex((entity) => idsMatch(entity.id, change.id));

    if (change.action === 'delete') {
      if (index !== -1) {
        nextEntities.splice(index, 1);
      }
      return;
    }

    if (!isObject(change.data)) {
      return;
    }

    if (change.action === 'create') {
      nextEntities.push({ ...(change.data as T) });
      return;
    }

    if (index !== -1) {
      nextEntities[index] = {
        ...nextEntities[index],
        ...(change.data as Partial<T>),
      };
    }
  });

  return nextEntities;
}
```

This is the reducer-like core for grouped Gantt changes. The function:

- Returns a new array (never mutates input).
- Coerces ids with `String()` because the wrapper uses `string | number` and either form should match.
- Skips unsupported actions and non-object payloads instead of throwing - the Gantt callback runs in the wrapper's render cycle, so a malformed change should not crash the page.

## 3. Build the GanttStateService

`src/app/state/gantt-state.service.ts` owns the state, derives observable streams for the component, and applies batches.

```ts
import { Injectable } from '@angular/core';
import type {
  BatchChanges,
  GanttConfigOptions,
  SerializedLink,
  SerializedTask,
  TaskId,
} from '@dhtmlx/trial-angular-gantt';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { defaultGanttConfig, seedLinks, seedTasks } from '../data/gantt-seed.data';
import type { GanttConfig, ZoomLevelName } from '../gantt/gantt.types';
import { applyEntityChanges } from './apply-batch-changes';
import type { GanttState, HistorySnapshot } from './gantt-state.models';

function buildZoomConfig(config: GanttConfig, zoomLevel: ZoomLevelName): GanttConfig {
  return {
    ...config,
    zoom: { ...config.zoom, current: zoomLevel },
  };
}

function snapshotState(state: GanttState): HistorySnapshot {
  return {
    tasks: state.tasks.map((task) => ({ ...task })),
    links: state.links.map((link) => ({ ...link })),
    config: structuredClone(state.config),
  };
}

function idsMatch(left: TaskId, right: TaskId): boolean {
  return String(left) === String(right);
}

@Injectable()
export class GanttStateService {
  private readonly stateSubject = new BehaviorSubject<GanttState>({
    tasks: seedTasks,
    links: seedLinks,
    config: buildZoomConfig(defaultGanttConfig, defaultGanttConfig.zoom.current),
    past: [],
    future: [],
    maxHistory: 50,
  });

  readonly state$ = this.stateSubject.asObservable();

  readonly tasks$ = this.state$.pipe(map((state) => state.tasks));
  readonly links$ = this.state$.pipe(map((state) => state.links));
  readonly config$ = this.state$.pipe(map((state) => state.config));

  private buildWrapperConfig(config: GanttConfig): Partial<GanttConfigOptions> {
    const zoomConfig = config.zoom.levels.find((level) => level.name === config.zoom.current);
    if (!zoomConfig) {
      return config.options ?? {};
    }
    return {
      ...config.options,
      scale_height: zoomConfig.scale_height,
      min_column_width: zoomConfig.min_column_width,
      scales: zoomConfig.scales.map((scale) => ({ ...scale })) as typeof zoomConfig.scales,
    };
  }

  readonly wrapperConfig$ = this.config$.pipe(map((config) => this.buildWrapperConfig(config)));

  readonly zoomLevel$ = this.config$.pipe(
    map((config) => config.zoom.current),
    distinctUntilChanged<ZoomLevelName>(),
  );

  readonly canUndo$ = this.state$.pipe(
    map((state) => state.past.length > 0),
    distinctUntilChanged<boolean>(),
  );

  readonly canRedo$ = this.state$.pipe(
    map((state) => state.future.length > 0),
    distinctUntilChanged<boolean>(),
  );

  applyBatch(changes: BatchChanges): void {
    const hasChanges = Boolean(changes.tasks?.length) || Boolean(changes.links?.length);
    if (!hasChanges) return;

    const state = this.stateSubject.value;
    const tasks = applyEntityChanges<SerializedTask>(state.tasks, changes.tasks);
    const links = applyEntityChanges<SerializedLink>(state.links, changes.links);

    this.commit({ tasks, links });
  }

  setZoom(zoomLevel: ZoomLevelName): void {
    const state = this.stateSubject.value;
    if (state.config.zoom.current === zoomLevel) return;
    this.commit({ config: buildZoomConfig(state.config, zoomLevel) });
  }

  undo(): void {
    const state = this.stateSubject.value;
    const previous = state.past.at(-1);
    if (!previous) return;

    this.stateSubject.next({
      ...state,
      tasks: previous.tasks,
      links: previous.links,
      config: previous.config,
      past: state.past.slice(0, -1),
      future: [snapshotState(state), ...state.future],
    });
  }

  redo(): void {
    const state = this.stateSubject.value;
    const next = state.future[0];
    if (!next) return;

    this.stateSubject.next({
      ...state,
      tasks: next.tasks,
      links: next.links,
      config: next.config,
      past: [...state.past, snapshotState(state)].slice(-state.maxHistory),
      future: state.future.slice(1),
    });
  }

  // CRUD helpers (createTask, updateTask, deleteTask, createLink, updateLink, deleteLink)
  // are omitted here for brevity. Each goes through `commit()` so it lands in history.
  // See the demo for the full implementations.

  private commit(change: Partial<Pick<GanttState, 'tasks' | 'links' | 'config'>>): void {
    const state = this.stateSubject.value;
    this.stateSubject.next({
      ...state,
      ...change,
      past: [...state.past, snapshotState(state)].slice(-state.maxHistory),
      future: [],
    });
  }
}
```

Why this shape works:

- The service exposes **multiple narrow streams** (`tasks$`, `links$`, `wrapperConfig$`, `zoomLevel$`, `canUndo$`, `canRedo$`) instead of a single bundled view model. The component picks the streams it needs and the framework rebinds only those `<dhx-gantt>` inputs that actually changed.
- `wrapperConfig$` projects the demo's typed `GanttConfig` into the `Partial<GanttConfigOptions>` shape the wrapper expects - the store's domain model and the wrapper's input shape are intentionally not the same type.
- `distinctUntilChanged` is applied only to streams of primitives (`zoomLevel$`, `canUndo$`, `canRedo$`). On `tasks$` / `links$` / `config$` the operator would do nothing - every commit produces a fresh array or object, so the default reference equality test never sees a duplicate.
- `commit()` always pushes a snapshot to `past` and clears `future`, so any state-changing action is undoable. `setZoom` goes through `commit` for the same reason.
- Snapshots clone tasks and links shallowly (`{ ...task }`) and `structuredClone` the config - enough to keep undo/redo independent of subsequent edits without a deep-clone tax on every commit.

:::note
Since v9.1.3 the wrapper auto-detects ISO date strings, so this demo skips `format_date`/`parse_date` overrides on the store. The shell component still installs them as `templates` (see step 5) for the case where a chart is fed `Date` instances mixed with strings - the `parse_date` template normalizes both. See [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format) for the wrapper's full date-handling story.
:::

## 4. Build the toolbar component

`src/app/gantt/gantt-toolbar.component.ts` is a presentation-only component: inputs for the current state, outputs for the user's intent. It does not know about the store.

```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { ZoomLevelName } from './gantt.types';

@Component({
  selector: 'app-gantt-toolbar',
  standalone: true,
  template: `
    <div class="gantt-toolbar" aria-label="Gantt toolbar">
      <div class="gantt-toolbar-group" aria-label="Zoom level">
        <button type="button" [class.active]="zoomLevel === 'day'" (click)="zoomSelected.emit('day')">Day</button>
        <button type="button" [class.active]="zoomLevel === 'month'" (click)="zoomSelected.emit('month')">Month</button>
        <button type="button" [class.active]="zoomLevel === 'year'" (click)="zoomSelected.emit('year')">Year</button>
      </div>

      <div class="gantt-toolbar-group" aria-label="History controls">
        <button type="button" [disabled]="!canUndo" (click)="undoSelected.emit()">Undo</button>
        <button type="button" [disabled]="!canRedo" (click)="redoSelected.emit()">Redo</button>
      </div>
    </div>
  `,
})
export class GanttToolbarComponent {
  @Input({ required: true }) zoomLevel!: ZoomLevelName;
  @Input({ required: true }) canUndo = false;
  @Input({ required: true }) canRedo = false;

  @Output() readonly zoomSelected = new EventEmitter<ZoomLevelName>();
  @Output() readonly undoSelected = new EventEmitter<void>();
  @Output() readonly redoSelected = new EventEmitter<void>();
}
```

Keeping the toolbar dumb means the shell can change how state is sourced (different store, different input names) without touching the toolbar.

## 5. Compose the shell with `combineLatest`

`src/app/gantt/gantt-shell.component.ts` provides the store, builds a single view model from the store's narrow streams, and exposes the templates/dataConfig that the wrapper needs.

```ts
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
  type AngularGanttTemplates,
} from '@dhtmlx/trial-angular-gantt';
import { combineLatest } from 'rxjs';
import type { ZoomLevelName } from './gantt.types';
import { GanttStateService } from '../state/gantt-state.service';
import { GanttToolbarComponent } from './gantt-toolbar.component';

@Component({
  selector: 'app-gantt-shell',
  standalone: true,
  imports: [AsyncPipe, DhxGanttComponent, GanttToolbarComponent],
  providers: [GanttStateService],
  templateUrl: './gantt-shell.component.html',
})
export class GanttShellComponent {
  private readonly ganttState = inject(GanttStateService);

  protected readonly vm$ = combineLatest({
    tasks: this.ganttState.tasks$,
    links: this.ganttState.links$,
    config: this.ganttState.wrapperConfig$,
    zoomLevel: this.ganttState.zoomLevel$,
    canUndo: this.ganttState.canUndo$,
    canRedo: this.ganttState.canRedo$,
  });

  protected readonly templates: AngularGanttTemplates = {
    parse_date: (value: string | Date) => this.parseDate(value),
    format_date: (date: string | Date) => this.formatDate(date),
  };

  protected readonly dataConfig: AngularGanttDataConfig = {
    batchSave: (changes) => {
      this.ganttState.applyBatch(changes);
    },
  };

  protected setZoom(zoomLevel: ZoomLevelName): void {
    this.ganttState.setZoom(zoomLevel);
  }

  protected undo(): void {
    this.ganttState.undo();
  }

  protected redo(): void {
    this.ganttState.redo();
  }

  private parseDate(value: string | Date): Date {
    return value instanceof Date ? value : new Date(value);
  }

  private formatDate(value: string | Date): string {
    return this.parseDate(value).toISOString();
  }
}
```

The template uses Angular 17+ control flow:

```html
@if (vm$ | async; as vm) {
  <section class="gantt-feature-shell" aria-label="Gantt feature area">
    <app-gantt-toolbar
      [zoomLevel]="vm.zoomLevel"
      [canUndo]="vm.canUndo"
      [canRedo]="vm.canRedo"
      (zoomSelected)="setZoom($event)"
      (undoSelected)="undo()"
      (redoSelected)="redo()">
    </app-gantt-toolbar>

    <div class="gantt-host">
      <dhx-gantt
        [tasks]="vm.tasks"
        [links]="vm.links"
        [config]="vm.config"
        [templates]="templates"
        [data]="dataConfig">
      </dhx-gantt>
    </div>
  </section>
}
```

A few details worth highlighting:

- `providers: [GanttStateService]` on the shell, not on the root - every shell instance gets its own store. Two side-by-side Gantts on the same page won't share undo history.
- `combineLatest` waits until every contributing stream has emitted at least once. That is fine here because the `BehaviorSubject` and the derived `distinctUntilChanged` streams all have an initial value.
- `templates` and `dataConfig` live on the component, not on the service. The service stays unaware of how the wrapper formats dates or where its callbacks come from - only the shell knows the wrapper's API surface.

## 6. Wire it into the app

`src/app/app.ts` mounts the shell as the root view (or as a route target):

```ts
import { Component } from '@angular/core';
import { GanttShellComponent } from './gantt/gantt-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttShellComponent],
  template: `<app-gantt-shell></app-gantt-shell>`,
})
export class AppComponent {}
```

## 7. Data flow and rationale

For a typical edit (for example, dragging a task):

1. User edits a task in the chart.
2. Gantt emits multiple low-level changes.
3. The wrapper batches them and calls `data.batchSave(changes)`.
4. The shell forwards the call to `GanttStateService.applyBatch(changes)`.
5. The service runs `applyEntityChanges` on tasks and links, then `commit({ tasks, links })`.
6. `commit` pushes a `HistorySnapshot` onto `past`, clears `future`, and emits the new state.
7. `tasks$`, `links$`, `wrapperConfig$`, and the `canUndo$` / `canRedo$` flags all push through the `combineLatest`, the view model rebuilds, and Angular rebinds the changed `<dhx-gantt>` inputs.

This keeps Angular state as the source of truth and still handles high-volume chart actions efficiently - Gantt's `batchSave` collapses one user gesture into one store update.

## 8. Common Pitfalls

- **Using `data.save` instead of `batchSave` for auto-scheduling-heavy pages.** A single drag with auto-scheduling on can produce dozens of low-level changes; `data.save` would commit a snapshot per change, blowing up history and triggering many re-renders. `batchSave` collapses one gesture into one commit.
- **Mutating `vm.tasks` or `vm.links` directly in the component.** The view model's arrays are the same references the store holds. Mutating them in place corrupts both current state and any snapshots that share those references.
- **Reusing snapshot arrays without cloning when implementing undo/redo.** `snapshotState` clones each task and link with a spread so future commits cannot retroactively change history. Skipping that step looks fine until your second undo.
- **Mixing imperative `gantt.instance` mutations with store-driven inputs.** If you reach into the underlying Gantt instance to add a task, the store does not see it - the next emission from `tasks$` will overwrite your imperative change.

## 9. Continue With

- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)
- [Configuration Reference](integrations/angular/configuration-props.md)
- [Angular Gantt Overview](integrations/angular/overview.md)
