---
title: "React Gantt Hooks"
sidebar_label: "Hooks"
description: "Built-in React hooks for DHTMLX Gantt — event subscriptions, resource assignments, undo/redo, zoom, selection, datastores, and work time calculations."
---

# React Gantt Hooks

The `@dhx/react-gantt` wrapper provides a set of React hooks that bridge your components to Gantt's internal APIs without requiring direct access to the Gantt instance. These hooks handle lifecycle management automatically — subscriptions are created on mount and cleaned up on unmount.

All hooks accept a `ganttRef` parameter — a React ref to the `ReactGantt` component:

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

Subscribe to a Gantt event with automatic lifecycle management. Attaches the handler on mount and detaches on unmount.

~~~ts
import { useGanttEvent } from '@dhx/react-gantt';
~~~

**Signature:**
~~~ts
useGanttEvent(ganttRef, eventName, handler, options?)
~~~

**Parameters:**

- `ganttRef` — ref to the ReactGantt component
- `eventName` — the Gantt event name (e.g., `'onAfterTaskUpdate'`, `'onStoreUpdated'`)
- `handler` — callback function
- `options.target` — *(optional)* accessor function that resolves the event source from the Gantt instance. When omitted, events attach to the Gantt instance itself.

Works with any object that implements `attachEvent`/`detachEvent` — the Gantt instance, extensions, datastores, and UI modules:

~~~tsx
import { useGanttEvent } from '@dhx/react-gantt';

function MyComponent({ ganttRef }) {
  // Gantt instance events (default target)
  useGanttEvent(ganttRef, 'onAfterTaskUpdate', (id, task) => {
    console.log('Task updated:', id);
  });

  // Extension events — pass a target accessor
  useGanttEvent(ganttRef, 'onAfterZoom', (level) => {
    console.log('Zoomed to level:', level);
  }, { target: (gantt) => gantt.ext.zoom });

  // Datastore events
  useGanttEvent(ganttRef, 'onStoreUpdated', () => {
    console.log('Resource store changed');
  }, { target: (gantt) => gantt.getDatastore('resource') });

  return null;
}
~~~

If the event or target is not available (e.g., a plugin is not enabled), the hook silently does nothing.

## useResourceAssignments

Access Gantt's resource assignment and resource management methods.

~~~ts
import { useResourceAssignments } from '@dhx/react-gantt';
~~~

**Returns:**

- `getResourceAssignments(resourceId, taskId?)` — bridge to [](api/method/getresourceassignments.md). Returns assignments for a resource, optionally filtered by task.
- `getTaskResources(taskId)` — bridge to [](api/method/gettaskresources.md). Returns unique resources assigned to a task.
- `getTaskAssignments(taskId)` — bridge to [](api/method/gettaskassignments.md). Returns all assignments for a task.
- `getAllResources()` — returns all items from the resource datastore.
- `setTaskAssignments(taskId, assignments)` — replaces all assignments for a task. Each assignment should have `resource_id` and optionally `value`.

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

Read-only access to any Gantt datastore — tasks, links, resources, assignments, baselines, or custom stores.

~~~ts
import { useGanttDatastore } from '@dhx/react-gantt';
~~~

**Signature:**
~~~ts
const store = useGanttDatastore<T>(ganttRef, storeName)
~~~

**Returns:**

- `getItem(id)` — returns a single item by ID
- `getItems()` — returns all items
- `hasChild(id)` — checks if an item has children (tree datastores)
- `getChildren(id)` — returns child IDs (tree datastores)
- `eachItem(callback)` — iterates through all items in the datastore
- `find(filter)` — returns items matching a predicate function
- `count()` — returns total number of items
- `exists(id)` — checks if an item exists

~~~tsx
import { useGanttDatastore, ResourceItem } from '@dhx/react-gantt';

function ResourceList({ ganttRef }) {
  const store = useGanttDatastore<ResourceItem>(ganttRef, 'resource');

  // Find all leaf (non-group) resources
  const individuals = store.find(r => !store.hasChild(r.id));

  // Iterate all resources
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

Track undo/redo stack state and provide actions. Automatically subscribes to task and link change events to keep state current.

~~~ts
import { useUndoRedo } from '@dhx/react-gantt';
~~~

**Returns:**

- `canUndo` — `boolean`, true when the undo stack is non-empty
- `canRedo` — `boolean`, true when the redo stack is non-empty
- `undo()` — performs an undo operation
- `redo()` — performs a redo operation

Returns disabled state (`canUndo: false, canRedo: false`) if the undo plugin is not enabled.

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
The undo plugin must be enabled in the `plugins` prop for this hook to work:
~~~tsx
<ReactGantt plugins={{ undo: true }} ... />
~~~
:::

## useZoom

Manage timeline zoom levels and track the current zoom state. Initializes the zoom extension automatically.

~~~ts
import { useZoom } from '@dhx/react-gantt';
~~~

**Signature:**
~~~ts
const zoom = useZoom(ganttRef, levels?)
~~~

**Parameters:**

- `ganttRef` — ref to the ReactGantt component
- `levels` — *(optional)* array of zoom level configurations. Defaults to 5 built-in levels: Day, Week, Month, Quarter, Year.

**Returns:**

- `currentLevel` — name of the active zoom level
- `levels` — the zoom level configurations
- `zoomIn()` — zoom to a more detailed level
- `zoomOut()` — zoom to a less detailed level
- `setLevel(name)` — jump to a specific zoom level by name

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

You can provide custom zoom levels:

~~~tsx
const customLevels = [
  {
    name: 'sprint',
    label: 'Sprint (2 weeks)',
    scale_height: 60,
    min_column_width: 70,
    scales: [
      { unit: 'month', step: 1, format: '%F %Y' },
      { unit: 'week', step: 2, format: 'Sprint %W' },
    ],
  },
  // ...more levels
];

const zoom = useZoom(ganttRef, customLevels);
~~~

## useSelection

Track which task is currently selected in the Gantt chart.

~~~ts
import { useSelection } from '@dhx/react-gantt';
~~~

**Returns:**

- `selectedId` — the ID of the currently selected task, or `null` if nothing is selected

~~~tsx
import { useSelection } from '@dhx/react-gantt';

function TaskDetails({ ganttRef }) {
  const { selectedId } = useSelection(ganttRef);

  if (!selectedId) return <p>Select a task to see details.</p>;

  return <p>Selected task: {selectedId}</p>;
}
~~~

## useWorkTime

Bridge to Gantt's built-in work time calculation functions. Use this for highlighting non-working time and for date arithmetic that respects work calendars.

~~~ts
import { useWorkTime } from '@dhx/react-gantt';
~~~

**Returns:**

- `isWorkTime({ date, unit?, task? })` — bridge to [](api/method/isworktime.md)
- `calculateEndDate({ start, duration, unit?, task? })` — bridge to [](api/method/calculateenddate.md)
- `calculateDuration({ start, end, task? })` — bridge to [](api/method/calculateduration.md)
- `getClosestWorkTime({ date, unit, task?, dir? })` — bridge to [](api/method/getclosestworktime.md)

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

Build domain-specific hooks by composing the built-in hooks. For example, a resource histogram hook:

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

## Direct access to Gantt instance

While hooks handle most advanced needs, you can still access the entire Gantt instance directly via a ref:

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
If you alter tasks or links via the direct Gantt instance while also feeding them as React props, keep them in sync. Otherwise, the next React re-render may overwrite your manual changes.
:::
