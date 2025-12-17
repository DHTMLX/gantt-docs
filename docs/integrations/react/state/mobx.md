---
title: Using React Gantt with MobX
sidebar_label: MobX
description: "Integrating React Gantt with MobX observable state. Covers setting up observable models, reacting to Gantt updates, and keeping the chart in sync through save handler."
---


# React Gantt - MobX Tutorial

This tutorial will guide you through creating a React TypeScript application with Vite, integrating DHTMLX React Gantt component, and managing state with MobX.

## Prerequisites

- Basic knowledge of React, TypeScript, Vite, and MobX
- Recommended: read [](integrations/react/state/state-management-basics.md) to understand the data binding mode and the `data.save` callback this tutorial builds on.

## Quick setup - create the project

Before you start, install [Node.js](https://nodejs.org/en/).

Create a Vite React + TypeScript project:

~~~bash
npm create vite@latest react-gantt-mobx-demo -- --template react-ts  
cd react-gantt-mobx-demo  
~~~

Now let's install the required dependencies.

* For **npm**: 

~~~bash
npm install mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* For **yarn**:

~~~bash
yarn add mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

We're using `mobx-react-lite` instead of the full `mobx-react` package because our application uses functional components. The "lite" version is specifically optimized for functional components and hooks, providing a smaller bundle size while maintaining all the essential MobX-React integration features we need.

Then we need to install the React Gantt package. 

### Installing React Gantt

Install React Gantt as described in [](integrations/react/installation.md).

In this tutorial we use the evaluation package:

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

or

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

If you already use the Professional package, replace `@dhtmlx/trial-react-gantt` with `@dhx/react-gantt` in the commands and imports.


Now you can start the dev server:

~~~bash
npm run dev 
~~~

You should now have your React project running on `http://localhost:5173`.

:::note
To make Gantt occupy the entire space of the body, you need to remove the default styles from the `App.css` file located in the `src` folder and add the following one:

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~
:::

## Setting Up Sample Data and Configuration

Create sample data for our Gantt chart in `src/seed/Seed.ts` which will contain the initial data:

~~~tsx
import type { SerializedTask, Link, GanttConfig } from '@dhtmlx/trial-react-gantt';

export type ZoomLevel = 'day' | 'month' | 'year';

export const defaultZoomLevels: NonNullable<GanttConfig['zoom']> = { 
  current: 'day', 
  levels: [ 
  { name: 'day', scale_height: 27, min_column_width: 80, scales: [{ unit: 'day', step: 1, format: '%d %M' }] }, 
  { name: 'month', scale_height: 50, min_column_width: 120, scales: [{ unit: 'month', format: '%F, %Y' }, { unit: 'week', format: 'Week #%W' }] }, 
  { name: 'year', scale_height: 50, min_column_width: 30, scales: [{ unit: 'year', step: 1, format: '%Y' }] }, 
  ], 
};

export const seedTasks: SerializedTask[] = [ 
  { id: 1, text: 'Office itinerancy', type: 'project', start_date: new Date(2025, 3, 2).toISOString(), duration: 17, progress: 0.4, parent: 0, open: true }, 
  { id: 2, text: 'Office facing', type: 'project', start_date: new Date(2025, 3, 2).toISOString(), duration: 8, progress: 0.6, parent: 1, open: true }, 
  { id: 3, text: 'Furniture installation', type: 'project', start_date: new Date(2025, 3, 11).toISOString(), duration: 8, progress: 0.6, parent: 1, open: true }, 
  { id: 4, text: 'The employee relocation', type: 'project', start_date: new Date(2025, 3, 13).toISOString(), duration: 5, progress: 0.5, parent: 1, priority: 3, open: true }, 
  { id: 5, text: 'Interior office', type: 'task', start_date: new Date(2025, 3, 3).toISOString(), duration: 7, progress: 0.6, parent: 2, priority: 1 }, 
  { id: 6, text: 'Air conditioners check', type: 'task', start_date: new Date(2025, 3, 3).toISOString(), duration: 7, progress: 0.6, parent: 2, priority: 2 }, 
  { id: 7, text: 'Workplaces preparation', type: 'task', start_date: new Date(2025, 3, 12).toISOString(), duration: 8, progress: 0.6, parent: 3 }, 
  { id: 8, text: 'Preparing workplaces', type: 'task', start_date: new Date(2025, 3, 14).toISOString(), duration: 5, progress: 0.5, parent: 4, priority: 1 }, 
  { id: 9, text: 'Workplaces importation', type: 'task', start_date: new Date(2025, 3, 21).toISOString(), duration: 4, progress: 0.5, parent: 4 }, 
  { id: 10, text: 'Workplaces exportation', type: 'task', start_date: new Date(2025, 3, 27).toISOString(), duration: 3, progress: 0.5, parent: 4, priority: 2 }
];

export const seedLinks: Link[] = [ 
  { id: 2, source: 2, target: 3, type: '0' },
  { id: 3, source: 3, target: 4, type: '0' },
  { id: 7, source: 8, target: 9, type: '0' }
]; 
~~~

## Building the Control Toolbar Component

Now, let's add a **Toolbar** component in `src/components/Toolbar.tsx`.

This component gives users quick access to common Gantt controls, like zooming between *day*, *month*, and *year* views, and performing **undo/redo** actions.

~~~tsx
import Divider from '@mui/material/Divider';  
import ButtonGroup from '@mui/material/ButtonGroup';  
import UndoIcon from '@mui/icons-material/Undo';  
import RedoIcon from '@mui/icons-material/Redo';  
import Button from '@mui/material/Button';  
import type { ZoomLevel } from '../seed/Seed';

export interface ToolbarProps {  
  onUndo?: () => void;  
  onRedo?: () => void;  
  onZoom?: (level: ZoomLevel) => void;  
  currentZoom?: ZoomLevel;  
}

export default function Toolbar({ onUndo, onRedo, onZoom, currentZoom = 'month' }: ToolbarProps) {  
  return (  
    <div style={{ display: 'flex', justifyContent: 'start', padding: '10px 10px 20px', gap: '10px' }}>  
      <ButtonGroup>  
        <Button onClick={() => onUndo?.()}>  
          <UndoIcon />  
        </Button>  
        <Button onClick={() => onRedo?.()}>  
          <RedoIcon />  
        </Button>  
      </ButtonGroup>  
      <Divider orientation="vertical"></Divider>  
      <ButtonGroup>  
        <Button onClick={() => onZoom?.('day')} variant={currentZoom === 'day' ? 'contained' : 'outlined'}>  
          Day  
        </Button>  
        <Button onClick={() => onZoom?.('month')} variant={currentZoom === 'month' ? 'contained' : 'outlined'}>  
          Month  
        </Button>  
        <Button onClick={() => onZoom?.('year')} variant={currentZoom === 'year' ? 'contained' : 'outlined'}>  
          Year  
        </Button>  
      </ButtonGroup>  
    </div>  
  );  
}
~~~

We use Material UI components (Button, ButtonGroup, Divider, and icons) to create a simple, clean toolbar layout that provides intuitive controls for the Gantt chart.

The toolbar accepts the following optional props that enable seamless integration with our MobX store:

- `onUndo` and `onRedo` - callback functions for undo/redo actions.
- `onZoom` - a callback that updates the zoom level in our store when users click zoom buttons
- `currentZoom` - indicates which zoom level is currently active, allowing the toolbar to highlight the selected button

The buttons for "Day", "Month", and "Year" call `onZoom('day')`, `onZoom('month')`, or `onZoom('year')` respectively. The selected zoom level button uses `variant="contained"`, while the others are `outlined`, providing a clear visual cue for the current state. 

The toolbar connects directly to MobX store actions:

- Zoom Controls: When a user clicks "Day", we call `setZoom('day')` from our MobX store, which automatically updates the Gantt chart's configuration and triggers a re-render  
- The Undo button will trigger the store's `undo()` method to revert to previous states  
- The Redo button will call `redo()` to reapply changes  
- All state changes (task edits, deletions, zoom adjustments, etc.) are tracked in our custom history system and can be reversed or reapplied seamlessly

## Creating the Main Gantt Component

Let's start by building our main component that will host the Gantt chart. Create `src/components/GanttComponent.tsx`.

First, we import `useEffect`, `useMemo`, from React, the main `ReactGantt` component and types from the Gantt package, our custom `Toolbar` component, and the instance of the MobX store class that we'll soon create:

~~~tsx
import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import ReactGantt, { type ReactGanttProps, type SerializedTask, type Link } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { store } from '../store';
~~~

Now, let's set up the component and connect it to our MobX store:

~~~tsx
const DemoMobXBasic: React.FC = observer(() => {  
  const {  
    tasks,  
    links,  
    config,  
    setZoom,  
    addTask,  
    upsertTask,  
    deleteTask,  
    addLink,  
    upsertLink,  
    deleteLink,  
    undo,  
    redo,  
  } = store;

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | MobX';  
  }, []);
}
~~~

