---
title: Angular Gantt + RxJS 튜토리얼
sidebar_label: RxJS
description: "Angular Gantt를 RxJS 상태 서비스와 통합하는 단계별 가이드로, BehaviorSubject와 data.batchSave를 활용합니다."
---

# Angular Gantt + RxJS 튜토리얼

이 튜토리얼은 의존 주입 가능한 RxJS 서비스를 사용한 상태 기반 Gantt 관리의 실용적인 Angular 패턴을 보여줍니다.

결과적으로:
- `BehaviorSubject`가 작업(task), 연결(link), 그리고 Gantt 구성(config)을 보유합니다,
- 컴포넌트는 `combineLatest`로 뷰 모델을 구성하고 `AsyncPipe`로 바인딩합니다,
- Gantt 편집 흐름은 `data.batchSave`를 통해 스토어로 들어갑니다,
- Undo/Redo와 줌 변경은 상태의 스냅샷에 대해 동일한 서비스에서 처리됩니다.

이 튜토리얼을 따르는 완전한 작동 프로젝트는 GitHub에 있습니다: [angular-gantt-rxjs-starter](https://github.com/DHTMLX/angular-gantt-rxjs-starter).

## 사전 요건

- Angular Gantt가 설치된 Angular 앱(설치 방법은 [Installation](integrations/angular/installation.md)을 참조)
- 작동하는 래퍼 렌더링(참조: [Quick Start](integrations/angular/quick-start.md))
- 기본적인 Angular DI와 RxJS 지식

## 프로젝트 구성

우리는 Gantt 기능을 세 부분 폴더로 나누어 각 조각이 하나의 역할을 가지게 했습니다:

```text
src/app/
  data/
    gantt-seed.data.ts           초기 작업, 링크 및 확대/축소 구성
  gantt/
    gantt-shell.component.*      피처 쉘 및 DHTMLX Gantt 호스트
    gantt-toolbar.component.ts   줌 및 히스토리 컨트롤
    gantt.types.ts               공유 Gantt 피처 타입
  state/
    apply-batch-changes.ts       순수 배치 변경 헬퍼
    gantt-state.models.ts        RxJS 상태 및 히스토리 타입
    gantt-state.service.ts       RxJS 상태, 배치 흐름, 줌, 히스토리
```

`GanttStateService`는 루트가 아닌 `GanttShellComponent`에 의해 제공되므로 렌더링되는 각 쉘은 고유한 작업, 링크, 그리고 Undo/Redo 이력을 가지게 됩니다.

## 1. 타입 정의와 시드 데이터 정의

### 공유 타입: `src/app/gantt/gantt.types.ts`

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

`ZoomLevelName`은 도구 모음(툴바)과 저장소 간의 좁은 문자열 합집합입니다. `GanttConfig`는 필요한 추가 Gantt 옵션과 함께 현재 줌 상태를 보관합니다.

### 상태 모델: `src/app/state/gantt-state.models.ts`

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

스냅샷에는 현재 줌 레벨을 담고 있는 `config`가 포함되므로 Undo 시 줌과 데이터가 함께 복원됩니다.

### 시드 데이터: `src/app/data/gantt-seed.data.ts`

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

모든 문자열 식별자는 문자열(ids)과 ISO 날짜 문자열을 사용합니다. 래퍼는 둘 다 허용하지만 스타일의 혼합은 차이(diff)와 스냅샷 추론을 어렵게 만듭니다.

## 2. 배치 적용 도우미 정의

`src/app/state/apply-batch-changes.ts`는 엔터티 배열에 `DataCallbackChange` 레코드 목록을 적용하는 순수 함수입니다. 제네릭으로 작업과 링크에 공통으로 사용되며, 스토어는 서로 다른 타입으로 두 번 호출합니다.

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

이 함수는 그룹화된 Gantt 변경의 리듀서 같은 핵심입니다. 함수는 다음을 수행합니다:

- 입력을 변경하지 않고 새 배열을 반환합니다.
- 래퍼가 `string | number`를 사용하고 어느 형태이든 매치되어야 하므로 `String()`으로 ID를 강제 변환합니다.
- 잘못된 액션이나 객체가 아닌 페이로드를 건너뛰며 예외를 던지지 않습니다 — Gantt의 callback은 래퍼의 렌더 사이클에서 실행되므로 잘못된 변경이 페이지를 크래시하지 않아야 합니다.

## 3. GanttStateService 빌드

`src/app/state/gantt-state.service.ts`는 상태를 소유하고, 컴포넌트에 필요한 관찰 가능 스트림을 도출하며, 배치를 적용합니다.

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

  // 간략화를 위해 CRUD 헬퍼(createTask, updateTask, deleteTask, createLink, updateLink, deleteLink)
  // 는 생략됩니다. 각 변경은 모두 `commit()`를 거쳐 히스토리에 남습니다.
  // 전체 구현은 데모를 참조하세요.

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

왜 이 형태가 잘 작동하는가:

- 서비스는 여러 개의 좁은 스트림을 노출합니다(`tasks$`, `links$`, `wrapperConfig$`, `zoomLevel$`, `canUndo$`, `canRedo$`). 컴포넌트는 필요한 스트림만 선택하고, 프레임워크는 실제로 변경된 입력만 다시 바인딩합니다.
- `wrapperConfig$`는 Demo의 타이핑된 `GanttConfig`를 래퍼가 기대하는 `Partial<GanttConfigOptions>` 형태로 투영합니다 — 저장소의 도메인 모델과 래퍼 입력 형태는 의도적으로 다릅니다.
- `distinctUntilChanged`는 원시 타입의 스트림(`zoomLevel$`, `canUndo$`, `canRedo$`)에만 적용됩니다. `tasks$`/`links$`/`config$`에 대해서는 매번 커밋이 새로운 배열이나 객체를 만들므로 기본 참조 동등성 검사에서 중복으로 보지 않습니다.
- `commit()`은 항상 `past`에 스냅샷을 추가하고 `future`를 비웁니다. 따라서 어떤 상태 변경도 Undo가 가능합니다. 같은 이유로 `setZoom`도 `commit`을 통해 처리됩니다.
- 스냅샷은 작업과 링크를 얕게 복제하고(`{ ...task }`) 구성을 `structuredClone`합니다. 이는 Undo/Redo를 서로 독립적으로 유지하는 데 충분하며 매 커밋마다 깊은 복사를 수행하는 비용을 줄여 줍니다.

:::note
버전 9.1.3 이후로 래퍼가 ISO 날짜 문자열을 자동으로 감지하므로 저장소에서 `format_date`/`parse_date` 재정의를 건너뜁니다. 셸 컴포넌트는 여전히 이를 `templates`로 설치합니다(5단계 참고) 차트에 문자열과 혼합된 `Date` 인스턴스가 제공되는 경우를 대비합니다 - `parse_date` 템플릿은 둘 다 정규화합니다. 래퍼의 전체 날짜 처리 이야기는 [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format)에서 확인할 수 있습니다.
:::

## 4. 도구 모음(toolbar) 구성

`src/app/gantt/gantt-toolbar.component.ts`는 프리젠테이션 전용 컴포넌트입니다: 현재 상태에 대한 입력과 사용자의 의도에 대한 출력만 존재합니다. 스토어를 알지 못합니다.

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

툴바를 무게중심 없이 두면 쉘이 상태를 어디에서 어떻게 얻는지 바꾸더라도 툴바를 수정 없이 재사용할 수 있습니다.

## 5. `combineLatest`로 쉘 조합하기

`src/app/gantt/gantt-shell.component.ts`는 스토어를 제공하고, 스토어의 좁은 스트림들로 하나의 뷰 모델을 구성하며 래퍼가 필요로 하는 템플릿/데이터 구성을 노출합니다.

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

템플릿은 Angular 17+의 컨트롤 흐름을 사용합니다:

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

주요 포인트 몇 가지를 강조하면:

- 쉘에 있는 `providers: [GanttStateService]`는 루트가 아니라 쉘마다 인스턴스를 제공합니다 — 각 쉘 인스턴스는 독립적인 저장소를 가지므로 같은 페이지에 나란히 있는 두 개의 Gantt는 Undo 히스토리를 공유하지 않습니다.
- `combineLatest`는 모든 기여 스트림이 적어도 한 번은 방출될 때까지 기다립니다. 여기서는 `BehaviorSubject`와 파생된 `distinctUntilChanged` 스트림 모두 초기 값을 가지므로 문제가 되지 않습니다.
- `templates`와 `dataConfig`는 서비스가 아닌 컴포넌트에 위치합니다. 서비스는 래퍼가 날짜를 어떻게 포맷하는지 또는 그 콜백이 어디서 오는지 모릅니다 — 오직 쉘만이 래퍼의 API 표면을 알고 있습니다.

## 6. 앱에 연결하기

`src/app/app.ts`는 뷰의 루트로 쉘을 마운트합니다(또는 라우트 대상):

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

## 7. 데이터 흐름과 근거

일반적인 편집(예: 작업을 드래그하는 경우)에 대한 흐름은 보통 다음과 같습니다:

1. 사용자가 차트에서 작업을 편집합니다.
2. Gantt가 여러 개의 저수준 변경을 방출합니다.
3. 래퍼가 이들을 배치하고 `data.batchSave(changes)`를 호출합니다.
4. 쉘이 이 호출을 `GanttStateService.applyBatch(changes)`로 전달합니다.
5. 서비스는 `applyEntityChanges`를 작업과 링크에 적용한 뒤 `commit({ tasks, links })`를 실행합니다.
6. `commit`은 히스토리에 `HistorySnapshot`을 추가하고 `past`를 업데이트하며 새로운 상태를 방출합니다.
7. `tasks$`, `links$`, `wrapperConfig$`, 그리고 `canUndo$` / `canRedo$` 플래그들이 모두 `combineLatest`를 통해 방출되고 뷰 모델이 재구성되며 Angular가 변경된 입력을 다시 바인딩합니다.

이로써 Angular의 상태를 신뢰의 원천으로 유지하면서도 차트의 대량 변경에 대해 효율적으로 대응합니다 — Gantt의 `batchSave`는 하나의 제스처를 하나의 스토어 업데이트로 축약합니다.

## 8. 일반적인 함정

- **자동 스케줄링이 많은 페이지에서 `data.save`를 사용하는 경우.** 한 번의 드래그로도 수십 개의 저수준 변경이 발생할 수 있습니다. `data.save`는 변경당 스냅샷을 커밋하게 되어 히스토리와 재렌더링이 폭주합니다. `batchSave`는 제스처를 하나의 커밋으로 축약합니다.
- **컴포넌트에서 `vm.tasks` 또는 `vm.links`를 직접 mutate하는 경우.** 뷰 모델의 배열은 스토어가 보유한 참조와 동일합니다. 이를 제자리에서 수정하면 현재 상태와 스냅샷이 공유 참조를 오염시켜 버립니다.
- **Undo/Redo 구현 시 스냅샷 배열을 복제하지 않는 경우.** `snapshotState`는 각 작업과 링크를 얕은 복제로 만들어 이후의 커밋이 히스토리를 변경하지 못하도록 합니다. 이 과정을 생략하면 두 번째 Undo에서 문제가 생길 수 있습니다.
- **imperative한 `gantt.instance` 변형과 스토어 기반 입력을 혼합하는 경우.** 기본 Gantt 인스턴스에 직접 접근해 작업을 추가하면 저장소가 이를 보지 못합니다 — `tasks$`의 다음 방출이 impérative 변경을 덮어쓸 것입니다.

## 9. 계속하기

- [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md)
- [Configuration Reference](integrations/angular/configuration-props.md)
- [Angular Gantt Overview](integrations/angular/overview.md)