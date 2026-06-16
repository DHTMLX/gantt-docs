--- 
title: "React Gantt Hooks"
sidebar_label: "Hooks"
description: "Integrierte React-Hooks für DHTMLX Gantt – Ereignis-Abonnements, Ressourcenzuweisungen, Undo/Redo, Zoom, Auswahl, Datenspeicher und Berechnungen der Arbeitszeit."
---

# React Gantt Hooks

Der Wrapper `@dhx/react-gantt` bietet eine Reihe von React-Hooks, die Ihre Komponenten mit den internen APIs von Gantt verbinden, ohne direkten Zugriff auf die Gantt-Instanz zu benötigen. Diese Hooks verwalten das Lebenszyklus-Management automatisch – Abonnements werden beim Mount erstellt und beim Unmount wieder entfernt.

Alle Hooks akzeptieren einen `ganttRef`-Parameter – eine React-Referenz auf die `ReactGantt`-Komponente:

~~~tsx
import { useRef } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

function MyGanttApp() {
  const ganttRef = useRef<ReactGanttRef>(null);

  // pass ganttRef to any hook
  return <ReactGantt ref={ganttRef} tasks={tasks} links={links} />;
}
~~~

## useGanttEvent

Abonniert ein Gantt-Ereignis mit automatisierter Lebenszyklus-Verwaltung. Der Handler wird beim Mount angehängt und beim Unmount wieder abgehängt.

~~~ts
import { useGanttEvent } from '@dhx/react-gantt';
~~~

**Signatur:**
~~~ts
useGanttEvent(ganttRef, eventName, handler, options?)
~~~

**Parameters:**

- `ganttRef` – Verweis auf die ReactGantt-Komponente
- `eventName` – Der Gantt-Ereignisname (z. B. `'onAfterTaskUpdate'`, `'onStoreUpdated'`)
- `handler` – Callback-Funktion
- `options.target` – *(optional)* Zugriffsfunktion, die die Ereignisquelle aus der Gantt-Instanz ermittelt. Wird sie weggelassen, hängen die Ereignisse an der Gantt-Instanz selbst.
  
Funktioniert mit jedem Objekt, das `attachEvent`/`detachEvent` implementiert – die Gantt-Instanz, Erweiterungen, Datenspeicher und UI-Module:

~~~tsx
import { useGanttEvent } from '@dhx/react-gantt';

function MyComponent({ ganttRef }) {
  // Gantt-Instanz-Ereignisse (Standardziel)
  useGanttEvent(ganttRef, 'onAfterTaskUpdate', (id, task) => {
    console.log('Task updated:', id);
  });

  // Erweiterungs-Ereignisse – ein Ziel-Zugriff verwenden
  useGanttEvent(ganttRef, 'onAfterZoom', (level) => {
    console.log('Zoomed to level:', level);
  }, { target: (gantt) => gantt.ext.zoom });

  // Datastore-Ereignisse
  useGanttEvent(ganttRef, 'onStoreUpdated', () => {
    console.log('Resource store changed');
  }, { target: (gantt) => gantt.getDatastore('resource') });

  return null;
}
~~~

Wenn das Ereignis oder das Ziel nicht verfügbar ist (z. B. ein Plugin ist nicht aktiviert), tut der Hook nichts.

## useResourceAssignments

Zugriff auf Gantts Ressourcen-Zuweisungs- und Ressourcenverwaltungs-Methoden.

~~~ts
import { useResourceAssignments } from '@dhx/react-gantt';
~~~

**Returns:** 

- `getResourceAssignments(resourceId, taskId?)` – Brücke zu [](api/method/getresourceassignments.md). Gibt Zuweisungen für eine Ressource zurück, optional nach Task gefiltert.
- `getTaskResources(taskId)` – Brücke zu [](api/method/gettaskresources.md). Gibt eindeutige Ressourcen zurück, die einer Aufgabe zugewiesen sind.
- `getTaskAssignments(taskId)` – Brücke zu [](api/method/gettaskassignments.md). Gibt alle Zuweisungen für eine Aufgabe zurück.
- `getAllResources()` – Gibt alle Elemente aus dem Ressourcenspeicher zurück.
- `setTaskAssignments(taskId, assignments)` – Ersetzt alle Zuweisungen für eine Aufgabe. Jede Zuweisung sollte `resource_id` und optional `value` enthalten.

~~~tsx
import { useResourceAssignments } from '@dhx/react-gantt';

