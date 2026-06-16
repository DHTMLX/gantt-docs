---
title: Angular Gantt mit RxJS Tutorial
sidebar_label: RxJS
description: "Schritt-für-Schritt-Anleitung zur Integration von Angular Gantt mit einem RxJS-State-Service unter Verwendung von BehaviorSubject und data.batchSave."
---

# Angular Gantt mit RxJS Tutorial

Dieses Tutorial zeigt ein praktisches Angular-Muster für zustandsgesteuerte Gantt-Verwaltung mithilfe eines injizierbaren RxJS-Dienstes.

Das Ergebnis:

- ein `BehaviorSubject` hält Aufgaben (tasks), Verbindungen (links) und Gantt-Konfiguration (Gantt config),
- die Komponente bildet ein ViewModel mit `combineLatest` und bindet über den `AsyncPipe`,
- Gantt-Bearbeitungen fließen über `data.batchSave` in den Store ein,
- Rückgängig/Wiederherstellen (undo/redo) und Zoom-Änderungen werden im selben Dienst gegen Snapshots des Zustands gehandhabt.

Ein vollständiges, funktionsfähiges Projekt, das dieser Anleitung folgt, befindet sich auf GitHub: [angular-gantt-rxjs-starter](https://github.com/DHTMLX/angular-gantt-rxjs-starter).

## Voraussetzungen

- Angular-Anwendung mit installiertem Angular Gantt (siehe [Installation](integrations/angular/installation.md))
- Funktionsfähige Wrapper-Darstellung (siehe [Quick Start](integrations/angular/quick-start.md))
- Grundkenntnisse in Angular DI und RxJS

## Projektstruktur

Wir teilen das Gantt-Feature in drei Ordner auf, damit jedes Teilstück eine Aufgabe hat:

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

`GanttStateService` wird von `GanttShellComponent` bereitgestellt (nicht im Root), sodass jede gerenderte Shell isolierte Tasks, Links und Undo/Redo-Historie erhält.

## 1. Typen definieren und Seed-Daten

### Gemeinsame Typen: `src/app/gantt/gantt.types.ts`

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

`ZoomLevelName` ist eine enge String-Union, die vom Toolbar- und Store-Austausch verwendet wird. `GanttConfig` hält den Zoom-Zustand neben allen zusätzlichen Gantt-Optionen, die die Funktion benötigt.

### Zustandsmodelle: `src/app/state/gantt-state.models.ts`

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

Snapshots enthalten `config` (welches die aktuelle Zoom-Stufe trägt), daher wird beim Rückgängigmachen auch der Zoom zusammen mit den Daten wiederhergestellt.

### Seed-Daten: `src/app/data/gantt-seed.data.ts`

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

Verwendet wurden String-IDs und ISO-Datumsstrings. Der Wrapper akzeptiert beides, aber gemischte Formate erschweren Diff- und Snapshot-Analysen.

## 2. Definieren des Batch-Anwendungs-Helfers

`src/app/state/apply-batch-changes.ts` ist eine Pure-Funktion, die eine Liste von `DataCallbackChange`-Aufnahmen auf ein Entität-Array anwendet. Sie wird von Tasks und Links über einen generischen Typ gemeinsam genutzt, sodass der Store zweimal mit unterschiedlichen Typen aufruft.

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

Dies ist der reducer-ähnliche Kern für gruppierte Gantt-Änderungen. Die Funktion:

- gibt ein neues Array zurück (mutiert das Eingabe-Array nie),
- konvertiert IDs mit `String()`, weil der Wrapper `string | number` verwendet und jede Form übereinstimmen sollte,
- überspringt nicht unterstützte Aktionen und Payloads, die keine Objekte sind, anstatt eine Ausnahme zu werfen – der Gantt-Callback läuft im Renderzyklus des Wrappers, daher sollte eine fehlerhafte Änderung die Seite nicht crashen.

## 3. Aufbau des GanttStateService

`src/app/state/gantt-state.service.ts` verwaltet den Zustand, leitet abgeleitete Observable-Ströme für die Komponente ab und wendet Batch-Änderungen an.

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

  // CRUD-Hilfsfunktionen (createTask, updateTask, deleteTask, createLink, updateLink, deleteLink)
  // sind der Kürze halber hier ausgelassen. Jedes geht über `commit()`, damit es in die Historie eingeht.
  // Siehe das Demo-Beispiel für vollständige Implementierungen.

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

Warum diese Form funktioniert:

- Der Service exponiert **mehrere enge Streams** (`tasks$`, `links$`, `wrapperConfig$`, `zoomLevel$`, `canUndo$`, `canRedo$`) statt eines einzelnen gebündelten ViewModels. Die Komponente wählt die benötigten Streams aus und das Framework bound nur jene `<dhx-gantt>`-Inputs neu, die sich tatsächlich geändert haben.
- `wrapperConfig$` projiziert die typisierte `GanttConfig`-des Demoprojekts in die Form `Partial<GanttConfigOptions>`, die der Wrapper erwartet – das Domänenmodell des Stores und die Input-Form des Wrappers sind absichtlich nicht vom gleichen Typ.
- `distinctUntilChanged` wird nur auf Streams primitiver Werte angewendet (`zoomLevel$`, `canUndo$`, `canRedo$`). Bei `tasks$` / `links$` / `config$` würde der Operator nichts tun – jeder Commit erzeugt ein frisches Array oder Objekt, daher erkennt die Referenz-Gleichheitstests kein Duplikat.
- `commit()` schiebt immer einen Snapshot in `past` und leert `future`, sodass jede zustandsverändernde Aktion rückgängig gemacht werden kann. `setZoom` läuft aus dem gleichen Grund über `commit`.
- Snapshots klonen Aufgaben und Verknüpfungen flach (`{ ...task }`) und verwenden `structuredClone` für die Config – ausreichend, um Undo/Redo unabhängig von nachfolgenden Bearbeitungen zu halten, ohne dass ein Tiefenkopie-Overhead bei jedem Commit entsteht.

:::note
Seit v9.1.3 erkennt der Wrapper ISO-Datumstrings automatisch, daher überspringt dieses Demo Overrides von `format_date`/`parse_date` im Store. Die Shell-Komponente installiert sie weiterhin als `templates` (siehe Schritt 5) für den Fall, dass ein Diagramm `Date`-Instanzen gemischt mit Strings erhält – das `parse_date`-Template normalisiert beides. Siehe [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format) für die vollständige Datumshandhabungsgeschichte des Wrappers.
:::

## 4. Aufbau der Toolbar-Komponente

`src/app/gantt/gantt-toolbar.component.ts` ist eine rein präsentationsbasierte Komponente: Eingaben für den aktuellen Zustand, Ausgaben für die Absicht des Benutzers. Sie kennt den Store nicht.

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

Diesen Presenter-Traffic oben zu halten, bedeutet, dass der Shell entscheiden kann, wie der Zustand bezogen wird (anderer Store, andere Eingabenamen), ohne die Toolbar zu berühren.

## 5. Die Shell mit `combineLatest` zusammensetzen

`src/app/gantt/gantt-shell.component.ts` stellt den Store bereit, baut ein einzelnes ViewModel aus den schmalen Streams des Stores und exposed die Templates/DatenConfig, die der Wrapper benötigt.

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

Die Vorlage nutzt Angular 17+ Control-Flow:

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

Einige Details, die es wert sind hervorgehoben zu werden:

- `providers: [GanttStateService]` auf der Shell, nicht im Root – jede Shell-Instanz erhält ihren eigenen Store. Zwei nebeneinander angezeigte Gantt-Diagramme auf derselben Seite teilen sich keinen Undo-Verlauf.
- `combineLatest` wartet, bis jeder beitragende Stream mindestens einmal emittiert hat. Das passt hier gut, weil der `BehaviorSubject` und die abgeleiteten `distinctUntilChanged`-Streams alle einen Anfangswert haben.
- `templates` und `dataConfig` leben im Componenten, nicht im Service. Der Service bleibt unbewusst davon, wie der Wrapper Datumswerte formatiert oder woher seine Callback-Funktionen kommen – nur die Shell kennt die API-Oberfläche des Wrappers.

## 6. In die App einbinden

`src/app/app.ts` mountet die Shell als Root-Ansicht (oder als Route-Ziel):

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

## 7. Datenfluss und Begründung

Für eine typische Bearbeitung (zum Beispiel beim Ziehen einer Aufgabe):

1. Der Benutzer bearbeitet eine Aufgabe im Diagramm.
2. Gantt emittiert mehrere Low-Level-Änderungen.
3. Der Wrapper fasst sie zusammen und ruft `data.batchSave(changes)` auf.
4. Die Shell leitet den Aufruf an `GanttStateService.applyBatch(changes)` weiter.
5. Der Service führt `applyEntityChanges` auf Tasks und Links aus, dann `commit({ tasks, links })`.
6. `commit` legt einen `HistorySnapshot` in `past` ab, leert `future` und gibt den neuen Zustand aus.
7. Die Streams `tasks$`, `links$`, `wrapperConfig$` und die Flags `canUndo$` / `canRedo$` durchlaufen alle `combineLatest`, das ViewModel wird neu aufgebaut und Angular bindet die geänderten `<dhx-gantt>`-Inputs erneut.
 
Dieser Ansatz hält Angulars State als Quelle der Wahrheit und bewahrt zugleich die Fähigkeit, hochvolumige Chart-Aktionen effizient zu handhaben – Gantts `batchSave` fasst eine Benutzer-Geste in eine einzige Store-Aktualisierung zusammen.

## 8. Häufige Stolpersteine

- **Verwendung von `data.save` statt `batchSave` bei Seiten mit starkem Auto-Scheduling.** Eine einzelne Drag-Bewegung mit aktiviertem Auto-Scheduling kann Dutzende von Low-Level-Änderungen erzeugen; `data.save` würde bei jeder Änderung einen Snapshot anlegen, den Verlauf aufblasen und viele Neuberechnungen auslösen. `batchSave` fasst eine Benutzer-Geste in einen einzelnen Commit zusammen.
- **Mutation von `vm.tasks` oder `vm.links` direkt in der Komponente.** Die ViewModel-Arrays sind dieselben Referenzen, die der Store hält. In-place-Modifikationen verfälschen sowohl den aktuellen Zustand als auch Snapshots, die diese Referenzen teilen.
- **Wiederverwenden von Snapshot-Arrays ohne Klonen bei Undo/Redo.** `snapshotState` klont jede Aufgabe und jeden Link mittels Spread, damit zukünftige Commits die Historie nicht rückwirkend verändern können. Das Überspringen dieses Schrittes mag beim ersten Undo funktionieren, beim zweiten Undo jedoch scheitern.
- **Mischung von imperativen `gantt.instance`-Mutationen mit store-gesteuerten Eingaben.** Greifen Sie in die zugrunde liegende Gantt-Instanz ein, um eine Aufgabe hinzuzufügen, sieht der Store das nicht – die nächste Emission von `tasks$` überschreibt Ihre imperative Änderung.

## 9. Weiterhin mit

- [Data Binding und State Management Basics](integrations/angular/state/state-management-basics.md)
- [Configuration Reference](integrations/angular/configuration-props.md)
- [Angular Gantt Overview](integrations/angular/overview.md)