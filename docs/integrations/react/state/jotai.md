---
title: Using React Gantt with Jotai
sidebar_label: Jotai
description: "How to store Gantt tasks, links, and resources in Jotai atoms and update them through save callback. A minimal, flexible approach to state management for React Gantt."
---


# React Gantt - Jotai Tutorial

This tutorial will guide you through creating a React TypeScript application with Vite, integrating DHTMLX React Gantt component, and managing state with Jotai.

## Prerequisites

- Basic knowledge of React, TypeScript, Vite, and Jotai
- Recommended: read [](integrations/react/state/state-management-basics.md) to understand the data binding mode and the `data.save` callback this tutorial builds on.

## Quick setup - create the project

Before you start, install [Node.js](https://nodejs.org/en/).

Create a Vite React + TypeScript project:

~~~bash  
npm create vite@latest react-gantt-jotai-demo -- --template react-ts  
cd react-gantt-jotai-demo  
~~~

Now let's install the required dependencies.

* For **npm**: 

~~~bash
npm install jotai @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* For **yarn**:

~~~bash
yarn add jotai @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

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

The toolbar accepts the following optional props that enable seamless integration with our Jotai-powered store:

- `onUndo` and `onRedo` - callbacks that trigger undo/redo logic.
- `onZoom` - a callback that updates the zoom level when users click zoom buttons
- `currentZoom` - indicates which zoom level is currently active, allowing the toolbar to highlight the selected button

The buttons for "Day", "Month", and "Year" call `onZoom('day')`, `onZoom('month')`, or `onZoom('year')` respectively. The selected zoom level button uses `variant="contained"`, while the others are `outlined`, providing a clear visual cue for the current state. 

In the full example, these callbacks are connected to Jotai write-only atoms that handle zoom and history updates.

## Creating the Main Gantt Component

Let's build our main component that hosts the Gantt chart using Jotai for state management. Create `src/components/GanttComponent.tsx`.

First, we import the necessary React hooks for optimized performance, along with the main ReactGantt component and types from DHTMLX. For state management, we use Jotai's atomic approach:

~~~tsx
import { useEffect, useMemo, useRef } from 'react';  
import ReactGantt, {  
  type ReactGanttRef,  
  type ReactGanttProps,  
  type Link,  
  type SerializedTask,  
} from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import { useAtom, useSetAtom } from 'jotai';  
import {  
  ganttStateAtom,  
  undoAtom,  
  redoAtom,  
  setZoomAtom,  
  addTaskAtom,  
  updateTaskAtom,  
  deleteTaskAtom,  
  addLinkAtom,  
  updateLinkAtom,  
  deleteLinkAtom,  
} from '../store';

import Toolbar from './Toolbar';
~~~

`useAtom` and `useSetAtom` hooks connect our component to the atomic state.

Now, let's set up the component and connect it to our Jotai atoms:

~~~tsx
export default function DemoJotai() {  
  const ganttRef = useRef<ReactGanttRef>(null);

  const [ganttState] = useAtom(ganttStateAtom);  
  const { tasks, links, config } = ganttState;  
  const setZoomLevel = useSetAtom(setZoomAtom);  
  const undo = useSetAtom(undoAtom);  
  const redo = useSetAtom(redoAtom);  
  const addTask = useSetAtom(addTaskAtom);  
  const updateTask = useSetAtom(updateTaskAtom);  
  const deleteTask = useSetAtom(deleteTaskAtom);  
  const addLink = useSetAtom(addLinkAtom);  
  const updateLink = useSetAtom(updateLinkAtom);  
  const deleteLink = useSetAtom(deleteLinkAtom);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Jotai';  
  }, []);
}
~~~

- `ganttRef` provides direct access to the Gantt instance for imperative operations  
- We use `useAtom` to read the complete gantt state and `useSetAtom` for individual actions  
- Each action (setZoom, undo, redo, etc.) is a separate atom that can be used independently  
- `useEffect` sets the document title when the component mounts

Let's configure the Gantt chart's templates which define date formatting and parsing for consistent data handling:

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(  
  () => ({  
    format_date: (date: Date) => date.toISOString(),  
    parse_date: (value: string) => new Date(value),  
  }),  
  []  
);
~~~

The most critical part is connecting Gantt data changes to our Jotai atoms:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') updateTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') updateLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, addLink, updateTask, updateLink, deleteTask, deleteLink]  
);
~~~

- The `data.save` callback handles all data modifications from the Gantt chart  
- It routes different operations (create, update, delete) to the appropriate Jotai atom setters  
- Each atom setter independently updates its specific piece of state  
- The dependency array ensures the callback updates when atom setters change

If you need a deeper explanation of this callback, see [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) in the Basics guide.

