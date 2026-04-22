--- 
title: Verwendung der DHTMLX Gantt-Eigenschaften in ReactGantt
sidebar_label: Konfiguration
description: "Vollständige Referenz der Wrapper-Props, die der Gantt-Konfiguration, Templates, Events und Datenstoren zugeordnet sind"
--- 

# Verwendung der DHTMLX Gantt-Eigenschaften in ReactGantt

Diese Seite beschreibt die von React Gantt akzeptierten Props und wie sie auf DHTMLX Gantt-Funktionen abgebildet werden.

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
  <td>Ein Array von Marker-Objekten für [Timeline-Markierungen](/guides/markers).</td>
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
  <td>Ermöglicht das Ersetzen der Modals <code>onBeforeTaskDelete</code> und <code>onBeforeLinkDelete</code> durch benutzerdefinierte Komponenten.</td>
  </tr>
  <tr>
  <td>(Event Props)</td>
  <td>Funktion</td>
  <td>Der Wrapper unterstützt außerdem das Übergeben von Event-Handler-Props, die DHTMLX Gantt-Ereignissen entsprechen. Zum Beispiel onTaskClick, onAfterTaskAdd usw. Wenn der Prop-Name dem Ereignisnamen entspricht, wird es automatisch angehängt.</td>
  </tr>
  </tbody>
</table>

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

Sie können jedes DHTMLX Gantt-Ereignis auch als Prop übergeben. Zum Beispiel:

~~~js
<ReactGantt

  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}/>

~~~ 
Internally, the wrapper calls [gantt.attachEvent("onBeforeTaskAdd", handler)](api/method/attachevent.md) if you pass a prop named `onBeforeTaskAdd`. For a full event list, see [DHTMLX Gantt API](api/overview/events-overview.md).

## Kombination von Props und der DHTMLX API

Die Bibliothek `@dhx/react-gantt` ist darauf ausgelegt, so deklariert wie möglich zu sein – die meisten Anwendungsfälle lassen sich über die Standard-Props abdecken (wie tasks, links, resources, templates usw.). Dennoch kann es Szenarien geben, in denen Sie tieferen Zugriff auf die Gantt-Engine benötigen. Zum Beispiel für:

- Arbeitszeitberechnungen
- Automatische Terminplanung
- Logik oder fortgeschrittene Funktionen wie Ressourcenberechnungen

In diesen Fällen können Sie zwei zusätzliche Ansätze verwenden, um die zugrunde liegende DHTMLX Gantt-Funktionalität anzuzapfen:

- **React-Hooks** speziell von dem Wrapper bereitgestellte Brückenhooks, um die Datenspeicher und Planungslogik von Gantt zu verbinden

- **Direkter Zugriff** auf die Gantt-Instanz über eine `\ref`, falls die integrierten Hooks nicht alle Ihre Bedürfnisse abdecken

### Verwendung integrierter Hooks

Die Bibliothek `@dhx/react-gantt` stellt eine Reihe optionaler Hooks bereit, die React-Komponenten mit den internen Gantt-APIs verbinden. Diese Hooks bieten eine „Brücke“ zu den zugrunde liegenden Methoden und Daten speichern von Gantt. Sie können diese Hooks direkt in Ihren Komponenten verwenden oder zu eigenen, benutzerdefinierten Hooks kombinieren, um spezialisierte Features wie Ressourcen-Histogramme zu realisieren.

#### useGanttDatastore&lt;T&gt;(ganttRef, storeName)

Der `useGanttDatastore`-Hook gewährt Lesezugriff auf einen bestimmten Gantt-Datenspeicher. 
Häufig wird auf den Ressourcen-Datenspeicher, Baseline oder jeden anderen eingebauten oder benutzerdefinierten Speichertypen zugegriffen.

Er bietet die folgenden Funktionen:

- `getItem(id)` -  gibt ein bestimmtes Element aus dem Datenspeicher zurück

- `getItems()` -  gibt alle Elemente im angegebenen Datenspeicher zurück

- `hasChild(id: string | number)` - prüft, ob ein Element Kinder hat

- `getChildren(id: string | number)` - ruft Kind-Elemente ab

~~~js
import { useMemo } from 'react';
import { useGanttDatastore } from '@dhx/react-gantt';

function MyResourceList({ ganttRef }) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');

  const resourceIds = resourceStore.getItems().map(item => item.id);

  // zur Demonstration einfach Daten protokollieren
  useMemo(() => {
    console.log('Resource IDs:', resourceIds);
  }, [resourceIds]);

  return null; 
}
~~~

Du kannst diesen Hook verwenden, wann immer du direkte Low-Level-Daten aus einem bestimmten Datenspeicher benötigst. Zum Beispiel, um zu prüfen, ob eine Ressource eine Gruppe ist oder eine Einzelressource.

