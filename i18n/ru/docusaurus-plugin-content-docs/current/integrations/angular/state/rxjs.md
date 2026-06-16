---
title: Использование Angular Gantt с RxJS
sidebar_label: RxJS
description: "Пошаговое руководство по интеграции Angular Gantt с RxJS‑сервисом состояния с использованием BehaviorSubject и data.batchSave."
---

# Урок по Angular Gantt + RxJS

Этот учебник демонстрирует практичный образец Angular для управления Gantt на основе состояний с внедряемым RxJS-сервисом.

Результат:

- `BehaviorSubject` хранит задачи, связи и конфигурацию Gantt,
- компонент формирует view-модель с помощью `combineLatest` и связывает её через `AsyncPipe`,
- правки в Gantt поступают в хранилище через `data.batchSave`,
- undo/redo и изменения масштаба обрабатываются тем же сервисом по снимкам состояния.

Полный рабочий проект, following this tutorial, доступен на GitHub: [angular-gantt-rxjs-starter](https://github.com/DHTMLX/angular-gantt-rxjs-starter).

## Предварительные условия

- Приложение Angular с установленным Angular Gantt (см. [Установка](integrations/angular/installation.md))
- Рабочий рендерер-обёртка (см. [Быстрый старт](integrations/angular/quick-start.md))
- Базовые знания DI в Angular и RxJS

## Структура проекта

Мы разделили функционал Gantt на три папки, чтобы каждая часть выполняла одну задачу:

```text
src/app/
  data/
    gantt-seed.data.ts           начальнiе задачи, связи и конфигурация масштабирования
  gantt/
    gantt-shell.component.*      оболочка фичи и хост DHTMLX Gantt
    gantt-toolbar.component.ts   элементы управления масштабом и историей
    gantt.types.ts               общие типы фичи Gantt
  state/
    apply-batch-changes.ts       чистая функция для пакетного изменения задач/ссылок
    gantt-state.models.ts        типы состояния и истории RxJS
    gantt-state.service.ts       RxJS-состояние, пакетный поток, масштаб, история
```

`GanttStateService` предоставляется `GanttShellComponent` (не на корневом модуле), поэтому каждому отрисованному шеллу достаются изолированные задачи, связи и история undo/redo.

## 1. Определение типов и начальные данные

### Общие типы: `src/app/gantt/gantt.types.ts`

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

`ZoomLevelName` — узкий набор строк для панели инструментов и обмена данными со стором. `GanttConfig` хранит состояние масштаба наряду с любыми дополнительными опциями Gantt, которые понадобятся фиче.

### Модели состояния: `src/app/state/gantt-state.models.ts`

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

Снимки включают `config` (который несёт текущий уровень масштаба), поэтому undo восстанавливает масштаб вместе с данными.

### Начальные данные: `src/app/data/gantt-seed.data.ts`

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

Используйте строковые идентификаторы и даты в формате ISO повсеместно. Обёртке можно принимать и тот и другой стиль, но смешивание форматов затрудняет анализ diffs и снапшотов.

## 2. Определение помощника пакетного применения изменений

`src/app/state/apply-batch-changes.ts` — чистая функция, применяющая набор записей `DataCallbackChange` к массиву сущностей. Она общая для задач и связей через дженерик, поэтому хранилище вызывает её дважды с разными типами.

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

Это reducer‑подобное ядро для группированных изменений Gantt. Функция:

- возвращает новый массив (никогда не изменяет входной массив),
- приводит id к строке через `String()`, потому что обёртка использует `string | number` и любой из форм может встречаться,
- пропускает неподдерживаемые действия и непредоставляющие объект SOAP полезные данные вместо выбрасывания исключения — callback Gantt выполняется в цикле рендеринга обёртки, поэтому некорректное изменение страницы не должно приводить к падению.

## 3. Построение GanttStateService

`src/app/state/gantt-state.service.ts` владеет состоянием, формирует потоки для компонента и применяет пакетные изменения.

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

  // CRUD‑помощники (createTask, updateTask, deleteTask, createLink, updateLink, deleteLink)
  // опущены здесь для краткости. Каждый выполняется через `commit()`, чтобы попасть в историю.
  // Полная реализация см. в демо.

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

Почему такая структура работает:

- сервис выдаёт несколько узких потоков (`tasks$`, `links$`, `wrapperConfig$`, `zoomLevel$`, `canUndo$`, `canRedo$`) вместо одного объединённого представления. Компонент выбирает нужные потоки, и фреймворк перера binds только те входы `<dhx-gantt>`, которые действительно изменились.
- `wrapperConfig$` проецирует типизированное `GanttConfig` во форму `Partial<GanttConfigOptions>`, которую ожидает обёртка — доменная модель хранилища и входная форма обёртки намеренно различны по типам.
- `distinctUntilChanged` применяется только к потокам примитивов (`zoomLevel$`, `canUndo$`, `canRedo$`). Для `tasks$` / `links$` / `config$` оператор был бы бесполезен — каждый коммит возвращает новый массив или объект, поэтому тест на светлые совпадения не сработает.
- `commit()` всегда добавляет снимок в `past` и очищает `future`, поэтому любое изменение состояния можно отменить. `setZoom` идет через `commit` по той же причине.
- Снимки клонируют задачи и связи поверхностно (`{ ...task }`) и `structuredClone` конфигурацию — достаточно, чтобы undo/redo оставались независимыми от последующих правок, без накладных расходов глубокой копирования на каждом коммите.

:::note
С версии v9.1.3 обёртка автоматически распознаёт даты в формате ISO, поэтому данный демо-пример пропускает overrides `format_date`/`parse_date` в хранилище. Оболочка всё ещё устанавливает их как `templates` (см. шаг 5) на случай, если график получает `Date`-инстансы вместе со строками — шаблон `parse_date` нормализует оба. См. [Загрузка дат в формате ISO](guides/loading.md#loading-dates-in-iso-format) для полной истории обработки дат обёрткой.
:::

## 4. Построение компонента панели инструментов

`src/app/gantt/gantt-toolbar.component.ts` — презентационный компонент: входы для текущего состояния, выходы — для намерений пользователя. Он не знает о хранилище.

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

Делая панель инструментов простой, оболочка может менять источник состояния (д другой store, другие имена inputs) без изменений самой панели.

## 5. Объединение оболочки с помощью `combineLatest`

`src/app/gantt/gantt-shell.component.ts` обеспечивает хранение, формирует единое view‑модель из узких потоков хранилища и передаёт шаблоны/данные, которые необходимы обёртке.

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

Шаблон использует управление потоком Angular 17+:

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

Некоторые детали, которые стоит выделить:

- `providers: [GanttStateService]` на оболочке, а не на корне — у каждой инстанции оболочки свой store. Два соседних Gantt на одной странице не будут разделять историю Undo.
- `combineLatest` ждёт, пока каждый вносящий поток излучит значение как минимум один раз. Это нормально здесь, потому что `BehaviorSubject` и производные потоки с `distinctUntilChanged` имеют начальное значение.
- `templates` и `dataConfig` живут на компоненте, а не в сервисе. Сервис остается не знающим, как обёртка форматирует даты или откуда берутся его колбэки — об этом знает только оболочка, API обёртки.

## 6. Подключение в приложение

`src/app/app.ts` монтирует оболочку как корневой вид (или как цель маршрута):

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

## 7. Поток данных и обоснование

Для типового редактирования (например, перетаскивания задачи):

1. Пользователь редактирует задачу на диаграмме.
2. Gantt испускает несколько изменений низкого уровня.
3. Обёртка пакетирует их и вызывает `data.batchSave(changes)`.
4. Оболочка перенаправляет вызов к `GanttStateService.applyBatch(changes)`.
5. Сервис запускает `applyEntityChanges` для задач и связей, затем `commit({ tasks, links })`.
6. `commit` добавляет снимок состояния в `past`, очищает `future` и испускает новое состояние.
7. `tasks$`, `links$`, `wrapperConfig$`, а также флаги `canUndo$`/`canRedo$` проходят через `combineLatest`, формируется новая view-модель, и Angular заново привязывает изменённые входы `<dhx-gantt>`.

Это сохраняет состояние Angular в качестве источника истины и при этом эффективно обрабатывает операции на графике с большим объёмом действий — `batchSave` Gantt сводит одно действие пользователя к одному обновлению хранилища.

## 8. Типичные ошибки

- **Использование `data.save` вместо `batchSave` для страниц с высокой авто-расписанием.** Один перетаскиванием с включённой авто-расписанием может привести к десяткам изменений низкого уровня; `data.save` зафиксирует снимок на каждое изменение, взрывая историю и вызывая множество повторных рендеров. `batchSave` консолидирует одно действие в одно обновление хранилища.
- **Модификация `vm.tasks` или `vm.links` напрямую в компоненте.** Массивы в представлении — это те же ссылки, которые держит хранилище. Их изменение на месте портит текущее состояние и любые снимки, которые ими делятся.
- **Повторное использование массивов снимков без клонирования при реализации undo/redo.** `snapshotState` клонирует каждую задачу и ссылку с помощью spread, чтобы последующие коммиты не могли повлиять на историю задним числом. Пропуск этого шага может привести к проблемам при втором undo.
- **Смешивание императивных мутаций `gantt.instance` с входами, управляемыми хранилищем.** Если вы обратитесь к базовому экземпляру Gantt, чтобы добавить задачу, хранилище его не увидит — следующий выброс из `tasks$` перезапишет ваше императивное изменение.

## 9. Дальнейшие шаги

- [Основы привязки данных и управления состоянием](integrations/angular/state/state-management-basics.md)
- [Справочник по конфигурациям](integrations/angular/configuration-props.md)
- [Обзор Angular Gantt](integrations/angular/overview.md)