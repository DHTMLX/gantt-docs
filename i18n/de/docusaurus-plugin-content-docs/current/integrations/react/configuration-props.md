---
title: "Verwendung von DHTMLX Gantt Properties in ReactGantt"
sidebar_label: "Konfiguration"
---

# Verwendung von DHTMLX Gantt Properties in ReactGantt

Diese Seite bietet einen Überblick über die von React Gantt unterstützten Props und erklärt, wie sie den Funktionen von DHTMLX Gantt entsprechen.

## Verfügbare Props

<table>
  <thead>
  <tr>
  <th>Prop</th>
  <th>Typ</th>
  <th>Beschreibung</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>tasks</td>
  <td>Task[]</td>
  <td>Ein Array von [Task-Objekten](guides/supported-data-formats.md#json).</td>
  </tr>
  <tr>
  <td>links</td>
  <td>Link[]</td>
  <td>Ein Array von [Link-Objekten](guides/supported-data-formats.md#json).</td>
  </tr>
  <tr>
  <td>templates</td>
  <td>GanttTemplates</td>
  <td>Überschreibt [gantt.templates](api/overview/templates-overview.md), wie z.B. [task_text](api/template/task_text.md), [task_class](api/template/task_class.md), [scale_cell_class](api/template/scale_cell_class.md).</td>
  </tr>
  <tr>
  <td>config</td>
  <td>GanttConfig</td>
  <td>Wird in [gantt.config](api/overview/properties-overview.md) gemerged, einschließlich Optionen wie [scales](api/config/scales.md), [columns](api/config/columns.md), [autosize](api/config/autosize.md).</td>
  </tr>
  <tr>
  <td>resources</td>
  <td>Resource[]</td>
  <td>Ein Array von [Ressourcen-Objekten](guides/resource-management.md).</td>
  </tr>
  <tr>
  <td>baselines</td>
  <td>Baseline[]</td>
  <td>Ein Array von [Baseline-Objekten](guides/inbuilt-baselines.md).</td>
  </tr>
  <tr>
  <td>markers</td>
  <td>Marker[]</td>
  <td>Ein Array von Marker-Objekten für [Timeline-Marker](guides/markers.md).</td>
  </tr>
  <tr>
  <td>plugins</td>
  <td>GanttPlugins</td>
  <td>[Gantt-Erweiterungen](guides/extensions-list.md), die aktiviert werden sollen (Beispiele: [critical_path](guides/critical-path.md), [auto_scheduling](guides/auto-scheduling.md)).</td>
  </tr>
  <tr>
  <td>data</td>
  <td>( load?: string, save?: string|RouterFunction, batchSave?: BatchChanges)</td>
  <td>Unterstützt das Laden von Daten über den integrierten Gantt-Transport und bietet Callbacks zur Verarbeitung von Änderungen an Gantt-Daten.</td>
  </tr>
  <tr>
  <td>locale</td>
  <td>string</td>
  <td>Setzt [gantt.i18n.setLocale(locale)](guides/localization.md). Standard ist "en".</td>
  </tr>
  <tr>
  <td>theme</td>
  <td>string</td>
  <td>Wendet [gantt.setSkin(theme)](guides/skins.md) an. Standard ist "terrace".</td>
  </tr>
  <tr>
  <td>customLightbox</td>
  <td>ReactElement | null</td>
  <td>Eine React-Komponente, die die Standard-Lightbox ersetzt (siehe [Custom Lightbox](guides/custom-edit-form.md)).</td>
  </tr>
  <tr>
  <td>inlineEditors</td>
  <td>( [editorType: string]: React.ComponentType )</td>
  <td>Ermöglicht die Zuordnung von React-basierten Inline-Editoren zur Inline-Editor-Schnittstelle von DHTMLX.</td>
  </tr>
  <tr>
  <td>groupTasks</td>
  <td>GroupConfig | boolean | null</td>
  <td>Spezifiziert Gruppierungskonfiguration oder deaktiviert Gruppierung, wenn auf false oder null gesetzt (siehe [Grouping Tasks](api/method/groupby.md)).</td>
  </tr>
  <tr>
  <td>filter</td>
  <td>((task: Task) =&gt; boolean) | null</td>
  <td>Eine Funktion, um die angezeigten Gantt-Aufgaben zu filtern.</td>
  </tr>
  <tr>
  <td>resourceFilter</td>
  <td>((resource: Resource) =&gt; boolean) | null</td>
  <td>Filtert Ressourcen, die im [Resource Panel](guides/resource-management.md) angezeigt werden.</td>
  </tr>
  <tr>
  <td>modals</td>
  <td>GanttModals</td>
  <td>Erlaubt benutzerdefinierte Komponenten als Ersatz für <code>onBeforeTaskDelete</code> und <code>onBeforeLinkDelete</code>-Modals.</td>
  </tr>
  <tr>
  <td>(Event Props)</td>
  <td>Function</td>
  <td>Der Wrapper unterstützt Event-Handler-Props, die DHTMLX Gantt-Events entsprechen, wie onTaskClick, onAfterTaskAdd usw. Props mit passenden Namen werden automatisch angebunden.</td>
  </tr>
  </tbody>
</table>

## Beispielnutzung

~~~js
<ReactGantt
  tasks="{tasks}"
  links="{links}"
  theme="material"
  locale="en"
  config="{" {
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
    // beliebige weitere gantt.config-Einstellungen
  } }
  onTaskClick="{(id," e) => {
    console.log('Task clicked:', id);
    return true; 
  }}
  templates="{" {
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
  } }