#### useResourceAssignments(ganttRef)

Der `useResourceAssignments`-Hook stellt Gantts ressourcenbezogene Methoden bereit, z. B. das Abrufen von Zuordnungen für eine Ressource oder das Auflisten, welche Ressourcen einem bestimmten Task zugewiesen sind.

Es bietet die folgenden Funktionen:

- `getResourceAssignments(resourceId, taskId?)` - Brücke zu [](api/method/getresourceassignments.md)
- `getTaskResources(taskId)` - Brücke zu [](api/method/gettaskresources.md)

~~~js
import React from 'react';
import { useResourceAssignments } from '@dhx/react-gantt';

export function ResourceUsage({ ganttRef, taskId }) {
  const { getTaskResources } = useResourceAssignments(ganttRef);

  const resources = getTaskResources(taskId);
  return (
    <div>
      Task {taskId} assigned to: 
      {resources.map(r => r.text).join(', ')}
    </div>
  );
}
~~~

Sie benötigen diesen Hook möglicherweise für benutzerdefinierte Logik rund um die Ressourcennutzung, z. B. Berechnung von zugewiesenen Stunden oder Gruppierung von Aufgaben nach Eigentümer.

#### useWorkTime(ganttRef)

Stellt eine direkte Brücke zu eingebauten DHTMLX Gantt-Arbeitszeit-Funktionen bereit, wie [](api/method/isworktime.md), [](api/method/calculateenddate.md), [](api/method/calculateduration.md).

Sie benötigen diesen Hook, um die Arbeits-/Nicht-Arbeitszeit gemäß den Gantt-Arbeitskalender-Einstellungen hervorzuheben, sowie für Datumsoperationen im Einklang mit Arbeitskalendern.

Er bietet die folgenden Funktionen:

- `isWorkTime({ date:Date, unit?: string, task?:Task })` - Brücke zu [](api/method/isworktime.md)
- `calculateEndDate({start:Date, duration:number, unit?: string, task?: Task})` - Brücke zu [](api/method/calculateenddate.md)
- `calculateDuration({start:Date, end:Date, task?: Task})` - Brücke zu [](api/method/calculateduration.md)
- `getClosestWorkTime({ date:Date, unit?: string, task?: Task, dir?: "past"|"future" })` - Brücke zu [](api/method/getclosestworktime.md)


~~~js
import { useEffect, useRef, useState } from 'react';
import ReactGantt, {GanttTemplates, useWorkTime} from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function GanttTemplatesDemo() {
  const ganttRef = useRef<ReactGanttRef>(null);

  const { isWorkTime }= useWorkTime(ganttRef);
  ...
  const templates: GanttTemplates = {
    timeline_cell_class: (task: Task, date: Date) => {
      return isWorkTime({date, task}) ? "" : "weekend";
    }
  };
  ...
~~~

#### Komposition von Hooks in eigene, benutzerdefinierte Hooks

Eine gute Praxis besteht darin, eigene domänen- oder projektbezogene Hooks mithilfe dieser grundlegenden Bridging-Hooks zu erstellen. Zum Beispiel, wenn du ein Ressourcen-Histogramm erstellen möchtest, könntest du einen eigenen Hook erstellen, der Kapazitätswerte cacht, Ressourcennutzung summiert usw.:

~~~js
import { useMemo } from 'react';
import { useGanttDatastore, useResourceAssignments } from '@dhx/react-gantt';

export function useResourceHistogram(ganttRef) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');
  const { getResourceAssignments } = useResourceAssignments(ganttRef);

  // Benutzerdefinierte Logik: Kapazität-Caching, Gruppenerkennung, etc.
  // ...
  return {
    // z. B. getCapacity, getAllocatedValue
  };
}
~~~

### Direkter Zugriff auf die Gantt-Instanz per ref

Obwohl diese Hooks die meisten fortgeschrittenen Bedürfnisse abdecken, möchtest du möglicherweise den direkten Zugriff auf die gesamte Gantt-Instanz behalten. Dafür bleibt der Ref-Ansatz verfügbar:

~~~jsx
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // hier kannst du JEDE Gantt-API-Methode aufrufen
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
    />
  );
}
~~~

:::note
info Beachten Sie, dass wenn Sie Aufgaben/Links in der direkten Gantt-Instanz ändern, während Sie sie gleichzeitig als React-Props übergeben, Sie sie synchron halten oder die Daten erneut parsen sollten. Andernfalls könnte das nächste React-Re-Rendern Ihre manuellen Änderungen überschreiben.
:::

Wenn du etwas tun möchtest, das durch eine Prop nicht abgedeckt wird, kannst du dennoch Gantt-Methoden direkt aufrufen. Siehe [Accessing the Underlying Gantt API](integrations/react/overview.md#accessingtheunderlyingganttapi) für weitere Details.