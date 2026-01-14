---
title: Using React Gantt with Zustand
sidebar_label: Zustand
description: "Learn how to manage Gantt data with a lightweight Zustand store, connect selectors to the component, and process updates using save callback in a predictable, minimal boilerplate setup."
---


# React Gantt - Zustand Tutorial

This tutorial will guide you through creating a React TypeScript application with Vite, integrating DHTMLX React Gantt component, and managing state with Zustand.

## Prerequisites

- Basic knowledge of React, TypeScript, Vite, and Zustand
- Recommended: read [](integrations/react/state/state-management-basics.md) to understand the data binding mode and the `data.save` callback this tutorial builds on.

## Quick setup - create the project

Before you start, install [Node.js](https://nodejs.org/en/).

Create a Vite React + TypeScript project:

~~~bash  
npm create vite@latest react-gantt-zustand-demo -- --template react-ts  
cd react-gantt-zustand-demo  
~~~

Now let's install the required dependencies.

* For **npm**: 

~~~bash
npm install zustand @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* For **yarn**:

~~~bash
yarn add zustand @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

Then we need to install the React Gantt package. 

### Installing React Gantt

Install React Gantt as described in the [React Gantt installation guide](integrations/react/installation.md).

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

~~~ts
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

The toolbar accepts the following optional props that enable seamless integration with our Zustand store:

- `onUndo` and `onRedo` - callback functions for undo/redo actions.
- `onZoom` - a callback that updates the zoom level in our Zustand store when users click zoom buttons
- `currentZoom` - indicates which zoom level is currently active, allowing the toolbar to highlight the selected button
- The buttons for "Day", "Month", and "Year" call `onZoom('day')`, `onZoom('month')`, or `onZoom('year')` respectively. The selected zoom level button uses `variant="contained"`, while the others are `outlined`, providing a clear visual cue for the current state. 

The toolbar connects directly to Zustand store actions:

- Zoom Controls: When a user clicks "Day", we call `setZoom('day')` from our Zustand store, which automatically updates the Gantt chart's configuration and triggers a re-render  
- The Undo button will trigger the store's `undo()` method to revert to previous states  
- The Redo button will call `redo()` to reapply changes  
- All state changes (task edits, deletions, zoom adjustments, etc.) are tracked in our custom history system and can be reversed or reapplied seamlessly

## Creating the Main Gantt Component

Let's start by building our main component that will host the Gantt chart. Create `src/components/GanttComponent.tsx`.

First, we import `useEffect`, `useMemo`, and `useRef` from React, the main `ReactGantt` component and types from the Gantt package, our custom `Toolbar` component, and the `useGanttStore` hook from the Zustand store:

~~~tsx
import { useEffect, useMemo, useRef } from 'react';  
import ReactGantt, { ReactGanttProps, Link, ReactGanttRef, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { useGanttStore } from '../store';
~~~

Now, let's set up the component and connect it to our Zustand store:

~~~tsx
export default function DemoZustand() {  
  const ganttRef = useRef<ReactGanttRef>(null);

  const { tasks, links, config, setZoom, addTask, upsertTask, deleteTask, addLink, upsertLink, deleteLink, undo, redo } = useGanttStore();

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Zustand';  
  }, []);
~~~

- `ganttRef` provides direct access to the Gantt instance for imperative operations  
- We extract state and actions directly from our Zustand store in a single destructuring  
- `useEffect` sets the document title when the component mounts

Let's configure the Gantt chart's templates which define date formatting and parsing for consistent data handling:

~~~ts
const templates: ReactGanttProps['templates'] = useMemo(  
  () => ({  
    format_date: (d) => d.toISOString(),  
    parse_date: (s) => new Date(s),  
  }),  
  []  
);
~~~

The most critical part - connecting Gantt data changes to our Zustand store:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') upsertTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') upsertLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, addLink, upsertTask, upsertLink, deleteTask, deleteLink]  
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
    <ReactGantt ref={ganttRef} tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~

- The `Toolbar` receives handlers for undo/redo and zoom controls  
- The `ReactGantt` component receives all data, configuration, and callbacks

And then update your `src/App.tsx` to use our Gantt component:

~~~tsx
import './App.css';  
import GanttComponent from './components/GanttComponent';

function App() {  
  return (  
    <div style={{ height: '100vh', width: '95vw' }}>  
      <GanttComponent />  
    </div>  
  );  
}

export default App;
~~~

## Setting Up the Zustand Store

Now let's create our state management solution using Zustand. Create `src/store.ts`:

~~~ts
import { create } from 'zustand';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

type Snapshot = { tasks: SerializedTask[]; links: Link[]; config: GanttConfig };  
type State = {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
  recordHistory: () => void;  
  undo: () => void;  
  redo: () => void;

  setZoom: (level: ZoomLevel) => void;  
  addTask: (task: SerializedTask) => SerializedTask;  
  upsertTask: (task: SerializedTask) => void;  
  deleteTask: (id: string | number) => void;  
  addLink: (l: Link) => Link;  
  upsertLink: (l: Link) => void;  
  deleteLink: (id: string | number) => void;  
};
~~~