We wrap our component with `observer()` from `mobx-react-lite` to automatically track observable state changes. This ensures the component re-renders whenever relevant store properties (tasks, links, config) are modified. 

- We extract state and actions directly from our MobX store in a single destructuring  
- `useEffect` sets the document title when the component mounts

Let's configure the Gantt chart's templates which define date formatting and parsing for consistent data handling:

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(  
  () => ({  
    format_date: (d) => d.toISOString(),  
    parse_date: (s) => new Date(s),  
  }),  
  []  
);
~~~

The most critical part - connecting Gantt data changes to our MobX store:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(
  () => ({
    save: (entity, action, item, id) => {
      if (entity === 'task') {
        const task = item as SerializedTask;
        if (action === 'create') return addTask(task);
        if (action === 'update') return upsertTask(task);
        if (action === 'delete') return deleteTask(id);
      }
      if (entity === 'link') {
        const link = item as Link;
        if (action === 'create') return addLink(link);
        if (action === 'update') return upsertLink(link);
        if (action === 'delete') return deleteLink(id);
      }
    },
  }),
  [addTask, upsertTask, deleteTask, addLink, upsertLink, deleteLink]
);
~~~

- The `data.save` callback handles all data modifications from the Gantt chart  
- It routes different operations (create, update, delete) to appropriate store actions  
- The dependency array ensures the callback updates when store actions change