/>
~~~

## Verwendung von Event Props

Jedes DHTMLX Gantt-Event kann als Prop übergeben werden. Zum Beispiel:

~~~js
<ReactGantt

  onTaskClick="{(id," e) => {
    console.log('Task clicked:', id);
    return true; 
  }}

/>
~~~
Wenn Sie eine Prop wie `onBeforeTaskAdd` bereitstellen, ruft der Wrapper intern [gantt.attachEvent("onBeforeTaskAdd", handler)](api/method/attachevent.md) auf. Eine vollständige Liste der Events finden Sie unter [DHTMLX Gantt API](api/overview/events-overview.md).


## Kombinieren von Props und der DHTMLX API

Die Bibliothek `@dhx/react-gantt` ist darauf ausgelegt, möglichst deklarativ zu arbeiten und die meisten Anforderungen über Standard-Props wie tasks, links, resources, templates und mehr abzudecken. Es gibt jedoch Situationen, in denen ein tieferer Zugriff auf die Gantt-Engine notwendig ist, beispielsweise:

- [Arbeitszeitberechnungen](guides/working-time.md)
- [Auto Scheduling](guides/auto-scheduling.md) oder erweiterte Funktionen wie [Ressourcenberechnungen](guides/resource-management.md)
- Nutzung bestimmter Methoden aus der [Gantt API](api/api-overview.md)

Für diese Fälle gibt es zwei Ansätze, um direkt mit der zugrundeliegenden DHTMLX Gantt-Funktionalität zu interagieren:

- **React-Hooks** des Wrappers, die mit den Gantt-Datastores und der Scheduling-Logik verbunden sind

- **Direkter Zugriff** auf die Gantt-Instanz über ein `ref`, falls die Hooks nicht alle Anforderungen abdecken

### Verwendung integrierter Hooks 

Die Bibliothek `@dhx/react-gantt` bietet mehrere optionale Hooks, die React-Komponenten mit den internen Gantt-APIs verbinden. Diese Hooks dienen als Brücke zu den Methoden und Datastores von Gantt. Sie können sie direkt in Ihren Komponenten verwenden oder zu eigenen Hooks für spezielle Features wie Ressourcen-Histogramme kombinieren.

#### useGanttDatastore\<T\>(ganttRef, storeName)

Der Hook `useGanttDatastore` bietet Lesezugriff auf einen bestimmten Gantt-Datastore. Er wird häufig verwendet, um auf Ressourcen-Stores, Baselines oder andere eingebaute oder benutzerdefinierte Stores zuzugreifen.

Er beinhaltet folgende Funktionen:

- `getItem(id)` - holt ein bestimmtes Element aus dem Datastore

- `getItems()` - gibt alle Elemente des Datastores zurück

- `hasChild(id: string | number)` - prüft, ob ein Element Kinder hat

- `getChildren(id: string | number)` - gibt die Kindelemente zurück

~~~js
import { useMemo } from 'react';
import { useGanttDatastore } from '@dhx/react-gantt';

