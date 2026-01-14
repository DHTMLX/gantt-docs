---
title: Using React Gantt with Valtio
sidebar_label: Valtio
description: "Guide to integrating React Gantt with Valtio proxy state. Shows how to expose reactive snapshots to the component and apply updates from save callback in an idiomatic Valtio workflow."
---


# React Gantt - Valtio Tutorial

This tutorial will guide you through creating a React TypeScript application, integrating DHTMLX React Gantt component, and managing state with Valtio.

## Prerequisites

- Basic knowledge of React, TypeScript, Vite, and Valtio
- Recommended: read [](integrations/react/state/state-management-basics.md) to understand the data binding mode and the `data.save` callback this tutorial builds on.

## Quick setup - create the project

Before you start, install [Node.js](https://nodejs.org/en/).

Create a Vite React + TypeScript project:

~~~bash  
npm create vite@latest react-gantt-valtio-demo -- --template react-ts  
cd react-gantt-valtio-demo  
~~~

Now let's install the required dependencies.

* For **npm**: 

~~~bash
npm install valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* For **yarn**:

~~~bash
yarn add valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
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

The toolbar accepts the following optional props that make it easy to connect to our Valtio store:

- `onUndo` and `onRedo` - callback functions that trigger undo/redo logic in the Valtio actions.
- `onZoom` - a callback that updates the zoom level when users click zoom buttons
- `currentZoom` - indicates which zoom level is currently active, allowing the toolbar to highlight the selected button

The buttons for "Day", "Month", and "Year" call `onZoom('day')`, `onZoom('month')`, or `onZoom('year')` respectively. The selected zoom level button uses `variant="contained"`, while the others are `outlined`, providing a clear visual cue for the current state. 

In the full example, we pass `actions.undo`, `actions.redo`, and `actions.setZoom` from our Valtio store into these props, so the toolbar can control history and zoom without knowing any implementation details of the store.

## Creating the Main Gantt Component

Let's build our main component that hosts the Gantt chart using Valtio for state management. Create `src/components/GanttComponent.tsx`.

For state management, we use Valtio's proxy-based reactive store, which provides automatic snapshot tracking:

~~~tsx
import { useEffect, useMemo } from 'react';  
import ReactGantt, { type ReactGanttProps, type Link, type SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';  
import { useSnapshot } from 'valtio';  
import { ganttState, actions } from '../store';

import Toolbar from './Toolbar';
~~~

`useSnapshot` connects our component to the Valtio proxy state and automatically re-renders when the state changes.

Now, let's set up the component and connect it to our Valtio store:

~~~tsx
export default function DemoValtio() {  
  const snap = useSnapshot(ganttState);  
  const { tasks, links, config } = snap;  
  const { addTask, updateTask, deleteTask, addLink, updateLink, deleteLink, undo, redo, setZoom } = actions;

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Valtio';  
  }, []);
}
~~~

- `useSnapshot` reads reactive state from the Valtio proxy
- `actions` contains all operations that modify the state (addTask, updateTask, undo, redo, etc.)
- `useEffect` sets the document title on mount

Let's configure the Gantt chart's templates which define date formatting and parsing for consistent data handling:

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(  
  () => ({  
    format_date: (date: Date) => date.toISOString(),  
    parse_date: (date: string) => new Date(date),  
  }),  
  []  
);
~~~

The most critical part is connecting Gantt data changes to our Valtio-powered state:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, payload, id) => {  
      if (entity === 'task') {  
        const task = payload as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') updateTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = payload as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') updateLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, updateTask, deleteTask, addLink, updateLink, deleteLink]  
);
~~~

- The `data.save` callback handles all data modifications triggered by the Gantt chart  
- Each operation (create, update, delete) is forwarded to a corresponding Valtio action  
- Valtio updates the proxy state internally, and `useSnapshot` ensures the UI re-renders automatically

If you need a deeper explanation of this callback, see [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) in the Basics guide.

Finally, we render the complete component:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar  
      onUndo={undo}  
      onRedo={redo}  
      currentZoom={config.zoom.current}  
      onZoom={setZoom}  
    />  
    <ReactGantt tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~

- The `Toolbar` receives Valtio actions for undo/redo and zoom control  
- The props `tasks`, `links`, and `config` update automatically whenever the Valtio state changes

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

## Creating Valtio Store for State Management

Now let's create our state management solution using Valtio. Create `src/store.ts`:


~~~ts
import { proxy } from 'valtio';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}
~~~