If you need a deeper explanation of this callback, see [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) in the Basics guide.

Finally, we render the complete component:

~~~tsx
return (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoom} />  
    <ReactGantt tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  

export default DemoMobXBasic;
~~~

- The `Toolbar` receives handlers for undo/redo and zoom controls  
- The `ReactGantt` component receives all data, configuration, and callbacks

And then update your `src/App.tsx` to use our Gantt component:

~~~tsx
import './App.css';  
import GanttComponent from './components/GanttComponent';

function App() {  
  return (  
    <div style={{ width: '95vw', height: '100vh' }}>  
      <GanttComponent />  
    </div>  
  );  
}  
export default App;
~~~


## Setting Up the MobX Store

Now let's create our state management solution using MobX. Create `src/store.ts`:

~~~ts
import { makeAutoObservable } from 'mobx';  
import type { Task, Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}

export class GanttStore {  
  tasks: SerializedTask[] = seedTasks;  
  links: Link[] = seedLinks;  
  config: GanttConfig = {  
    zoom: defaultZoomLevels,  
  };  
  past: Snapshot[] = [];  
  future: Snapshot[] = [];  
  maxHistory: number = 50;

  constructor() {  
    makeAutoObservable(this, {}, { autoBind: true });  
  }
}
~~~

- We define a `GanttStore` class that encapsulates all Gantt-related state and logic  
- The store manages `tasks`, `links`, and `config` - the core Gantt data structures  
- `past` and `future` arrays implement undo/redo history tracking  
- `makeAutoObservable` automatically marks fields as observables, getters as computed values, and methods as actions  
- The `autoBind: true` option ensures methods maintain correct `this` context

Now we implement the store methods that handle state updates and history management:

~~~ts
_snapshot(): Snapshot {  
  return {  
    tasks: JSON.parse(JSON.stringify(this.tasks)),  
    links: JSON.parse(JSON.stringify(this.links)),  
    config: JSON.parse(JSON.stringify(this.config)),  
  };  
}

_saveToHistory() {  
  this.past.push(this._snapshot());  
  if (this.past.length > this.maxHistory) this.past.shift();  
  this.future = [];  
}

undo() {  
  if (this.past.length === 0) return;  
  const previous = this.past.pop();  
  if (previous) {  
    this.future.unshift(this._snapshot());  
    this.tasks = previous.tasks;  
    this.links = previous.links;  
    this.config = previous.config;  
  }  
}

redo() {  
  if (this.future.length === 0) return;  
  const next = this.future.shift();  
  if (next) {  
    this.past.push(this._snapshot());  
    this.tasks = next.tasks;  
    this.links = next.links;  
    this.config = next.config;  
  }  
}
~~~

- `_snapshot()` creates deep clones of the current state for history tracking  
- `_saveToHistory()` preserves the current state before modifications and clears the redo stack  
- `undo()` restores the most recent state from `past` and moves current state to `future`  
- `redo()` reapplies the next state from `future` and saves current state to `past`

Now let's implement the Gantt-specific actions:

~~~ts
setZoom(level: ZoomLevel) {  
  this._saveToHistory();  
  this.config = { ...this.config, zoom: { ...this.config.zoom, current: level } };  
}

addTask(task: SerializedTask) {  
  this._saveToHistory();  
  const newTask = { ...task, id: `DB_ID:${task.id}` };  
  this.tasks.push(newTask);  
  return newTask;  
}

upsertTask(task: SerializedTask) {  
  this._saveToHistory();  
  const index = this.tasks.findIndex((t) => String(t.id) === String(task.id));  
  if (index !== -1) this.tasks[index] = { ...this.tasks[index], ...task };  
}

deleteTask(id: string | number) {  
  this._saveToHistory();  
  this.tasks = this.tasks.filter((t) => String(t.id) !== String(id));  
}

addLink(l: Link) {  
  this._saveToHistory();  
  const newLink = { ...l, id: `DB_ID:${l.id}` };  
  this.links.push(newLink);  
  return newLink;  
}

upsertLink(l: Link) {  
  this._saveToHistory();  
  const index = this.links.findIndex((link) => String(link.id) === String(l.id));  
  if (index !== -1) this.links[index] = { ...this.links[index], ...l };  
}

deleteLink(id: string | number) {  
  this._saveToHistory();  
  this.links = this.links.filter((l) => String(l.id) !== String(id));  
}  

export const store = new GanttStore();
~~~

- `setZoom` updates the zoom level configuration while maintaining history  
- `addTask` creates new tasks with simulated database IDs and tracks the operation  
- `upsertTask` updates an existing task by ID while preserving history 
- `deleteTask` removes tasks by ID with history tracking
- Similar patterns are used for link operations (`addLink`, `upsertLink`, `deleteLink`)

Each modifying action calls `this._saveToHistory()` **before** performing changes to ensure every state transition is stored and reversible.

## Run the application

Finally, we can run the dev server and test our application: 

~~~bash
npm run dev
~~~

or:
~~~bash
yarn dev 
~~~  


## Summary

In this tutorial you've:

- created a Vite + React project
- added React Gantt and connected it to a MobX store
- implemented snapshot-based undo/redo in the `GanttStore` using `past`/`future` history arrays
- drove zoom configuration, tasks and links entirely from observable MobX state
- used the `data.save` callback so that every change in the Gantt chart is turned into a store action.

This keeps the Gantt component fully declarative, while all mutation logic and history handling are encapsulated inside the MobX state.

## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/dhtmlx/react-gantt-mobx-starter).

## What's next

To go further:

- Revisit the concepts behind this example in [](integrations/react/state/state-management-basics.md)
- Combine store-driven state with advanced configuration and templating in [](integrations/react/overview.md)
- Explore the same pattern with other state managers:
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)