Finally, we render the complete component:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoomLevel} />  
    <ReactGantt ref={ganttRef} tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~

- The `Toolbar` receives atom setters for undo/redo and zoom controls  
- Each prop (`tasks`, `links`, `config`) automatically updates when the corresponding atom changes

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

## Creating Jotai Atoms for State Management

Now let's create our state management solution using Jotai. Create `src/store.ts`:  

~~~tsx
import { atom, type Getter, type Setter } from 'jotai';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels } from './seed/Seed';  
import type { ZoomLevel } from './seed/Seed';

interface GanttState {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}
~~~

We import Jotai's `atom`, `Getter`, and `Setter` types and define TypeScript interfaces for our Gantt state structure.

Let's define the main state atoms that hold our Gantt data:

~~~ts
export const ganttStateAtom = atom<GanttState>({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: defaultZoomLevels },  
});

const maxHistory = 50;

export const pastAtom = atom<GanttState[]>([]);  
export const futureAtom = atom<GanttState[]>([]);
~~~

- `ganttStateAtom` holds the current Gantt state including tasks, links, and configuration  
- `pastAtom` and `futureAtom` manage the undo/redo history stacks  
- We set a maximum history limit to prevent memory issues

Here, we implement the undo/redo functionality with Jotai's derived atoms:

~~~ts
const pushHistory = (get: Getter, set: Setter, state: GanttState) => {  
  const past = [...get(pastAtom), state];  
  if (past.length > maxHistory) past.shift();  
  set(pastAtom, past);  
  set(futureAtom, []);  
};

export const undoAtom = atom(null, (get, set) => {  
  const past = get(pastAtom);  
  if (past.length === 0) return;  
  const previous = past[past.length - 1];  
  set(pastAtom, past.slice(0, -1));  
  set(futureAtom, [get(ganttStateAtom), ...get(futureAtom)]);  
  set(ganttStateAtom, previous);  
});

export const redoAtom = atom(null, (get, set) => {  
  const future = get(futureAtom);  
  if (future.length === 0) return;  
  const next = future[0];  
  set(futureAtom, future.slice(1));  
  set(pastAtom, [...get(pastAtom), get(ganttStateAtom)]);  
  set(ganttStateAtom, next);  
});
~~~

- `pushHistory` creates a snapshot of current state and updates the history stack  
- `undoAtom` and `redoAtom` are write-only atoms that manage state transitions  
- Jotai's `get` and `set` functions provide access to other atoms' values  
- Each history operation maintains the integrity of both past and future stacks

Let's implement CRUD operations for tasks using Jotai atoms:  

~~~ts
export const addTaskAtom = atom(null, (get, set, task: SerializedTask) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: [...get(ganttStateAtom).tasks, { ...task, id: `DB_ID:${task.id}` }],  
  });  
  return { ...task, id: `DB_ID:${task.id}` };  
});

export const updateTaskAtom = atom(null, (get, set, task: SerializedTask) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: get(ganttStateAtom).tasks.map((t) => (String(t.id) === String(task.id) ? { ...t, ...task } : t)),  
  });  
});

export const deleteTaskAtom = atom(null, (get, set, id: string | number) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: get(ganttStateAtom).tasks.filter((task) => String(task.id) !== String(id)),  
  });  
});
~~~

- Each atom follows the pattern `atom(null, (get, set, payload) => { ... })` creating write-only atoms  
- `addTaskAtom` creates new tasks with simulated database IDs  
- `updateTaskAtom` updates existing tasks   
- `deleteTaskAtom` removes tasks by ID   
- All operations automatically push to history before making changes  
- The same pattern we use to implement CRUD operations for links

Implement zoom level configuration:

~~~ts
export const setZoomAtom = atom(null, (get, set, level: ZoomLevel) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    config: { ...get(ganttStateAtom).config, zoom: { ...get(ganttStateAtom).config.zoom, current: level } },  
  });  
});
~~~

`setZoomAtom` handles zoom level changes with full history tracking.

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
- added React Gantt and connected it to a set of Jotai atoms
- modeled tasks, links, and zoom configuration in a single `ganttStateAtom`
- implemented snapshot-based undo/redo with `pastAtom`/`futureAtom` and shared `pushHistory` helper
- drove zoom configuration, tasks and links entirely from Jotai state
- used the `data.save` callback so that every change in the Gantt chart is applied to Jotai write-only atoms.

This keeps the Gantt component fully declarative, while all mutation logic and history handling are encapsulated inside your Jotai store.

## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/dhtmlx/react-gantt-jotai-starter).

## What's next

To go further:

- Revisit the concepts behind this example in [](integrations/react/state/state-management-basics.md)
- Combine Jotai-driven state with advanced configuration and templating in [](integrations/react/overview.md)
- Explore the same pattern with other state managers:
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)