function ResourcePanel({ ganttRef, taskId }) {
  const { getTaskAssignments, getAllResources, setTaskAssignments } = 
    useResourceAssignments(ganttRef);

  const assignments = getTaskAssignments(taskId);
  const resources = getAllResources();

  function reassign() {
    setTaskAssignments(taskId, [
      { resource_id: 1, value: 8 },
      { resource_id: 3, value: 4 }
    ]);
  }

  return (
    <div>
      <p>Assigned: {assignments.map(a => a.resource_id).join(', ')}</p>
      <p>Available: {resources.map(r => r.text).join(', ')}</p>
      <button onClick={reassign}>Reassign</button>
    </div>
  );
}
~~~  

## useGanttDatastore

Nur-Lesezugriff auf jeden Gantt-Datenspeicher – Aufgaben, Verknüpfungen, Ressourcen, Zuweisungen, Baselines oder benutzerdefinierte Stores.

~~~ts
import { useGanttDatastore } from '@dhx/react-gantt';
~~~

**Signatur:**
~~~ts
const store = useGanttDatastore<T>(ganttRef, storeName)
~~~

**Returns:** 

- `getItem(id)` – gibt ein einzelnes Item anhand der ID zurück
- `getItems()` – gibt alle Items zurück
- `hasChild(id)` – prüft, ob ein Item Kinder hat (Tree-Datenspeicher)
- `getChildren(id)` – gibt Kind-IDs zurück (Tree-Datenspeicher)
- `eachItem(callback)` – iteriert durch alle Items im Datenspeicher
- `find(filter)` – gibt Items zurück, die einer Prädikatsfunktion entsprechen
- `count()` – gibt die Gesamtanzahl der Items zurück
- `exists(id)` – prüft, ob ein Item existiert

~~~tsx
import { useGanttDatastore, ResourceItem } from '@dhx/react-gantt';

function ResourceList({ ganttRef }) {
  const store = useGanttDatastore<ResourceItem>(ganttRef, 'resource');

  // Finde alle Blatt-Ressourcen (kein Gruppe)
  const individuals = store.find(r => !store.hasChild(r.id));

  // Durchlaufe alle Ressourcen
  store.eachItem(resource => {
    console.log(resource.text, store.hasChild(resource.id) ? '(group)' : '');
  });

  return (
    <ul>
      {individuals.map(r => <li key={r.id}>{r.text}</li>)}
    </ul>
  );
}
~~~  

## useUndoRedo

Verfolgt den Zustand des Undo/Redo-Stapels und stellt Aktionen bereit. Abonniert automatisch Task- und Link-Änderungsereignisse, um den Zustand aktuell zu halten.

~~~ts
import { useUndoRedo } from '@dhx/react-gantt';
~~~

**Returns:** 

- `canUndo` – `boolean`, wahr, wenn der Undo-Stack nicht leer ist
- `canRedo` – `boolean`, wahr, wenn der Redo-Stack nicht leer ist
- `undo()` – führt eine Undo-Operation aus
- `redo()` – führt eine Redo-Operation aus

Gibt den deaktivierten Zustand zurück (`canUndo: false, canRedo: false`), falls das Undo-Plugin nicht aktiviert ist.

~~~tsx
import { useUndoRedo } from '@dhx/react-gantt';

function UndoRedoButtons({ ganttRef }) {
  const { canUndo, canRedo, undo, redo } = useUndoRedo(ganttRef);

  return (
    <div>
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
    </div>
  );
}
~~~

:::note
Das Undo-Plugin muss im `plugins`-Prop aktiviert sein, damit dieser Hook funktioniert:
~~~tsx
<ReactGantt plugins={{ undo: true }} ... />
~~~
:::

## useZoom

Verwaltet Timeline-Zoomstufen und verfolgt den aktuellen Zoom-Status. Der Zoom-Extension wird automatisch initialisiert.

~~~ts
import { useZoom } from '@dhx/react-gantt';
~~~

**Signatur:**
~~~ts
const zoom = useZoom(ganttRef, levels?)
~~~

**Parameters:**

- `ganttRef` – Verweis auf die ReactGantt-Komponente
- `levels` – *(optional)* Array von Zoom-Stufen-Konfigurationen. Standardmäßig 5 integrierte Stufen: Tag, Woche, Monat, Quartal, Jahr.

**Returns:** 

- `currentLevel` – Name der aktiven Zoom-Stufe
- `levels` – die Zoom-Stufen-Konfigurationen
- `zoomIn()` – zoomt auf eine detailliertere Stufe
- `zoomOut()` – zoomt auf eine weniger detaillierte Stufe
- `setLevel(name)` – springt zu einer bestimmten Zoom-Stufe nach Namen

~~~tsx
import { useZoom } from '@dhx/react-gantt';

