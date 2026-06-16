---
title: Angular Gantt Überblick
sidebar_label: Überblick
description: "Architektur-Überblick über Angular Gantt: Fähigkeiten, Datenfluss, Ereignisse, Lebenszyklus und Anpassungsmuster."
---

# Überblick über Angular Gantt

Angular Gantt ist der offizielle Angular-Wrapper für DHTMLX Gantt. Er stellt das Gantt-Diagramm als Angular-Komponente (`<dhx-gantt>`) mit typisierten Eingaben/Ausgaben bereit und ermöglicht Zugriff auf die zugrunde liegende Gantt-Instanz.

Wenn Sie zuerst eine Installation und Projekteinrichtung benötigen, beginnen Sie mit [Schneller Einstieg mit Angular Gantt](integrations/angular/quick-start.md).

:::tip KI-gestützte Entwicklung
Wenn Sie eine KI-Programmierhilfe verwenden, kann die [DHTMLX Angular Gantt agent skill](integrations/ai-tools/agent-skills.md#available-skills) dabei helfen, korrekte Wrapper-Integrationsmuster einzuhalten und häufige Fehler zu vermeiden, wie z. B. nicht übereinstimmende CSS-Importe, fehlende Containerhöhe, uneinheitliche Zuständigkeiten zwischen dem Angular-Zustand und der Gantt `instance`, und instabile Datumsserialisierung durch `data.save` / `data.batchSave`. Für eine Echtzeit-API-Referenz verbinden Sie den [DHTMLX MCP-Server](integrations/ai-tools/mcp-server.md).
:::

## Kernfähigkeiten

Der Wrapper ist sowohl für einfache als auch fortgeschrittene Angular-Integrationen ausgelegt:

- Deklarativer Aufbau mit Eingaben (`config`, `templates`, `plugins`, `theme`, `locale`).
- Daten-Synchronisierung für `tasks`/`links` und fortgeschrittene Sammlungen (`resources`, `resourceAssignments`, `baselines`).
- Dynamische Ereignisverkettung über eine einzige `events`-Input-Map.
- Lebenszyklus-Signal über `(ready)` mit Zugriff auf die initialisierte Gantt-Instanz.
- Rendering von Angular-Komponenten in Templates über `templateComponent(...)`.
- Fortgeschrittene Funktionen über `customLightbox`, `groupTasks`, `filter`, `calendars`, `markers` und `resourceFilter`.

## Grundlegende Wrapper-Verwendung

~~~ts
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
} from '@dhtmlx/trial-angular-gantt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DhxGanttComponent],
  template: `
    <div style="height: 600px;">
      <dhx-gantt
        [tasks]="tasks"
        [links]="links"
        [config]="config"
        [data]="dataConfig">
      </dhx-gantt>
    </div>
  `,
})
export class AppComponent {
  tasks = [
    { id: 1, text: 'Project', type: 'project', open: true, start_date: new Date(2026, 1, 2).toISOString(), duration: 5, parent: 0 },
    { id: 2, text: 'Planning', start_date: new Date(2026, 1, 2).toISOString(), duration: 2, parent: 1 },
  ];

  links = [{ id: 1, source: 1, target: 2, type: '0' }];

  config = {
    columns: [
      { name: 'text', tree: true, width: '*' },
      { name: 'start_date', align: 'center' },
      { name: 'duration', align: 'center' },
      { name: 'add', width: 44 },
    ],
  };

  dataConfig: AngularGanttDataConfig = {
    save: (entity, action, data, id) => {
      console.log('[data.save]', entity, action, data, id);
    },
  };
}
~~~

## Eigenschaftsbasierte Synchronisationsmodell und Abwägungen

Der Wrapper überwacht Änderungen der Eingaben und synchronisiert sie in die aktuelle Gantt-Instanz.

- `tasks` und `links` werden inkrementell für routinemäßige Hinzufügen/Aktualisieren/Entfernen‑Änderungen synchronisiert.
- Für größere strukturelle Änderungen kann der Wrapper Daten zurücksetzen und neu parsen.
- `resources`, `resourceAssignments` und `baselines` werden über zugehörige Datenspeicher synchronisiert.
- `config`, `templates`, `plugins`, `locale` und `theme` werden zur Laufzeit angewendet.
- Wenn sich die Form von `config.layout` ändert, kann der Wrapper das Gantt-Layout neu initialisieren, um die neue Struktur anzuwenden.

Verwenden Sie [Grundlagen der Datenbindung und Zustandsverwaltung](integrations/angular/state/state-management-basics.md) für umfassende Hinweise zur Datenhoheit.

## `events`-Map vs `(ready)`

Angular Gantt verwendet eine `events`-Map für [Gantt-Ereignis-Handler](api/overview/events-overview.md) und eine separate `(ready)`-Ausgabe für einen einmaligen Zugriff auf den Lebenszyklus.

