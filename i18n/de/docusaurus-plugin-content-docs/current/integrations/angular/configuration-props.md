---
title: Verwendung der DHTMLX Gantt-Eigenschaften in Angular Gantt
sidebar_label: Konfiguration
description: "Vollständige Referenz der Angular Gantt-Eingaben, Ausgaben, Callback-Verträge und Angular-spezifische Template-/Anpassungshilfen."
---

# Verwendung der DHTMLX Gantt-Eigenschaften in Angular Gantt

Diese Seite dokumentiert die öffentliche Wrapper-Oberfläche von `@dhtmlx/trial-angular-gantt` und `@dhx/angular-gantt`.

## Verfügbare Eingaben

<table>
  <thead>
    <tr>
      <th>Eingabe</th>
      <th>Typ</th>
      <th>Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tasks</td>
      <td>any[]</td>
      <td>Aufgabensammlung, die im Diagramm/Gitter gerendert wird. Erforderlich.</td>
    </tr>
    <tr>
      <td>links</td>
      <td>any[]</td>
      <td>Abhängigkeits-Sammlung. Erforderlich.</td>
    </tr>
    <tr>
      <td>resources</td>
      <td>any[] | null</td>
      <td>Ressourcensatz für Ressourcen-Layouts und Ressourcen-API-Methoden.</td>
    </tr>
    <tr>
      <td>resourceAssignments</td>
      <td>any[] | null</td>
      <td>Datensatz der Ressourcen-Zuweisungen.</td>
    </tr>
    <tr>
      <td>baselines</td>
      <td>any[] | null</td>
      <td>Baseline-Datensatz.</td>
    </tr>
    <tr>
      <td>config</td>
      <td>Partial&lt;GanttConfigOptions&gt; | null</td>
      <td>In <code>gantt.config</code> zusammengeführt.</td>
    </tr>
    <tr>
      <td>templates</td>
      <td>AngularGanttTemplates | null</td>
      <td>In <code>gantt.templates</code> zusammengeführt; Template-Funktionen können Angular-Template-Beschreibungen zurückgeben.</td>
    </tr>
    <tr>
      <td>plugins</td>
      <td>Record&lt;string, any&gt; | null</td>
      <td>Plugin-Aktivierungskarte (zum Beispiel: [critical_path](/guides/critical-path/), [auto_scheduling](/guides/auto-scheduling/)).</td>
    </tr>
    <tr>
      <td>calendars</td>
      <td>Calendar[] | null</td>
      <td>Arbeitskalender-Definitionen, die nach <code>id</code> synchronisiert werden.</td>
    </tr>
    <tr>
      <td>markers</td>
      <td>Marker[] | null</td>
      <td>Vertikale Timeline-Markierungen, synchronisiert durch <code>id</code>.</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>string | null</td>
      <td>Locale-Name, der an <code>gantt.i18n.setLocale(...)</code> übergeben wird.</td>
    </tr>
    <tr>
      <td>theme</td>
      <td>string | null</td>
      <td>Skin-Name, der an <code>gantt.setSkin(...)</code> übergeben wird, sofern verfügbar.</td>
    </tr>
    <tr>
      <td>data</td>
      <td>AngularGanttDataConfig | null</td>
      <td>Transport-Callbacks: <code>load</code>, <code>save</code>, <code>batchSave</code>.</td>
    </tr>
    <tr>
      <td>events</td>
      <td>AngularGanttEvents | null</td>
      <td>Ereignis-Name-zu-Handler-Zuordnung für Gantt-Ereignisse.</td>
    </tr>
    <tr>
      <td>customLightbox</td>
      <td>CustomLightboxConfig | null</td>
      <td>Ersetzt die integrierte Lightbox durch eine Angular-Komponente.</td>
    </tr>
    <tr>
      <td>groupTasks</td>
      <td>any</td>
      <td>Gruppierungs-Konfiguration, die an <code>gantt.groupBy(...)</code> übergeben wird; verwenden Sie <code>false</code> zum Deaktivieren.</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>TaskFilter</td>
      <td>Eine Funktion zur Filterung der Gantt-Aufgaben.</td>
    </tr>
    <tr>
      <td>resourceFilter</td>
      <td>ResourceFilter</td>
      <td>Prädikat zum Filtern von Zeilen im konfigurierten Ressourcen-Datenspeicher.</td>
    </tr>
    <tr>
      <td>htmlTemplatePolicy</td>
      <td>HtmlTemplatePolicy</td>
      <td>Steuert, wie Zeichenfolgen, die von Template-Funktionen zurückgegeben werden, gerendert werden. <code>"basic-sanitize"</code> (Standard) sanitized das zurückgegebene HTML über eine Allowlist: sicheres Formatieren, Klassen, eingeschränkte Inline-Stile, <code>data-*</code>-Attribute und <code>img</code> bleiben erhalten, während Skripte, Event-Handlern und gefährliche URLs entfernt werden. <code>"escape"</code> rendert die Zeichenfolge als Text; <code>"unsafe-html"</code> rendert die rohe Zeichenfolge (Verhalten vor Version 10); ein benutzerdefiniertes Sanitizer-Objekt (<code>mode: "sanitize"</code> mit einer <code>sanitize(html)</code>-Funktion) ermöglicht es Ihnen, eine Bibliothek wie DOMPurify zu verwenden. Für die pro-Template-Steuerung wickeln Sie einzelne Template-Funktionen mit dem exportierten <code>allowRawHTML()</code>-Helfer ein. See [Migration notes](/migration#91---92).</td>
    </tr>
  </tbody>
</table>

## Outputs und Instanzzugriff

### `(ready)`

Der Wrapper gibt `ready` einmal nach der Initialisierung und der anfänglichen Synchronisierung aus.

Payload-Form des Events:

~~~ts
{ instance: GanttStatic }
~~~

~~~html
<dhx-gantt [tasks]="tasks" [links]="links" (ready)="onReady($event)"></dhx-gantt>
~~~

### `instance` via `@ViewChild`

Verwenden Sie `@ViewChild(DhxGanttComponent)`, wenn Sie direkten imperativen Zugriff benötigen.

~~~ts
@ViewChild(DhxGanttComponent) ganttCmp?: DhxGanttComponent;

showToday(): void {
  this.ganttCmp?.instance?.showDate(new Date());
}
~~~

## Datensammlungen und Synchronisierung

Verwenden Sie diese Eingaben, wenn der Angular-Zustand oder ein RxJS-Store Ihre Quelle der Wahrheit ist:

- `tasks`, `links`
- optionale fortgeschrittene Stores: `resources`, `resourceAssignments`, `baselines`

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [baselines]="baselines">
</dhx-gantt>
~~~

Zusammenfassendes Synchronisierungsverhalten:

- Aufgaben/Links-Updates basieren auf Differenzen (diff-basiert) für Routineänderungen,
- der Wrapper kann bei Bedarf auf Reset/Neu-Parsen umschalten,
- Ressourcen-/Zuweisungs-/Baseline-Speicher werden über Gantt-Datenspeicher aktualisiert.

Verwenden Sie für Modellabwägungen [Datenbindung und Grundlagen der Zustandsverwaltung](integrations/angular/state/state-management-basics.md).

## Konfiguration, Vorlagen, Plugins, Theme, Locale

Verwenden Sie diese Eingaben für deklarative Diagrammkonfiguration statt imperativer `instance`-Aufrufe.

~~~ts
config = {
  scales: [
    { unit: 'year', step: 1, format: '%Y' },
    { unit: 'month', step: 1, format: '%F, %Y' },
    { unit: 'day', step: 1, format: '%d %M' },
  ],
  columns: [
    { name: 'text', tree: true, width: '*' },
    { name: 'start_date', align: 'center' },
    { name: 'duration', align: 'center' },
    { name: 'add', width: 44 },
  ],
};

templates = {
  task_text: (_start: Date, _end: Date, task: any) => `#${task.id}: ${task.text}`,
};
~~~

~~~html
<dhx-gantt
  [config]="config"
  [templates]="templates"
  [plugins]="{ auto_scheduling: true }"
  [locale]="locale"
  [theme]="theme">
</dhx-gantt>
~~~

### Laufzeit-Aktualisierungs-Verhalten

- `locale`, `theme`, `config`, `templates` und `plugins` können nach der Initialisierung aktualisiert werden.
- Wenn sich die Form von `config.layout` ändert (nicht nur verschachtelte Werte), kann der Wrapper das Gantt-Layout neu initialisieren.
- Behalten Sie die Objektidentität stabil, wenn sich nichts geändert hat, um unnötige Neu-Anwendungen zu vermeiden.

## `events`-Eingabe

Verwenden Sie eine einzige Ereignis-Karte statt vieler Angular-Outputs.

~~~ts
import type { AngularGanttEvents } from '@dhtmlx/trial-angular-gantt';

events: AngularGanttEvents = {
  onTaskCreated: (task) => {
    console.log('created', task);
    return true;
  },
  onAfterTaskUpdate: (id, task) => {
    console.log('updated', id, task);
  },
  onBeforeLightbox: (taskId) => {
    console.log('before lightbox', taskId);
    return true;
  },
};
~~~

Der Wrapper akzeptiert sowohl eine typisierte Teilmenge gemeinsamer Events als auch beliebige Event-Namen über dieselbe Map.

## Daten-Transport: `load`, `save`, `batchSave`

`data` Eingabeform:

~~~ts
interface AngularGanttDataConfig {
  load?: string | ((gantt: any) => any | Promise<any>);
  save?: string | ((entity: string, action: string, data: any, id: string | number) => any);
  batchSave?: (changes: BatchChanges) => void;
}
~~~

### `load`

- URL-Zeichenfolge -> Wrapper ruft `gantt.load(url)` auf.
- Funktion -> Wrapper ruft sie mit der Gantt-Instanz auf und parsest das zurückgegebene Sync/Async-Dataset.

~~~ts
dataConfig = {
  load: async (gantt) => {
    const response = await fetch('/api/gantt');
    const dataset = await response.json();
    return dataset;
  },
};
~~~

`load` ist für das initiale Laden vorgesehen. Der Wrapper wendet sie einmal pro Komponentenlebenszyklus an.

### `save`

Callback pro Änderung oder Transport (verbunden über `gantt.createDataProcessor(save)`).

~~~ts
dataConfig = {
  save: (entity, action, data, id) => {
    console.log(entity, action, data, id);
  },
};
~~~

### `batchSave`

Gegliederter Callback für Änderungen mit hohem Volumen (Auto-Zeitplanung, Massenditoren, verkettete Updates).

~~~ts
import type { BatchChanges } from '@dhtmlx/trial-angular-gantt';

dataConfig = {
  batchSave: (changes: BatchChanges) => {
    if (changes.tasks?.length) {
      console.log('task changes', changes.tasks);
    }
  },
};
~~~

Verzögerungs-Verhalten (Queue-Verhalten) zusammengefasst:

- kurzfristiges Bündeln (kleines Entprellfenster),
- Zusammenführen von `create` + `update` zu einem `create` mit dem neuesten Payload,
- Entfernen von `create` + `delete`-Paaren,
- Entfernen des internen `!nativeeditor_status` aus Payloads.

## `customLightbox` Eingabe

Verwenden Sie `customLightbox`, um die integrierte Gantt-Lightbox durch eine Angular-Komponente zu ersetzen.

~~~ts
import type { CustomLightboxConfig } from '@dhtmlx/trial-angular-gantt';

customLightbox: CustomLightboxConfig = {
  component: TaskEditorComponent,
  onSave: ({ id, task }) => console.log('saved', id, task),
  onCancel: () => console.log('cancel'),
  onDelete: (id) => console.log('delete', id),
};
~~~

Die Instanz der benutzerdefinierten Komponente erhält diese Eingaben vom Wrapper:

- `data` (`{ id, task }`)
- `onSave(updatedTask)`
- `onCancel()`
- `onDelete()`

## Vorlagen Und Angular-Komponenten

Template-Funktionen können reguläre Strings/HTML (natürliches Gantt-Verhalten) oder Angular-Komponentenbeschreibungen zurückgeben, erstellt mit `templateComponent(...)`.

~~~ts
import { templateComponent } from '@dhtmlx/trial-angular-gantt';

templates = {
  task_text: (_start: Date, _end: Date, task: any) =>
    templateComponent(TaskBadgeTemplateComponent, { task }),
};

config = {
  columns: [
    {
      name: 'status',
      label: templateComponent(HeaderFilterComponent, {
        currentFilter: this.currentFilter,
      }),
      template: (task: any) => templateComponent(StatusCellComponent, { task }),
    },
  ],
};
~~~

Verwenden Sie dies für Grid-Header/Zellen, Task-Text, Skalen und andere templatefähige Oberflächen, die von Gantt unterstützt werden.

## Gruppierung, Ressourcen, Filter, Kalender, Marker

Diese Eingaben werden typischerweise in fortgeschrittenen Zeitachsen- und Ressourcenansichten verwendet.

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [groupTasks]="groupConfig"
  [filter]="taskFilter"
  [resourceFilter]="resourceFilter"
  [calendars]="calendars"
  [markers]="markers"
  [config]="config">
</dhx-gantt>
~~~

Hinweise:

- `filter` akzeptiert eine Funktion `(task: any) => boolean` oder `null`. Wenn gesetzt, werden nur Aufgaben angezeigt, für die die Funktion `true` ergibt. Auf `null` setzen, um alle Aufgaben anzuzeigen.
- `resourceFilter` arbeitet gegen den Ressourcen-Datenspeicher, der durch `config.resource_store` konfiguriert ist.
- `groupTasks` kann mit `false` oder einem Gruppierungskonfigurationsobjekt umgeschaltet werden.
- `calendars` und `markers` werden durch `id` synchronisiert, halten Sie also die IDs stabil.

### Task-Filterung

Verwenden Sie die `filter`-Eingabe, um zu steuern, welche Aufgaben sichtbar sind. Der Wrapper hängt unter der Haube einen `onBeforeTaskDisplay`-Listener an und löst eine Neudarstellung aus, wenn sich die Referenz des Filters ändert.

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

Behalten Sie eine stabile Referenz, wenn sich die Filterlogik nicht geändert hat – der Wrapper vergleicht nach Identität und rendert neu nur dann, wenn sich die Referenz ändert.

## Exportierte Typen und Helpers

Nützliche öffentliche Exporte aus dem Wrapper-Paket:

- `DhxGanttComponent`
- `DhxGanttModule`
- `templateComponent(...)`
- `isAngularTemplateRenderable(...)`
- `AngularGanttDataConfig`
- `AngularGanttEvents`
- `BatchChanges`, `DataCallbackChange`
- `SerializedTask`, `SerializedLink`
- `TaskFilter`
- `ResourceFilter`
- `GanttStatic`
- `CustomLightboxConfig`
- `Calendar`, `Marker`

### `SerializedTask` vs `Task`

Der Wrapper exportiert zwei aufgabenbezogene Typen:

- **`SerializedTask`** - Verwendung für Daten, die Ihnen gehören: Zustand speichern, API-Antworten, anfängliche Literale, `batchSave`-Payloads. Daten können `Date`-Objekte oder Strings sein, die dem `date_format` entsprechen.
- **`Task`** (re-exported from `@dhx/gantt`) - für Daten, die Gantt besitzt: innerhalb von Event-Handlern, nachdem Gantt geparst hat. Daten sind `Date`-Objekte. Verfügt über `$`-vorangestellte System-Properties.

`SerializedLink` ist das link-seitige Gegenstück von `SerializedTask`.

## Weiter Mit

- [Angular Gantt Überblick](integrations/angular/overview.md)
- [Datenbindung und Grundlagen der Zustandsverwaltung](integrations/angular/state/state-management-basics.md)
- [RxJS Zustandsverwaltungs-Tutorial](integrations/angular/state/rxjs.md)
- [dhtmlxGantt mit Angular (Low-Level-Integration)](integrations/angular/js-gantt-angular.md)