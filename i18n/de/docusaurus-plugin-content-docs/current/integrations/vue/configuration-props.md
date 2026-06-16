---
title: Verwendung von DHTMLX Gantt-Eigenschaften in VueGantt
sidebar_label: Konfiguration
description: "Referenz für VueGantt-Props, Daten-/Lebenszyklus-Verträge und exportierte Vue-Hilfen/Composables."
---

# Verwendung von DHTMLX Gantt-Eigenschaften in VueGantt

Diese Seite dokumentiert die öffentliche Vue-Wrapperschicht für `@dhtmlx/trial-vue-gantt` und `@dhx/vue-gantt`.

Verwenden Sie sie als Referenz nach der [Übersicht](integrations/vue/overview.md) oder dem [Schnellstart](integrations/vue/quick-start.md).

## Verfügbare Eigenschaften (Props)

<table>
  <thead>
    <tr>
      <th>Eigenschaft</th>
      <th>Typ</th>
      <th>Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tasks</td>
      <td>Task[]</td>
      <td>Sammlung von Aufgaben, die im Diagramm/Gitter gerendert werden.</td>
    </tr>
    <tr>
      <td>links</td>
      <td>Link[]</td>
      <td>Abhängigkeits-Sammlung.</td>
    </tr>
    <tr>
      <td>resources</td>
      <td>any[] | null</td>
      <td>Ressourcen-Datensatz für Ressourcen-Layouts und ressourcenbezogene API-Methoden.</td>
    </tr>
    <tr>
      <td>resourceAssignments</td>
      <td>any[] | null</td>
      <td>Datensatz der Ressourcenzuordnung.</td>
    </tr>
    <tr>
      <td>baselines</td>
      <td>any[] | null</td>
      <td>Baseline-Datensatz.</td>
    </tr>
    <tr>
      <td>markers</td>
      <td>Marker[] | null</td>
      <td>Vertikale Timeline-Marker.</td>
    </tr>
    <tr>
      <td>calendars</td>
      <td>(WrapperCalendar | CalendarConfig)[] | null</td>
      <td>Definitionen der Arbeitskalender (Wrapper-Format oder native Gantt-Konfiguration).</td>
    </tr>
    <tr>
      <td>data</td>
      <td>VueGanttDataConfig | null</td>
      <td>Daten-Übertragungs-Callbacks: <code>load</code>, <code>save</code>, <code>batchSave</code>.</td>
    </tr>
    <tr>
      <td>config</td>
      <td>Partial&lt;GanttConfigOptions&gt;</td>
      <td>In <code>gantt.config</code> zusammengeführt.</td>
    </tr>
    <tr>
      <td>plugins</td>
      <td>GanttPlugins</td>
      <td>[Gantt-Erweiterungen](/guides/extensions-list/) zum Aktivieren (z. B. [auto_scheduling](/guides/auto-scheduling)).</td>
    </tr>
    <tr>
      <td>templates</td>
      <td>Partial&lt;GanttTemplates&gt;</td>
      <td>Merged into <code>gantt.templates</code>.</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>string | Record&lt;string, any&gt;</td>
      <td>Sprach-Name oder Sprachobjekt.</td>
    </tr>
    <tr>
      <td>theme</td>
      <td>string</td>
      <td>Skin-Name.</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>((task: Task) =&gt; boolean) | null</td>
      <td>Aufgaben-Filter-Prädikat.</td>
    </tr>
    <tr>
      <td>resourceFilter</td>
      <td>((resource: any) =&gt; boolean) | null</td>
      <td>Ressourcen-Filter-Prädikat.</td>
    </tr>
    <tr>
      <td>modals</td>
      <td>GanttModals | null</td>
      <td>Überschreibt integrierte Bestätigungsdialoge beim Löschen.</td>
    </tr>
    <tr>
      <td>groupTasks</td>
      <td>any</td>
      <td>Gruppierungs-Konfiguration, die an <code>gantt.groupBy</code> übergeben wird.</td>
    </tr>
    <tr>
      <td>inlineEditors</td>
      <td>Record&lt;string, Component&gt;</td>
      <td>Zuordnungen von Inline-Editor-Typenamen zu Vue-Komponenten.</td>
    </tr>
    <tr>
      <td>customLightbox</td>
      <td>Component | null</td>
      <td>Benutzerdefinierte Vue-Komponente für den Aufgaben-Editor.</td>
    </tr>
    <tr>
      <td>events</td>
      <td>VueGanttEvents</td>
      <td>Zuordnungen von Ereignisnamen zu Handlern.</td>
    </tr>
    <tr>
      <td>htmlTemplatePolicy</td>
      <td>HtmlTemplatePolicy</td>
      <td>Steuert, wie Zeichenfolgen, die von Template-Funktionen zurückgegeben werden, gerendert werden. <code>"basic-sanitize"</code> (Standard) erlaubt das Saubermachen des zurückgegebenen HTMLs: Sicheres Formatieren, Klassen, eingeschränkte Inline-Stile, <code>data-*</code> Attribute und <code>img</code> bleiben erhalten, während Skripte, Ereignishandler und gefährliche URLs entfernt werden. <code>"escape"</code> rendert die Zeichenfolge als Text; <code>"unsafe-html"</code> rendert die rohe Zeichenfolge (Vor-V10-Verhalten); ein benutzerdefiniertes Sanitizer-Objekt (<code>mode: "sanitize"</code> mit einer <code>sanitize(html)</code>-Funktion) ermöglicht das Einbinden einer Bibliothek wie DOMPurify. Für die Steuerung pro Vorlage, umhüllen Sie einzelne Template-Funktionen mit dem exportierten Hilfsprogramm <code>allowRawHTML()</code>.See [Migration notes](/migration#91---92).</td>
    </tr>
  </tbody>
</table>

## Daten-Sammlungen und Synchronisierung

Verwenden Sie diese Props, wenn der Vue-Zustand Ihre einzige Quelle der Wahrheit ist:

- `tasks`, `links`
- optionale erweiterte Datensätze: `resources`, `resourceAssignments`, `baselines`

~~~js
<VueGantt
  :tasks="tasks"
  :links="links"
  :resources="resources"
  :resourceAssignments="resourceAssignments"
  :baselines="baselines"
/>
~~~

Synchronisierungs-Verhalten zusammengefasst:

- Aktualisierungen von Aufgaben/Links erfolgen üblicherweise diff-basiert
- Der Wrapper kann bei großen Änderungen auf Reset/Neu-Parsen umschalten
- Erweiterte Datensätze werden durch ihre Datenspeicher erneut geparst

Für Modell-Auswahl und Callback-Strategie siehe [Datenbindung und Zustand-Verwaltung Grundlagen](integrations/vue/state/state-management-basics.md).

## Konfiguration, Vorlagen, Plugins, Theme, Locale

Verwenden Sie diese Props für die tägliche Diagramm-Konfiguration ohne imperative API-Aufrufe.

~~~vue
<script setup lang="ts">
const config = {
  scales: [
    { unit: "year", step: 1, format: "%Y" },
    { unit: "month", step: 1, format: "%F" }
  ],
  columns: [
    { name: "text", tree: true, width: "*" },
    { name: "start_date", align: "center" },
    { name: "duration", align: "center" },
    { name: "add", width: 44 }
  ]
};

const templates = {
  task_text: (_start, _end, task) => `#${task.id}: ${task.text}`
};
</script>

<template>
  <VueGantt
    :config="config"
    :templates="templates"
    :plugins="{ auto_scheduling: true }"
    theme="terrace"
    locale="en"
  />
</template>
~~~

## Ereignisse, Lebenszyklus und Instanzzugriff

### `events`

Verwenden Sie eine einzige `events`-Zuordnung statt wrapper-spezifischer Props für jedes Gantt-Ereignis:

~~~ts
const events = {
  onTaskCreated: task => {
    console.log(task);
    return true;
  },
  onBeforeLightbox: id => {
    console.log(id);
    return true;
  }
};
~~~

Die Zuordnung ist typisiert als `VueGanttEvents`. Der Wrapper deklariert die folgenden bekannten Events mit vollständigen Signaturen; jeder andere Gantt-Event-Name wird ebenfalls akzeptiert (benutzerdefinierte Events sind als string-gezogene Handler typisiert).

| Event | Signatur | Hinweise |
|-------|-----------|-------|
| `onBeforeLightbox` | `(taskId: string \| number) =&gt; boolean \| void` | Gib `false` zurück, um die integrierte Lightbox zu unterdrücken (z. B. um zu einem externen Editor zu routen). |
| `onTaskCreated` | `(task: Task) =&gt; boolean \| void` | Gib `false` zurück, um die Aufgabenerstellung abzubrechen. |
| `onAfterTaskAdd` | `(id: string \| number, task: Task) =&gt; void` | Wird ausgelöst, nachdem eine Aufgabe hinzugefügt wurde. |
| `onAfterTaskUpdate` | `(id: string \| number, task: Task) =&gt; void` | Wird ausgelöst, nachdem eine Aufgabe aktualisiert wurde. |
| `onAfterTaskDelete` | `(id: string \| number, task: Task) =&gt; void` | Wird ausgelöst, nachdem eine Aufgabe gelöscht wurde. |
| `onAfterLinkAdd` | `(id: string \| number, link: Link) =&gt; void` | Wird ausgelöst, nachdem ein Abhängigkeits-Link hinzugefügt wurde. |
| `onAfterLinkUpdate` | `(id: string \| number, link: Link) =&gt; void` | Wird ausgelöst, nachdem ein Abhängigkeits-Link aktualisiert wurde. |
| `onAfterLinkDelete` | `(id: string \| number, link: Link) =&gt; void` | Wird ausgelöst, nachdem ein Abhängigkeits-Link gelöscht wurde. |

Für die vollständige Liste der Gantt-Ereignisse (einschließlich der oben nicht aufgeführten Ereignisse) siehe die [Gantt-Ereignisse-Übersicht](api/overview/events-overview.md). Verwenden Sie `defineGanttEvents(...)`, um die Zuordnung mit Autovervollständigung für diese bekannten Ereignisse zu erstellen.

### `@ready`

`ready(instance)` feuert einmal nach der Initialisierung und der ersten Synchronisierung:

~~~vue
<VueGantt :events="events" @ready="onReady" />
~~~

### `instance` Über Komponenten-Referenz

~~~ts
import { ref } from "vue";
import type { VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);

function showToday() {
  ganttRef.value?.instance?.showDate(new Date());
}
~~~

Verwenden Sie dies für fortgeschrittene Operationen, die über Props nicht praktikabel sind.

## Datenübertragung: `load`, `save`, `batchSave`

Form der `data`-Prop:

~~~ts
interface VueGanttDataConfig {
  load?: string | ((gantt: GanttStatic) => DataSet | Promise<DataSet>);
  save?: string | RouterFunction;
  batchSave?: (changes: BatchChanges) => void;
}
~~~

### `load`

- URL-Zeichenfolge -> `gantt.load(url)`
- Funktion -> gibt einen synchronen oder asynchronen Datensatz zurück

### `save`

Per-Änderung-Callback oder Router-Transport über dataProcessor.

### `batchSave`

Gegrupo-lerter Callback für Hochvolumen-Updates:

- `tasks`
- `links`
- `resources`
- `resourceAssignments`

~~~ts
const data = {
  batchSave: changes => {
    if (changes.tasks?.length) {
      console.log("task changes", changes.tasks);
    }
  }
};
~~~

Verwenden Sie `batchSave`, wenn eine Diagramm-Aktion viele Aktualisierungen auslösen kann (z. B. Auto-Scheduling oder Bulk-Edits).

## Anpassungs-Hooks

### `customLightbox`

Ersetzen Sie die integrierte Aufgaben-Form-UI durch eine Vue-Komponente.

### `inlineEditors`

Zuordnen Sie Gantt-Inline-Editor-Typenamen zu Vue-Komponenten.

### `modals`

Überschreiben Sie Löschbestätigungen und rufen Sie `callback()` auf, um die Löschung zu bestätigen.

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete task ${task.text}?`)) callback();
  }
};
~~~

Für praktische Beispiele siehe [Customization Patterns](integrations/vue/customization-patterns.md).

## Gruppierung, Filtern, Ressourcen, Kalender, Marker

Diese Props werden häufig gemeinsam in fortgeschrittenen Timeline-Ansichten verwendet:

~~~js
<VueGantt
  :groupTasks="groupConfig"
  :filter="taskFilter"
  :resourceFilter="resourceFilter"
  :calendars="calendars"
  :markers="markers"
  :resources="resources"
  :resourceAssignments="resourceAssignments"
/>
~~~

Gängige Nutzung:

- `groupTasks` für gruppierte Ansichten
- `filter` und `resourceFilter` für fokussierte Ausschnitte
- `calendars` und `markers` für Planungsregeln und Timeline-Hervorhebung

## Exportierte Hilfsfunktionen und Composables

Das Paket exportiert sowohl eine Standard-Komponenten-Exportseite `VueGantt` als auch benannte Exporte.

Aus `@dhtmlx/trial-vue-gantt` oder `@dhx/vue-gantt`:

### Typ-Exporte

Importieren Sie jeden Typ aus dem Wrapper-Paket selbst (`@dhx/vue-gantt` oder `@dhtmlx/trial-vue-gantt`). Der Wrapper bündelt die zugrundeliegende Gantt-Engine und exportiert ihre Typen neben den Vue-spezifischen – es gibt kein separates `@dhx/gantt`-Paket, das installiert oder importiert werden müsste.

**Vom Wrapper besessene Typen**

| Export | Beschreibung |
|--------|------------|
| `SerializedTask` | Benutzerorientierte Aufgabenform mit Datumstypen `Date \| string`. Verwendbar für Store-Zustand, anfängliche Daten und Payloads für `save`/`batchSave`. |
| `SerializedLink` | Benutzerorientierte Link-Form. Verwenden Sie es zusammen mit `SerializedTask` im Store-Zustand und bei Datendefinitionen. |
| `VueGanttRef` | Typ des Werts, der über Component-Ref exponiert wird - `{ instance: GanttStatic \| null }`. |
| `VueGanttDataConfig` | Form der `data`-Prop (`load`, `save`, `batchSave`). |
| `BatchChanges` | Argument, das an `data.batchSave` übergeben wird – gruppierte Änderungen an `tasks`/`links`/`resources`/`resourceAssignments`. |
| `DataCallbackChange` | Einzelner Änderungs-Eintrag innerhalb eines `BatchChanges`-Buckets – `{ entity, action, data, id }`. |
| `Marker` | Form der Elemente in der `markers`-Prop. |
| `WrapperCalendar` | Wrapper-freundliche Kalender-Form akzeptiert von der `calendars`-Prop (neben rohem `CalendarConfig`). |
| `GanttModals` | Form der `modals`-Prop – Signaturen der Callback-Funktionen `onBeforeTaskDelete` und `onBeforeLinkDelete`. |
| `CustomLightboxProps` | Props, die Ihre `customLightbox`-Komponente erhält (`data`, `onSave`, `onCancel`, `onDelete`, `ganttInstance`). |
| `InlineEditorComponentProps` | Props, die Ihre Inline-Editor-Komponenten erhalten (`initialValue`, `task`, `save`, `cancel`, `ganttInstance`). |
| `VueGanttEvents` | Typ der `events`-Prop – bekannte Events plus string-gezogene benutzerdefinierte Events. |

**Häufig verwendete Typen aus der Gantt-Engine**

Der Wrapper exportiert jeden Typ aus der zugrundeliegenden Gantt-Engine. Die unten stehenden Typen kommen in Wrapper-Code am häufigsten vor – jede Zeile ordnet einen Kern-Typ dem Ort zu, an dem er in der Vue-API auftaucht.

| Export | Wo erscheint er im Wrapper-Code |
|--------|------------|
| `Task`, `Link` | Laufzeitformen von Aufgaben/Links (einschließlich `$`-präsentierter Eigenschaften). Verwendet in Event-Handlern, Template-Callback-Funktionen und Filter-Funktionen. |
| `GanttStatic` | Typ von `ganttRef.value?.instance` und dem `@ready`-Argument. |
| `GanttConfigOptions` | Form des Objekts, das an die `config`-Prop übergeben wird. |
| `GanttTemplates` | Form des Objekts, das an die `templates`-Prop übergeben wird. |
| `GanttPlugins` | Form des Objekts, das an die `plugins`-Prop übergeben wird. |
| `CalendarConfig` | Rohform der Gantt-Kalenderdefinition – Alternative zu `WrapperCalendar` in der `calendars`-Prop. |

Alle weiteren Typen aus der Gantt-Engine werden ebenfalls vom Wrapper exportiert – wenn Sie einen Namen aus `@dhx/gantt` in der eigenständigen Bibliothek importieren können, können Sie ihn auch hier aus `@dhx/vue-gantt` importieren.

Verwenden Sie `SerializedTask` und `SerializedLink` für Daten, die Sie besitzen (Pinia-Zustand, `ref<>`, API-Antworten, anfängliche Literale). Verwenden Sie `Task` und `Link` für Daten, die von der Gantt-Engine verwaltet werden (innerhalb von Event-Handlern, Template-Callbacks, Filter-Funktionen), wobei Laufzeitaufgabenobjekte interne `$`-präsentierte Eigenschaften beinhalten.

### Hilfsfabriken (Helper Factories)

- `defineGanttConfig(config)` für typisierte Konfigurations-Bearbeitung
- `defineGanttTemplates(templates)` für typisierte Template-Maps
- `defineGanttEvents(events)` für typisierte Event-Map-Erstellung
- `defineInlineEditors(inlineEditors)` für typisierte Inline-Editor-Maps

Dies sind **nur TypeScript-Identitäts-Helfer** – zur Laufzeit geben `defineGanttTemplates(x)` einfach `x` unverändert zurück. Sie können sie vollständig überspringen, ohne jegliche Verhaltensänderung. Ihr Wert liegt in der Typenchweissung bei Objekt-Literalen: Sie erhalten Autovervollständigung bei `templates.task_text`, `config.scales[0].unit`, `events.onAfterTaskAdd` usw., ohne das Variable manuell zu annotieren.

Wenn Sie sie in TypeScript überspringen, annotieren Sie die Variable selbst oder übergeben Sie das Literal inline in der Prop:

~~~ts
// Option 1: explizite Typannotation
const templates: Partial<GanttTemplates> = {
  task_text: (_s, _e, task) => task.text
};

// Option 2: Hilfsfunktion für Autovervollständigung beim Literal
const templates = defineGanttTemplates({
  task_text: (_s, _e, task) => task.text
};

// Option 3: Inline-Literal - Typableitung erfolgt über die Prop-Typisierung
<VueGantt :templates="{ task_text: (_s, _e, task) => task.text }" />
~~~

### Composables

Der Wrapper bietet fünf Composables, die gängige Instanz-Bereiche-Aufrufe in einer ref-bewussten, lebenszyklus-sicheren Form kapseln. Jedes davon erwartet einen `Ref<VueGanttRef | null>`, damit es warten kann, bis die Instanz verfügbar ist.

#### `useGanttActions(ganttRef)`

Gibt wrapper-sichere imperative Aktionen zurück:

| Methode | Signatur | Hinweise |
|--------|-----------|-------|
| `undo()` | `() => void` | Benötigt `plugins: { undo: true }`. |
| `redo()` | `() => void` | Benötigt `plugins: { undo: true }`. |
| `render()` | `() => void` | Erzwingt eine Ne zeichnung – koppeln Sie es mit `instance.eachTask(...)` für Stapel-Mutationen. |
| `exportToPDF()` | `() => void` | Benötigt `plugins: { export_api: true }`. |
| `exportToPNG()` | `() => void` | Benötigt `plugins: { export_api: true }`. |
| `exportToExcel(config?)` | `(config?: object) => void` | Benötigt `plugins: { export_api: true }`. Übergeben Sie Exporter-Optionen über `config`. |
| `exportToMSProject()` | `() => void` | Benötigt `plugins: { export_api: true }`. |

~~~ts
import { ref } from "vue";
import { useGanttActions, type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);
const actions = useGanttActions(ganttRef);

const exportPdf = () => actions.exportToPDF();
const exportExcel = () => actions.exportToExcel({ visual: "base-colors" });
~~~

#### `useWorkTime(ganttRef)`

Gibt eine berechnete Wrapper-Schicht um die Gantt-Arbeitszeit-API zurück. Nützlich in Templates und Berechnungen von Einschränkungen.

| Methode | Signatur |
|--------|-----------|
| `isWorkTime({ date, task?, unit? })` | `(args) => boolean` |
| `calculateEndDate({ start, duration, unit?, task? })` | `(args) => Date` |
| `calculateDuration({ start, end, task? })` | `(args) => number` |
| `getClosestWorkTime({ date, task?, unit, dir? })` | `(args) => Date` |

~~~ts
import { useWorkTime, type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);
const workTime = useWorkTime(ganttRef);

const templates = {
  scale_cell_class: (date: Date) =>
    workTime.value.isWorkTime({ date }) ? "" : "weekend"
};
~~~

#### `useGanttDatastore<T>(ganttRef, storeName)`

Gibt einen berechneten Reader für jeden Gantt-Datenspeicher zurück (z. B. `"task"`, `"link"`, `"resource"`).

| Methode | Signatur |
|--------|-----------|
| `getItem(id)` | `(id: string \| number) => T \| null` |
| `getItems()` | `() => T[]` |
| `hasChild(id)` | `(id: string \| number) => boolean` |
| `getChildren(id)` | `(id: string \| number) => (string \| number)[]` |

~~~ts
import type { Task } from "@dhtmlx/trial-vue-gantt";
import { useGanttDatastore } from "@dhtmlx/trial-vue-gantt";

const taskStore = useGanttDatastore<Task>(ganttRef, "task");

const rootTasks = computed(() => taskStore.value.getChildren(0));
~~~

#### `useResourceAssignments(ganttRef)`

Gibt einen berechneten Reader für Ressourcenzuweisungsdaten zurück.

| Methode | Signatur |
|--------|-----------|
| `getResourceAssignments(resourceId, taskId?)` | `(resourceId: string \| number, taskId?: string \| number) => any[]` |
| `getTaskResources(taskId)` | `(taskId: string \| number) => any[]` |

~~~ts
import { useResourceAssignments } from "@dhtmlx/trial-vue-gantt";

const assignments = useResourceAssignments(ganttRef);

const showAssignments = (resourceId: string | number) => {
  console.log(assignments.value.getResourceAssignments(resourceId));
};
~~~

#### `useGanttEvent(ganttRef, eventName, handler)`

Bindet ein einzelnes Gantt-Ereignis mit einer lifecycle-sicheren Lebensdauer. Der Handler wird automatisch bei der Komponententemplung voneinander getrennt und erneut angefügt, wenn `ganttRef`, `eventName` oder `handler` sich ändern. Gibt `{ detach }` für manuelle Steuerung zurück.

~~~ts
import { useGanttEvent } from "@dhtmlx/trial-vue-gantt";

const { detach } = useGanttEvent(ganttRef, "onTaskDblClick", id => {
  console.log("Doppel-Klick", id);
});

// Optional: frühzeitig trennen
// detach();
~~~

Verwenden Sie dies, wenn Einzel-Listener nicht sauber in die `events`-Map passen (z. B. Listener, die basierend auf lokalem Zustand aktualisieren oder abmelden müssen).

## Was als Nächstes Zu Lesen Ist

- [Vue Gantt Überblick](integrations/vue/overview.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
- [Datenbindung und Grundlagen der Zustandsverwaltung](integrations/vue/state/state-management-basics.md)
- [Vue Gantt mit Pinia verwenden](integrations/vue/state/pinia.md)