Here we declare:

- **tasks**, **links**, and **config** - the main Gantt data managed by the store.  
- **past** and **future** - arrays for **undo/redo history**.  
- **recordHistory()** - a helper function to create snapshots before every change.  
- **setZoom**, **addTask**, **upsertTask**, **deleteTask**, etc. - state modification actions for tasks and links.

Now we need to implement the store actions that will handle state updates:

~~~ts
export const useGanttStore = create<State>((set, get) => ({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: defaultZoomLevels },

  past: [],  
  future: [],  
  maxHistory: 50,

  recordHistory: () => {  
    const { tasks, links, config, past, maxHistory } = get();  
    const snapshot = {  
      tasks: JSON.parse(JSON.stringify(tasks)),  
      links: JSON.parse(JSON.stringify(links)),  
      config: JSON.parse(JSON.stringify(config)),  
    };  
    set({  
      past: [...past.slice(-maxHistory + 1), snapshot],  
      future: [],  
    });  
  },

  undo: () => {  
    const { past, future, tasks, links, config } = get();  
    if (past.length === 0) return;  
    const previous = past[past.length - 1];  
    set({  
      tasks: previous.tasks,  
      links: previous.links,  
      past: past.slice(0, -1),  
      future: [{ tasks, links, config }, ...future],  
      config: previous.config,  
    });  
  },

  redo: () => {  
    const { past, future, tasks, links, config } = get();  
    if (future.length === 0) return;  
    const next = future[0];  
    set({  
      tasks: next.tasks,  
      links: next.links,  
      past: [...past, { tasks, links, config }],  
      config: next.config,  
      future: future.slice(1),  
    });  
  },

  setZoom: (level) => {  
    get().recordHistory();  
    set({  
      config: { ...get().config, zoom: { ...get().config.zoom, current: level } },  
    });  
  },

  addTask: (task) => {  
    get().recordHistory();  
    const newTask = { ...task, id: `DB_ID:${task.id}` };  
    set({ tasks: [...get().tasks, newTask] });  
    return newTask;  
  },

  upsertTask: (task) => {  
    get().recordHistory();  
    const tasks = get().tasks;  
    const index = tasks.findIndex((x) => String(x.id) === String(task.id));  
    if (index !== -1) {  
      set({  
        tasks: [...tasks.slice(0, index), { ...tasks[index], ...task }, ...tasks.slice(index + 1)],  
      });  
    }  
  },

  deleteTask: (id) => {  
    get().recordHistory();  
    set({ tasks: get().tasks.filter((t) => String(t.id) !== String(id)) });  
  },

  addLink: (l) => {  
    get().recordHistory();  
    const newLink = { ...l, id: `DB_ID:${l.id}` };  
    set({ links: [...get().links, newLink] });  
    return newLink;  
  },

  upsertLink: (l) => {  
    get().recordHistory();  
    const links = get().links;  
    const index = links.findIndex((x) => String(x.id) === String(l.id));  
    if (index !== -1) {  
      set({  
        links: [...links.slice(0, index), { ...links[index], ...l }, ...links.slice(index + 1)],  
      });  
    }  
  },

  deleteLink: (id) => {  
    get().recordHistory();  
    set({ links: get().links.filter((l) => String(l.id) !== String(id)) });  
  },  
}));
~~~

- `set` function directly updates the state  
- `get` function allows accessing current state values  
- `setZoom` updates the zoom level of the Gantt config  
- `addTask` creates new tasks with simulated database IDs  
- `upsertTask` handles updates of an existing task by ID  
- `deleteTask` removes tasks by ID   
- Similar patterns are used for link operations

### History Management (Undo/Redo)

To enable undo and redo functionality, we define **recordHistory**, **undo**, and **redo**:

* **recordHistory()** creates a deep copy ("snapshot") of the current Gantt state before any modification.  
* **undo()** rolls back to the most recent snapshot in `past`, while saving the current state to `future`.  
* **redo()** reapplies the next available snapshot from `future` back into the store.

These methods allow the user to move backward and forward through recent Gantt state changes

Each modifying action calls `recordHistory()` **before** performing changes to ensure every state transition is stored and reversible.

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
- added React Gantt and connected it to a Zustand store
- implemented snapshot-based undo/redo in the store using `past`/`future` history arrays
- drove zoom configuration, tasks and links entirely from Zustand state
- used the `data.save` callback so that every change in the Gantt chart is turned into a store action.

This keeps the Gantt component fully declarative, while all mutation logic and history handling are encapsulated inside the Zustand store.

## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/dhtmlx/react-gantt-zustand-starter).

## What's next

To go further:

- Revisit the concepts behind this example in [](integrations/react/state/state-management-basics.md)
- Combine store-driven state with advanced configuration and templating in the [React Gantt overview](integrations/react/overview.md)
- Explore the same pattern with other state managers:
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)