~~~ts
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttEvents,
  type GanttStatic,
} from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [events]="events" (ready)="onReady($event)"></dhx-gantt>`,
})
export class DemoComponent {
  events: AngularGanttEvents = {
    onTaskCreated: (task) => {
      console.log('task created', task);
      return true;
    },
    onBeforeLightbox: (taskId) => {
      console.log('before lightbox', taskId);
      return true;
    },
  };

  onReady({ instance }: { instance: GanttStatic }): void {
    console.log('ready', instance);
  }
}
~~~


Verwenden Sie `events` für Interaktionsverhalten. Verwenden Sie `(ready)` für Logik, die Zugriff auf eine initialisierte Instanz benötigt.

## ViewChild-Zugriff und imperativen Grenzen

Wenn Eingaben nicht ausreichen, greifen Sie mit `@ViewChild` auf die Wrapper-Instanz zu und verwenden Sie anschließend `.instance`.

~~~ts
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>`,
})
export class DemoComponent implements AfterViewInit {
  @ViewChild(DhxGanttComponent) ganttCmp?: DhxGanttComponent;

  tasks = [];
  links = [];

  ngAfterViewInit(): void {
    this.ganttCmp?.instance?.showDate(new Date());
  }
}
~~~

Grenzregel: Wenn Sie Tasks oder Links direkt über `instance` mutieren, halten Sie Ihre Angular-State-Eingaben synchron. Andernfalls kann das nächste Input-Update chart-seitige Änderungen überschreiben.

## Erweiterte Erweiterungspunkte

### Benutzerdefinierte Lightbox-Komponente

Verwenden Sie `customLightbox`, um den integrierten Task-Editor durch eine Angular-Komponente zu ersetzen.

~~~ts
import { CustomLightboxConfig } from '@dhtmlx/trial-angular-gantt';

customLightbox: CustomLightboxConfig = {
  component: TaskEditorComponent,
  onSave: ({ id, task }) => console.log('saved', id, task),
};
~~~

Ihre benutzerdefinierte Komponente sollte die Inputs `data`, `onSave`, `onCancel` und `onDelete` akzeptieren.

### Angular-Komponenten in Templates

Verwenden Sie `templateComponent(...)` in `templates`, Spalten-`template`, Spalten-`label` oder anderen templatefähigen Slots.

~~~ts
import { templateComponent } from '@dhtmlx/trial-angular-gantt';

templates = {
  task_text: (_start: Date, _end: Date, task: any) =>
    templateComponent(TaskTextTemplateComponent, {
      task,
      onIconClick: () => this.toggleTask(task),
    }),
};
~~~

Dies ermöglicht Angular die Darstellung von Komponenten innerhalb von DOM-Bereichen, die von Gantt verwaltet werden.

### Filtern

Verwenden Sie das `filter`-Eingabefeld, um festzulegen, welche Tasks angezeigt werden sollen:

~~~ts
import type { TaskFilter } from '@dhtmlx/trial-angular-gantt';

taskFilter: TaskFilter = null;

showCompleted(): void {
  this.taskFilter = (task) => !!task.completed;
}

resetFilter(): void {
  this.taskFilter = null;
}
~~~


~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [filter]="taskFilter">
</dhx-gantt>
~~~

Um Ressourcen im [Resource Panel](guides/resource-management.md) zu filtern, verwenden Sie das `resourceFilter`-Eingabefeld:

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [resourceFilter]="resourceFilter"
  [config]="config">
</dhx-gantt>
~~~

### Gruppierung, Kalender und Marker

Verwenden Sie `groupTasks`, `calendars` und `markers` für erweiterte Timeline-Szenarien ohne imperativen Setup-Code.

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [groupTasks]="groupConfig"
  [calendars]="calendars"
  [markers]="markers"
  [config]="config">
</dhx-gantt>
~~~

### Hinweis zur Inline-Bearbeitung

Der Wrapper bietet kein eigenständiges Angular-spezifisches `inlineEditors`-Input. Verwenden Sie die Kern-Gantt-Inline-Bearbeitungskonfiguration in `config.columns[].editor` (und andere Kern-APIs für Inline-Bearbeitung), wenn Sie Tabellenbearbeitung benötigen.

## Öffentliche Beispiel-Szenarienkarte

Die öffentlichen Angular-Beispiele decken diese Wrapper-Szenarien ab:

- `basic-initialization`: Basis-Eingaben und `data.save`.
- `configs-and-templates`: Laufzeit-Updates von `config`/`templates`, Marker, Plugins.
- `template-components`: `templateComponent(...)`, `filter`, `ready`, dynamische UI in Gantt-Grid-/Task-Templates.
- `custom-form`: `customLightbox`-Integration.
- `resource-panel`: Ressourcen, Zuordnungen, Ressourcenlayouts, `resourceFilter`, `(ready)`-Instanzzugriff.
- `calendars`: Kalender, `templates`, Locale, Arbeitszeit-Highlighting.
- `auto-scheduling`: Plugin-Aktivierung und gebündelte Datenänderungen.
- `state-management`: RxJS-store-gesteuerte Updates mit `data.batchSave` und Undo/Redo.
- `inline-editors`: Kern-Gantt-Inline-Bearbeitung konfiguriert über `config`.

## Verwandte Artikel

- [Installation](integrations/angular/installation.md)
- [Schneller Einstieg](integrations/angular/quick-start.md)
- [Konfigurationsreferenz](integrations/angular/configuration-props.md)
- [Grundlagen der Datenbindung und Zustandsverwaltung](integrations/angular/state/state-management-basics.md)
- [RxJS-Zustandsverwaltungs-Tutorial](integrations/angular/state/rxjs.md)
- [DHTMLX Gantt Leitfäden](guides.md)