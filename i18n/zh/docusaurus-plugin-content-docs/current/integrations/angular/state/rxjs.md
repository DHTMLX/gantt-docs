---
title: 使用 Angular Gantt 与 RxJS
sidebar_label: RxJS
description: "将 Angular Gantt 与基于 BehaviorSubject 的 RxJS 状态服务结合的分步指南，使用 BehaviorSubject 和 data.batchSave。"
---

# Angular Gantt + RxJS 教程

本教程展示了一个面向状态驱动的 Gantt 管理的实用 Angular 模式，使用一个可注入的 RxJS 服务。

结果是：

- 一个 `BehaviorSubject` 保存任务、链接和 Gantt 配置，
- 组件使用 `combineLatest` 构建视图模型，并通过 `AsyncPipe` 进行绑定，
- Gantt 的编辑通过 `data.batchSave` 流入存储，
- 撤销/重做和缩放变更在同一个服务中基于状态快照进行处理。

一个完整的、遵循本教程的工作项目托管在 GitHub 上：[angular-gantt-rxjs-starter](https://github.com/DHTMLX/angular-gantt-rxjs-starter)。

## 先决条件

- 已安装 Angular Gantt 的 Angular 应用（参见 [安装](integrations/angular/installation.md)）
- 能工作渲染的 wrapper（参见 [快速开始](integrations/angular/quick-start.md)）
- 基本的 Angular DI 和 RxJS 知识

## 项目结构

我们将 Gantt 功能拆分为三个文件夹，以确保每个部分只有一个职责：

```text
src/app/
  data/
    gantt-seed.data.ts           初始任务、链接和缩放配置
  gantt/
    gantt-shell.component.*      功能外壳与 DHTMLX Gantt 主机
    gantt-toolbar.component.ts   缩放和历史记录控制
    gantt.types.ts               共享 Gantt 功能类型
  state/
    apply-batch-changes.ts       纯函数：任务/链接的批量变更辅助
    gantt-state.models.ts        RxJS 状态和历史类型
    gantt-state.service.ts       RxJS 状态、批量流程、缩放、历史
```

`GanttStateService` 由 `GanttShellComponent` 提供（不是在根节点提供），因此每个渲染的 shell 都会获得独立的任务、链接与撤销/重做历史。

## 1. 定义类型与种子数据

### 共享类型：`src/app/gantt/gantt.types.ts`

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

`ZoomLevelName` 是一个窄字符串联合类型，用于工具栏和存储之间的交换。`GanttConfig` 将缩放状态与特性所需的其他 Gantt 选项一并维护。

### 状态模型：`src/app/state/gantt-state.models.ts`

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

快照包含 `config`（其中携带当前的缩放级别），因此撤销会连同数据一起还原缩放。

### 种子数据：`src/app/data/gantt-seed.data.ts`

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

请在整个文档中使用字符串 id 和 ISO 日期字符串。包装器两者都接受，但混用会让差异和快照更难推理。

## 2. 定义批量应用辅助函数

### `src/app/state/apply-batch-changes.ts`

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

这是分组 Gantt 变更的 reducer 风格核心。该函数：

- 返回一个新数组（从不修改原始输入）。
- 用 `String()` 将 id 强制为字符串，因为包装器使用 `string | number`，两者形式都应匹配。
- 跳过不受支持的操作和非对象载荷，而不是抛出异常——Gantt 回调在包装器的渲染周期中执行，因此格式错误的变更不应导致页面崩溃。

## 3. 构建 GanttStateService

### `src/app/state/gantt-state.service.ts`

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

为何这种结构有效：

- 该服务暴露**多个窄流**（`tasks$`、`links$`、`wrapperConfig$`、`zoomLevel$`、`canUndo$`、`canRedo$`），而不是单一的打包视图模型。组件按需选择流，框架仅重新绑定实际改变的 `<dhx-gantt>` 输入。
- `wrapperConfig$` 将演示中的类型化 `GanttConfig` 投影到包装器预期的 `Partial<GanttConfigOptions>` 形状——存储的领域模型与包装器的输入形状本就并非同一类型。
- 只有对原始类型的流（`zoomLevel$`、`canUndo$`、`canRedo$`）应用 `distinctUntilChanged`。对于 `tasks$` / `links$` / `config$`，运算符不会起作用——每次提交都会产生新的数组或对象，因此默认的引用相等性测试不会检测到重复值。
- `commit()` 总是把快照推入 `past`，并清空 `future`，因此任何状态改变的操作都是可撤销的。`setZoom` 通过 `commit` 实现同样的逻辑。
- 快照对任务和链接进行浅克隆（`{ ...task }`），对配置进行 `structuredClone` —— 这样可以在后续编辑不影响撤销/重做的前提下保持它们彼此独立，而不必对每次提交执行深克隆的成本。

:::note
自从 v9.1.3 版本，包装器能够自动检测 ISO 日期字符串，因此本演示跳过存储上对 `format_date`/`parse_date` 的覆盖。外壳组件仍将它们作为 `templates` 安装（参见步骤 5），以防图表接收混合了 Date 实例和字符串的情况——`parse_date` 模板对两者均进行规范化。有关包装器的完整日期处理，请参阅 [ISO 日期格式下的日期加载](guides/loading.md#loading-dates-in-iso-format) 以了解包装器的完整日期处理故事。
:::

## 4. 构建工具栏组件

`src/app/gantt/gantt-toolbar.component.ts` 是一个仅展示的组件：用于接收当前状态的输入、用于用户意图的输出。它不需要了解存储。

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

保持工具栏的简单职责意味着外壳可以在不修改工具栏的情况下改变状态的来源（不同的 store、不同的输入名称）。

## 5. 通过 `combineLatest` 组合 Shell

`src/app/gantt/gantt-shell.component.ts` 提供了存储、从存储的窄流中构建单一视图模型，并暴露 wrapper 需要的模板/数据配置。

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

模板使用 Angular 17+ 的控制流：

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

值得强调的几个细节：

- `providers: [GanttStateService]` 放在 shell 上，而非根节点——每个 shell 实例都拥有自己的存储。并排放置在同一页面上的两个 Gantt 不会共享撤销历史。
- `combineLatest` 会等待所有参与的流都至少发出一次值。这在这里是合理的，因为 `BehaviorSubject` 和派生的 `distinctUntilChanged` 流都具有初始值。
- `templates` 与 `dataConfig` 直接放在组件上，而非服务上。服务保持对包装器的日期格式化方式和回调来源的不可知——只有 shell 知道包装器的 API 面。

## 6. 将其接入应用

`src/app/app.ts` 将 shell 挂载为根视图（或作为路由目标）：

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

## 7. 数据流与原理

对于一个典型的编辑（例如拖拽任务）：

1. 用户在图表中编辑任务。  
2. Gantt 发出多组底层变更。  
3. 包装器将它们分批处理并调用 `data.batchSave(changes)`。  
4. 外壳将调用转发给 `GanttStateService.applyBatch(changes)`。  
5. 服务对任务和链接执行 `applyEntityChanges`，随后执行 `commit({ tasks, links })`。  
6. `commit` 将一个 `HistorySnapshot` 推入 `past`，清空 `future`，并输出新的状态。  
7. `tasks$`、`links$`、`wrapperConfig$` 以及 `canUndo$` / `canRedo$` 标志都通过 `combineLatest` 推出新值，视图模型重新构建，Angular 重新绑定已改变的 `<dhx-gantt>` 输入。  

这使 Angular 状态成为真理之源，同时仍然高效处理大规模的图表操作——Gantt 的 `batchSave` 将一个用户手势折叠成一次存储更新。

## 8. 常见陷阱

- **使用 `data.save` 而非 `batchSave` 来处理高度自动排程的页面。** 一次拖动若开启自动排程，可能产生数十个底层变更；`data.save` 会为每个变更提交快照，导致历史膨胀并触发多次重新渲染。`batchSave` 将一个手势折叠为一次提交。
- **直接在组件中变更 `vm.tasks` 或 `vm.links`。** 视图模型的数组与存储中的引用相同。就地修改会破坏当前状态和任何共享这些引用的快照。
- **在实现撤销/重做时未克隆快照数组就复用。** `snapshotState` 对任务和链接进行浅克隆以确保后续提交不会回溯性地修改历史。跳过此步骤在第二次撤销时看起来可能没问题，但会出错。  
- **将命令式的 `gantt.instance` 变动与基于存储的输入混合使用。** 如果直接操作底层 Gantt 实例来添加任务，存储不会看到它——`tasks$` 的下一次发射会覆盖你的命令式变动。

## 9. 继续阅读

- [数据绑定与状态管理基础](integrations/angular/state/state-management-basics.md)
- [配置引用](integrations/angular/configuration-props.md)
- [Angular Gantt 概览](integrations/angular/overview.md)