- We import Valtio's `proxy` function to create reactive state objects  
- Define TypeScript interfaces for our state structure and history snapshots  
- Import sample data and default configurations from our seed file

Here we define the main reactive state object using Valtio's proxy:  

~~~ts
export const ganttState = proxy<{  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
}>({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: { ...defaultZoomLevels } },  
  past: [],  
  future: [],  
  maxHistory: 50,  
});
~~~

- `ganttState` is a reactive proxy object that automatically tracks state changes  
- The state includes tasks, links, configuration, and undo/redo history stacks  
- We set a maximum history limit to prevent memory issues

Implement the undo/redo functionality with Valtio:  

~~~ts
const recordHistory = () => {  
  const { tasks, links, config, past, maxHistory } = ganttState;  
  const snapshot = {  
    tasks: JSON.parse(JSON.stringify(tasks)),  
    links: JSON.parse(JSON.stringify(links)),  
    config: JSON.parse(JSON.stringify(config)),  
  };  
  ganttState.past = [...past.slice(-maxHistory + 1), snapshot];  
  ganttState.future = [];  
};

export const actions = {  
  undo() {  
    const { past, future, tasks, links, config } = ganttState;  
    if (past.length === 0) return;  
    const previous = past[past.length - 1];  
    ganttState.tasks = previous.tasks;  
    ganttState.links = previous.links;  
    ganttState.config = previous.config;  
    ganttState.past = past.slice(0, -1);  
    ganttState.future = [{ tasks, links, config }, ...future];  
  },  
  redo() {  
    const { past, future, tasks, links, config } = ganttState;  
    if (future.length === 0) return;  
    const next = future[0];  
    ganttState.tasks = next.tasks;  
    ganttState.links = next.links;  
    ganttState.config = next.config;  
    ganttState.past = [...past, { tasks, links, config }];  
    ganttState.future = future.slice(1);  
  },
}
~~~

- `recordHistory` creates deep clones of current state for history snapshots  
- `undo` and `redo` actions manage state transitions between history stacks  
- Valtio's updates automatically trigger reactivity

Now, let's implement CRUD operations for tasks and links:  

~~~ts
addTask(task: SerializedTask) {  
  recordHistory();  
  const newTask = { ...task, id: `DB_ID:${task.id}` };  
  ganttState.tasks = [...ganttState.tasks, newTask];  
  return newTask;  
},

updateTask(task: SerializedTask) {  
  recordHistory();  
  ganttState.tasks = ganttState.tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t));  
},

deleteTask(id: string | number) {  
  recordHistory();  
  ganttState.tasks = ganttState.tasks.filter((t) => String(t.id) !== String(id));  
},

addLink(link: Link) {  
  recordHistory();  
  const newLink = { ...link, id: `DB_ID:${link.id}` };  
  ganttState.links = [...ganttState.links, newLink];  
  return newLink;  
},

updateLink(link: Link) {  
  recordHistory();  
  ganttState.links = ganttState.links.map((l) => (l.id === link.id ? { ...l, ...link } : l));  
},

deleteLink(id: string | number) {  
  recordHistory();  
  ganttState.links = ganttState.links.filter((l) => String(l.id) !== String(id));  
},  
~~~

- Each operation calls `recordHistory` before making changes  
- `addTask, addLink` creates new tasks and links with simulated database IDs  
- `updateTask/updateLink` and `deleteTask/deleteLink` use standard array methods for updates

`setZoom` directly mutates the zoom configuration with automatic reactivity:

~~~ts
setZoom(level: ZoomLevel) {  
  recordHistory();  
  ganttState.config.zoom.current = level;  
},
~~~

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
- added React Gantt and connected it to a Valtio proxy store
- modeled tasks, links, and zoom configuration in a single `ganttState` proxy
- implemented snapshot-based undo/redo with `past`/`future` stacks and a shared `recordHistory` helper
- drove zoom configuration, tasks and links entirely from Valtio state
- used the `data.save` callback so that every change in the Gantt chart is routed through Valtio actions.

This keeps the Gantt component fully declarative, while all mutation logic and history handling are encapsulated inside your Valtio store.

## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/dhtmlx/react-gantt-valtio-starter).

## What's next

To go further:

- Revisit the concepts behind this example in [](integrations/react/state/state-management-basics.md)
- Combine store-driven state with advanced configuration and templating in the [React Gantt overview](integrations/react/overview.md)
- Explore the same pattern with other state managers:
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)