---
title: Verwendung der DHTMLX Gantt-Eigenschaften in ReactGantt
sidebar_label: Konfiguration
description: "Vollständige Referenz der Wrapper-Props, die der Gantt-Konfiguration, Templates, Events und Datenstoren zugeordnet sind"
--- 

# Verwendung der DHTMLX Gantt-Eigenschaften in ReactGantt

Diese Seite beschreibt die von React Gantt akzeptierten Props und wie sie DHTMLX Gantt-Funktionen zugeordnet werden.

## Verfügbare Props

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
  <td>Ein Array von [Task-Objekten](guides/supported-data-formats.md).</td>
  </tr>
  <tr>
  <td>links</td>
  <td>Link[]</td>
  <td>Ein Array von [Link-Objekten](guides/supported-data-formats.md).</td>
  </tr>
  <tr>
  <td>templates</td>
  <td>GanttTemplates</td>
  <td>Überschreibt [gantt.templates](api/other/templates.md), z. B.: [task_text](api/template/task_text.md), [task_class](api/template/task_class.md), [scale_cell_class](api/template/scale_cell_class.md).</td>
  </tr>
  <tr>
  <td>config</td>
  <td>GanttConfig</td>
  <td>In [gantt.config](api/overview/properties-overview.md) zusammengeführt, z. B.: [scales_config](api/config/scales.md), [columns_config](api/config/columns.md), [autosize_config](api/config/autosize.md).</td>
  </tr>
  <tr>
  <td>calendars</td>
  <td>Calendar[]</td>
  <td>Ein Array von Arbeitskalendern. Beispiel: [Arbeitskalender](integrations/react/overview.md#working-calendars).</td>
  </tr>
  <tr>
  <td>resources</td>
  <td>Resource[]</td>
  <td>Ein Array von [Resource-Objekten](/guides/resource-management#manual-creation-of-data-store).</td>
  </tr>
  <tr>
  <td>baselines</td>
  <td>Baseline[]</td>
  <td>Ein Array von [Baseline-Objekten](/guides/inbuilt-baselines#loading-baselines-with-tasks).</td>
  </tr>
  <tr>
  <td>markers</td>
  <td>Marker[]</td>
  <td>Ein Array von Marker-Objekten für [Timeline-Marker](/guides/markers).</td>
  </tr>
  <tr>
  <td>plugins</td>
  <td>GanttPlugins</td>
  <td>[Gantt-Erweiterungen](/guides/extensions-list/), die aktiviert werden müssen (z. B.: [critical_path](/guides/critical-path/), [auto_scheduling](/guides/auto-scheduling/)).</td>
  </tr>
  <tr>
  <td>data</td>
  <td>( load?: string, save?: string|RouterFunction, batchSave?: BatchChanges)</td>
  <td>Erlaubt das Laden von Daten über den integrierten Gantt-Transport und bietet Callback-Funktionen für Änderungen an den Gantt-Daten.</td>
  </tr>
  <tr>
  <td>locale</td>
  <td>string</td>
  <td>Legt [gantt.i18n.setLocale(locale)](/guides/localization/) fest. Standardmäßig ist es "en".</td>
  </tr>
  <tr>
  <td>theme</td>
  <td>string</td>
  <td>Anwendet [gantt.setSkin(theme)](/guides/skins/). Standardmäßig ist es "terrace".</td>
  </tr>
  <tr>
  <td>customLightbox</td>
  <td>ReactElement | null</td>
  <td>Eine React-Komponente, die das integrierte Lightbox ersetzt (siehe [Custom Lightbox](/guides/custom-edit-form/).)</td>
  </tr>
  <tr>
  <td>inlineEditors</td>
  <td>( [editorType: string]: React.ComponentType )</td>
  <td>Ermöglicht die Zuordnung Ihrer React-basierten Inline-Editoren zur DHTMLX-Inline-Editor-Schnittstelle.</td>
  </tr>
  <tr>
  <td>groupTasks</td>
  <td>GroupConfig | boolean | null</td>
  <td>Gruppierungskonfigurationsobjekt oder false/null zum Deaktivieren der Gruppierung (siehe [Grouping Tasks ](api/method/groupby.md).).</td>
  </tr>
  <tr>
  <td>filter</td>
  <td>((task: Task) =&gt; boolean) | null</td>
  <td>Eine Funktion, die verwendet wird, um Gantt-Aufgaben zu filtern.</td>
  </tr>
  <tr>
  <td>resourceFilter</td>
  <td>((resource: Resource) =&gt; boolean) | null</td>
  <td>Eine Funktion, die verwendet wird, um Ressourcen für das [Resource Panel](/guides/resource-management/). zu filtern.</td>
  </tr>
  <tr>
  <td>modals</td>
  <td>GanttModals</td>
  <td>Ermöglicht das Ersetzen von <code>onBeforeTaskDelete</code> und <code>onBeforeLinkDelete</code> Modalen durch benutzerdefinierte Komponenten.</td>
  </tr>
  <tr>
  <td>htmlTemplatePolicy</td>
  <td>HtmlTemplatePolicy</td>
  <td>Steuert, wie Zeichenfolgen, die von Template-Funktionen zurückgegeben werden, gerendert werden. <code>"basic-sanitize"</code> (Standard) erlaubt, das zurückgegebene HTML zu sanitizen: sichere Formatierung, Klassen, eingeschränkte Inline-Stile, <code>data-*</code>-Attribute und <code>img</code> bleiben erhalten, während Skripte, Ereignis-Handler und gefährliche URLs entfernt werden. <code>"escape"</code> rendert die Zeichenfolge als Text; <code>"unsafe-html"</code> rendert die Rohzeichenfolge (vor V10-Verhalten); ein benutzerdefiniertes Sanitizer-Objekt (<code>mode: "sanitize"</code> mit einer <code>sanitize(html)</code>-Funktion) erlaubt es, eine Bibliothek wie DOMPurify einzubinden. Für die Ein-Zeilen-Pro Vorlage stecken Sie einzelne Template-Funktionen mit dem exportierten <code>allowRawHTML()</code>-Hilfsprogramm ein. See [Migration notes](/migration#91---92).</td>
  </tr>
  <tr>
  <td>(Event Props)</td>
  <td>Funktion</td>
  <td>Der Wrapper unterstützt außerdem das Übergeben von Event-Handler-Props, die DHTMLX Gantt-Ereignissen entsprechen. Zum Beispiel onTaskClick, onAfterTaskAdd usw. Wenn der Prop-Name dem Ereignisnamen entspricht, wird es automatisch angehängt.</td>
  </tr>
  </tbody>
</table>

## Type Exports

Das Paket `@dhx/react-gantt` re-exportsiert mehrere TypeScript-Typen, die Sie verwenden können, um Ihren Anwendungs-Code zu annotieren:

| Export | Beschreibung |
|--------|------------|
| `Task` | Internes Gantt-Aufgaben-Objekt. Datumswerte sind `Date`-Objekte; umfasst `$`-präfixierte System-Eigenschaften. Verwenden Sie es in Ereignis-Handlern und beim Arbeiten mit Daten, die Gantt besitzt. |
| `Link` | Internes Gantt-Verbindungsobjekt. Verwenden Sie es in Ereignis-Handlern und beim Arbeiten mit Daten, die Gantt besitzt. |
| `SerializedTask` | Vom Benutzer sichtbare Aufgaben-Struktur für Store-Zustand, anfängliche Daten und Payloads von Save-Callbacks. Datumsfelder akzeptieren `Date | string`. |
| `SerializedLink` | Vom Benutzer sichtbare Verbindungs-Struktur für Store-Zustand, anfängliche Daten und Payloads von Save-Callbacks. |

**Wann API-Task/Link-Objekte vs SerializedTask/SerializedLink verwenden:**  

- **`SerializedTask` / `SerializedLink`** – für Daten, die Sie besitzen: Store-Zustand, API-Antworten, anfängliche Daten-Literale. Datumsfelder akzeptieren Strings (z. B. ISO-Daten).  
- **`Task` / `Link`** – für Daten, die Gantt besitzt: innerhalb von Ereignis-Handlern, nachdem Gantt die Daten geparst hat. Datumsfelder sind `Date`-Objekte. `Task` enthält `$`-präfixierte interne Eigenschaften.

## Beispielverwendung

~~~jsx
<ReactGantt
  tasks={tasks}
  links={links}
  theme="material"
  locale="en"
  config={{
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%M" }
    ],
    columns: [
      { name: "text", tree: true, width: '*' },
      { name: "start_date", align: "center" },
      { name: "duration", align: "center" },
      { name: "add" }
    ],
    // any other gantt.config you want
  }}
  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}
  templates={{
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
  }}
/>
~~~

## Verwendung von Event-Props

Sie können jedes DHTMLX Gantt-Ereignis als Prop übergeben. Zum Beispiel:

~~~js
<ReactGantt

  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}

/>
~~~
Internally, der Wrapper ruft [gantt.attachEvent("onBeforeTaskAdd", handler)](api/method/attachevent.md) auf, wenn Sie ein Prop mit dem Namen `onBeforeTaskAdd` übergeben. Für eine vollständige Ereignisliste siehe [DHTMLX Gantt API](api/overview/events-overview.md).

## Kombination von Props und der DHTMLX API

Bibliothek `@dhx/react-gantt` ist darauf ausgelegt, so deklarativ wie möglich für den Alltag zu sein – die meisten Anwendungsfälle lassen sich über die Standard-Props lösen (wie tasks, links, resources, templates usw.). Es kann jedoch Situationen geben, in denen Sie tieferen Zugriff auf die Gantt-Engine benötigen. Beispielsweise für:

- [Arbeitszeitberechnungen](guides/working-time.md)
- [Auto-Scheduling]-Logik oder fortgeschrittene Funktionen wie [Ressourcenberechnungen](guides/resource-management.md)
- Aufruf spezieller Methoden der [Gantt API](api/api-overview.md)

In diesen Fällen können Sie zwei zusätzliche Ansätze verwenden, um Zugriff auf die zugrunde liegende DHTMLX Gantt-Funktionalität zu erhalten:

- **[React-Hooks](integrations/react/hooks.md)**, die speziell vom Wrapper bereitgestellt werden, um Gantts Datenspeicher- und Planungslogik zu überbrücken

- **Direkter Zugriff** auf die Gantt-Instanz über eine Ref, falls die integrierten Hooks nicht alle Bedürfnisse abdecken

### Verwendung integrierter Hooks

Die Bibliothek `@dhx/react-gantt` stellt Hooks für Ereignisabonnements, Ressourcenverwaltung, Zugriff auf Datenspeicher, Undo/Redo, Zoom, Selektion und Arbeitszeitsberechnungen bereit.

Siehe die专 dedicierte Seite **[Hooks](integrations/react/hooks.md)** für die vollständige Referenz, einschließlich:

- [useGanttEvent](integrations/react/hooks.md#useganttEvent) – Ereignisabonnements mit Lifecycle-Management
- [useResourceAssignments](integrations/react/hooks.md#useresourceassignments) – Abfragen und Mutationen von Ressourcen-Zuweisungen
- [useGanttDatastore](integrations/react/hooks.md#useganttdatastore) – schreibgeschützter Zugriff auf den Datenspeicher
- [useUndoRedo](integrations/react/hooks.md#useundoredo) – Undo/Redo-Status und -Aktionen
- [useZoom](integrations/react/hooks.md#usezoom) – Zoom-Steuerung und -Status
- [useSelection](integrations/react/hooks.md#useselection) – Verfolgung der Aufgaben-Selektion
- [useWorkTime](integrations/react/hooks.md#useworktime) – Arbeitszeitsberechnungen

### Direkter Zugriff auf Gantt-Instanz mit Ref

Während Hooks die meisten fortgeschrittenen Bedürfnisse abdecken, möchten Sie möglicherweise dennoch direkten Zugriff auf die gesamte Gantt-Instanz haben. Dafür bleibt der Ref-Ansatz verfügbar:

~~~tsx
import { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;
    gantt.showDate(new Date());
  }, []);

  return <ReactGantt ref={ganttRef} tasks={tasks} links={links} />;
}
~~~

:::note
Wenn Sie Aufgaben oder Links über die direkte Gantt-Instanz ändern und sie gleichzeitig als React-Props liefern, halten Sie sie synchron. Andernfalls könnte das nächste React-Re-Render Ihre manuellen Änderungen überschreiben.
:::  

Siehe [Accessing the Underlying Gantt API](integrations/react/overview.md#accessingtheunderlyingganttapi) für weitere Details.