function MyResourceList({ ganttRef }) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');

  const resourceIds = resourceStore.getItems().map(item => item.id);

  // Zu Demonstrationszwecken: Ausgabe der Daten
  useMemo(() => {
    console.log('Resource IDs:', resourceIds);
  }, [resourceIds]);

  return null; 
}
~~~

Dieser Hook ist nützlich, wenn Sie direkten Zugriff auf Low-Level-Daten eines bestimmten Datastores benötigen, z.B. um zu bestimmen, ob eine Ressource eine Gruppe oder ein Individuum ist.

#### useResourceAssignments(ganttRef)

Der Hook `useResourceAssignments` stellt Methoden rund um Ressourcen bereit, darunter das Abrufen von Zuweisungen für eine Ressource oder das Auflisten von Ressourcen, die einer Aufgabe zugewiesen sind.

Er bietet folgende Funktionen:

- `getResourceAssignments(resourceId, taskId?)` - entspricht [getResourceAssignments](api/method/getresourceassignments.md)

- `getTaskResources(taskId)` - entspricht [getTaskResources](api/method/gettaskresources.md)

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

Dieser Hook ist praktisch, um eigene Logik rund um Ressourcennutzung zu implementieren, z.B. zur Berechnung zugeteilter Stunden oder Gruppierung von Aufgaben nach Besitzer.

#### useWorkTime(ganttRef)

Dieser Hook bietet Zugriff auf eingebaute DHTMLX Gantt-Arbeitszeitfunktionen wie [isWorkTime](api/method/isworktime.md), [calculateEndDate](api/method/calculateenddate.md) und [calculateDuration](api/method/calculateduration.md).

Er ist nützlich, um Arbeits- und Nichtarbeitszeiten basierend auf den Gantt-Arbeitskalendereinstellungen hervorzuheben und Datumsberechnungen im Einklang mit Arbeitskalendern durchzuführen.

Bereitgestellte Funktionen sind:

- `isWorkTime({ date:Date, unit?: string, task?:Task })` - entspricht [isWorkTime](api/method/isworktime.md)

- `calculateEndDate({start:Date, duration:number, unit?: string, task?: Task})` - entspricht [calculateEndDate](api/method/calculateenddate.md)

- `calculateDuration({start:Date, end:Date, task?: Task})` - entspricht [calculateDuration](api/method/calculateduration.md)

- `getClosestWorkTime({ date:Date, unit?: string, task?: Task, dir?: "past"|"future" })` - entspricht [getClosestWorkTime](api/method/getclosestworktime.md)


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

#### Eigene Hooks aus den Basis-Hooks zusammensetzen

Es ist empfehlenswert, eigene domänen- oder projektspezifische Hooks zu erstellen, indem Sie diese Basis-Hooks kombinieren. Um beispielsweise ein Ressourcen-Histogramm zu erstellen, könnten Sie einen eigenen Hook entwickeln, der Kapazitätswerte cached und Ressourcennutzung summiert:

~~~js
import { useMemo } from 'react';
import { useGanttDatastore, useResourceAssignments } from '@dhx/react-gantt';

export function useResourceHistogram(ganttRef) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');
  const { getResourceAssignments } = useResourceAssignments(ganttRef);

  // Eigene Logik: Kapazitäts-Caching, Gruppenerkennung, etc.
  // ...
  return {
    // z.B. getCapacity, getAllocatedValue
  };
}
~~~

### Direkter Zugriff auf die Gantt-Instanz mit ref

Während die Hooks die meisten erweiterten Anforderungen abdecken, ist der direkte Zugriff auf die gesamte Gantt-Instanz weiterhin über ein `ref` möglich:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // Hier können Sie JEDE Gantt-API-Methode aufrufen
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
    />
  );
}
~~~

:::note 
Beachten Sie, dass Sie tasks oder links, die Sie direkt an der Gantt-Instanz ändern, synchronisieren oder die Daten neu parsen sollten, wenn Sie sie auch als React-Props bereitstellen. Andernfalls kann der nächste Render von React manuelle Änderungen überschreiben.
:::

Wenn Sie Aktionen ausführen müssen, die nicht durch Props abgedeckt sind, können Sie weiterhin direkt Gantt-Methoden aufrufen. Weitere Details finden Sie unter [Accessing the Underlying Gantt API](integrations/react.md#accessingtheunderlyingganttapi).