function ZoomControls({ ganttRef }) {
  const { currentLevel, levels, zoomIn, zoomOut, setLevel } = useZoom(ganttRef);

  return (
    <div>
      <button onClick={zoomOut}>-</button>
      <select value={currentLevel} onChange={e => setLevel(e.target.value)}>
        {levels.map(l => (
          <option key={l.name} value={l.name}>{l.label || l.name}</option>
        ))}
      </select>
      <button onClick={zoomIn}>+</button>
    </div>
  );
}
~~~

Sie können benutzerdefinierte Zoom-Stufen bereitstellen:

~~~tsx
const customLevels = [
  {
    name: 'sprint',
    label: 'Sprint (2 Wochen)',
    scale_height: 60,
    min_column_width: 70,
    scales: [
      { unit: 'month', step: 1, format: '%F %Y' },
      { unit: 'week', step: 2, format: 'Sprint %W' },
    ],
  },
  // ...weitere Stufen
];

const zoom = useZoom(ganttRef, customLevels);
~~~

## useSelection

Verfolgt, welcher Task im Gantt-Diagramm aktuell ausgewählt ist.

~~~ts
import { useSelection } from '@dhx/react-gantt';
~~~

**Returns:** 

- `selectedId` – Die ID des aktuell ausgewählten Tasks, oder `null`, wenn nichts ausgewählt ist

~~~tsx
import { useSelection } from '@dhx/react-gantt';

function TaskDetails({ ganttRef }) {
  const { selectedId } = useSelection(ganttRef);

  if (!selectedId) return <p>Wählen Sie einen Task, um Details zu sehen.</p>;

  return <p>Ausgewählter Task: {selectedId}</p>;
}
~~~

## useWorkTime

Brücke zu den integrierten Arbeitszeitberechnungsfunktionen von Gantt. Verwenden Sie dies, um Nicht-Arbeitszeiten hervorzuheben und Datumsberechnungen zu tätigen, die Arbeitskalender berücksichtigen.

~~~ts
import { useWorkTime } from '@dhx/react-gantt';
~~~

**Returns:**

- `isWorkTime({ date, unit?, task? })` – Brücke zu [](api/method/isworktime.md)
- `calculateEndDate({ start, duration, unit?, task? })` – Brücke zu [](api/method/calculateenddate.md)
- `calculateDuration({ start, end, task? })` – Brücke zu [](api/method/calculateduration.md)
- `getClosestWorkTime({ date, unit, task?, dir? })` – Brücke zu [](api/method/getclosestworktime.md)

~~~tsx
import ReactGantt, { GanttTemplates, ReactGanttRef, useWorkTime } from '@dhx/react-gantt';

function GanttWithWeekends() {
  const ganttRef = useRef<ReactGanttRef>(null);
  const { isWorkTime } = useWorkTime(ganttRef);

  const templates: GanttTemplates = {
    timeline_cell_class: (task, date) => {
      return isWorkTime({ date, task }) ? '' : 'weekend';
    }
  };

  return <ReactGantt ref={ganttRef} templates={templates} tasks={tasks} />;
}
~~~

## Composing hooks

Erstellen Sie domänenspezifische Hooks, indem Sie die integrierten Hooks kombinieren. Zum Beispiel ein Hook für Ressourcendiagramme:

~~~ts
import { useMemo, useCallback } from 'react';
import { useGanttDatastore, useResourceAssignments, useWorkTime } from '@dhx/react-gantt';

export function useResourceHistogram(ganttRef) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');
  const { getResourceAssignments } = useResourceAssignments(ganttRef);
  const { isWorkTime } = useWorkTime(ganttRef);

  const isGroupResource = useCallback((resource) => {
    return resourceStore.hasChild(resource.id);
  }, [resourceStore]);

  const getAllocatedValue = useCallback((tasks, resource) => {
    return tasks.reduce((sum, task) => {
      const assignments = getResourceAssignments(resource.id, task.id);
      return sum + assignments.reduce((acc, a) => acc + Number(a.value), 0);
    }, 0);
  }, [getResourceAssignments]);

  const getCapacity = useCallback((date, resource) => {
    if (isGroupResource(resource)) return -1;
    return isWorkTime({ date }) ? 8 : 0;
  }, [isGroupResource, isWorkTime]);

  return { getAllocatedValue, getCapacity, isGroupResource };
}
~~~

## Direkter Zugriff auf die Gantt-Instanz

Während Hooks die meisten fortgeschrittenen Anforderungen abdecken, können Sie die gesamte Gantt-Instanz weiterhin direkt über eine Referenz zugreifen:

~~~tsx
import { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

function DirectRefExample({ tasks, links }) {
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
Wenn Sie Aufgaben oder Verknüpfungen über die direkte Gantt-Instanz ändern, während sie auch als React-Props bereitgestellt werden, halten Sie sie synchron. Andernfalls könnte das nächste React-Rendering Ihre manuellen Änderungen überschreiben.
:::