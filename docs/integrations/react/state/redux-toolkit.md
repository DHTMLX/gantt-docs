---
title: Using React Gantt with Redux Toolkit
sidebar_label: Redux Toolkit
description: "Step-by-step guide to integrating React Gantt with Redux Toolkit."
---

# React Gantt - Redux Toolkit Tutorial

This tutorial will guide you through creating a React TypeScript application with Vite, integrating DHTMLX React Gantt component, and managing state with Redux Toolkit.

## Prerequisites

- Basic knowledge of React, TypeScript, and Redux
- Recommended: read [](integrations/react/state/state-management-basics.md) to understand the data binding mode and the `data.save` callback this tutorial builds on.

## Quick setup - create the project

Before you start, install [Node.js](https://nodejs.org/en/).

Create a Vite React + TypeScript project:

~~~bash  
npm create vite@latest react-gantt-redux-demo -- --template react-ts  
cd react-gantt-redux-demo  
~~~

Now let's install the required dependencies.

* For **npm**: 

~~~bash
npm install @reduxjs/toolkit react-redux @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* For **yarn**:

~~~bash
yarn add @reduxjs/toolkit react-redux @mui/material @mui/icons-material @emotion/react @emotion/styled
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

## Configure Redux store 

Create `src/redux/store.ts`. This wires the `gantt` slice into the Redux store:

~~~ts
import { configureStore } from '@reduxjs/toolkit';  
import ganttReducer from './ganttSlice';

export const store = configureStore({  
  reducer: {  
    gantt: ganttReducer,  
  },  
});

export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;
~~~

`configureStore` sets up Redux with sensible defaults (DevTools, thunk). Typing `RootState` and `AppDispatch` makes it easy to type `useSelector` and `useDispatch` across the app. 

## Create the Redux Slice

Create `src/redux/ganttSlice.ts` to handle all Gantt-related data: tasks, links (dependencies), and configuration settings like zoom.

This slice also introduces **undo/redo functionality** through snapshot history tracking, allowing users to revert or reapply previous changes in the chart. 

~~~ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';  
import type { SerializedTask, Task, Link, GanttConfig } from '@dhtmlx/trial-react-gantt';  
import { defaultZoomLevels, seedLinks, seedTasks, type ZoomLevel } from '../common/Seed';  
import { type WritableDraft } from 'immer';

interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}

interface GanttState {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
}

const initialState: GanttState = {  
  tasks: seedTasks,  
  links: seedLinks,  
  config: {  
    zoom: defaultZoomLevels,  
  },  
  past: [],  
  future: [],  
  maxHistory: 50,  
};

const createSnapshot = (state: GanttState): WritableDraft<Snapshot> => ({  
  tasks: JSON.parse(JSON.stringify(state.tasks)),  
  links: JSON.parse(JSON.stringify(state.links)),  
  config: JSON.parse(JSON.stringify(state.config)),  
});

const pushHistory = (state: GanttState) => {  
  state.past.push(createSnapshot(state) as Snapshot);  
  if (state.past.length > state.maxHistory) state.past.shift();  
  state.future = [];  
};

const ganttSlice = createSlice({  
  name: 'gantt',  
  initialState,  
  reducers: {  
    undo(state) {  
      if (state.past.length > 0) {  
        const previous = state.past[state.past.length - 1];  
        const newFuture = createSnapshot(state as GanttState);

        state.tasks = previous.tasks;  
        state.links = previous.links;  
        state.config = previous.config;  
        state.past = state.past.slice(0, -1);  
        state.future = [newFuture, ...state.future];  
      }  
    },  
    redo(state) {  
      if (state.future.length > 0) {  
        const next = state.future[0];  
        const newPast = createSnapshot(state as GanttState);

        state.tasks = next.tasks;  
        state.links = next.links;  
        state.config = next.config;  
        state.future = state.future.slice(1);  
        state.past = [...state.past, newPast];  
      }  
    },

    updateTask(state, action: PayloadAction<SerializedTask>) {  
      pushHistory(state);

      const updatedTask = action.payload;  
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);  
      if (index !== -1) {  
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };  
      }  
    },  
    createTask(state, action: PayloadAction<SerializedTask>) {  
      pushHistory(state);

      state.tasks.push({ ...action.payload, id: `DB_ID:${action.payload.id}` });  
    },  
    deleteTask(state, action: PayloadAction<string>) {  
      pushHistory(state);

      state.tasks = state.tasks.filter((task) => String(task.id) !== action.payload);  
    },  
    updateLink(state, action: PayloadAction<Link>) {  
      pushHistory(state);

      const updatedLink = action.payload;  
      const index = state.links.findIndex((link) => link.id === updatedLink.id);  
      if (index !== -1) {  
        state.links[index] = { ...state.links[index], ...updatedLink };  
      }  
    },  
    createLink(state, action: PayloadAction<Link>) {  
      pushHistory(state);

      state.links.push({ ...action.payload, id: `DB_ID:${action.payload.id}` });  
    },  
    deleteLink(state, action: PayloadAction<string>) {  
      pushHistory(state);

      state.links = state.links.filter((link) => String(link.id) !== action.payload);  
    },  
    setZoom(state, action: PayloadAction<ZoomLevel>) {  
      pushHistory(state);

      state.config.zoom.current = action.payload;  
    },  
  },  
});

export const { undo, redo, updateTask, createTask, deleteTask, updateLink, createLink, deleteLink, setZoom } =  
  ganttSlice.actions;  
export default ganttSlice.reducer;
~~~

The `GanttState` includes three new fields: `past`, `future`, and `maxHistory` which together implement a **time travel mechanism** for undo/redo actions.

To support undo/redo, two helper functions are used:

- **`createSnapshot(state)`** - deep-clones the current Gantt data to preserve an exact copy of tasks, links, and config at a given point in time.

- **`pushHistory(state)`** - saves the current snapshot to the `past` array before any modifying action, clearing the `future` stack (so redo applies only to the latest undo sequence).

Explanation of the `ganttSlice.ts` is provided below.
The `createSlice` function automatically generates:

1. The **reducers** (functions that modify state).  
2. The **action creators** (functions you can dispatch from your UI).

Each reducer updates a specific part of the Gantt state:

- **updateTask**: updates an existing task's data (for example, when you edit a name, date, or duration).  
- **createTask:** Adds a new task to the state. The fake `DB_ID:` prefix simulates how a real backend might assign a unique ID after saving to a database.  
- **deleteTask:** removes a task from the store based on its ID.  
- **updateLink, createLink, deleteLink:** These work exactly like the task reducers, but for **links** (dependencies between tasks).  
- **setZoom**: updates the current zoom level in the config object, with history tracking.  
- **undo**: restores the previous snapshot from `past`, moving the current one into future.  
- **redo**: reapplies a previously undone state by moving a snapshot from `future` back to `past`.

Every modifying action first calls `pushHistory(state)`, meaning the user can **safely undo or redo** any task, link, or configuration change.

## Setting Up Sample Data and Configuration

Create sample data for our Gantt chart in `src/common/Seed.ts` which will contain the initial data:

~~~ts
import type { SerializedTask, Link, GanttConfig } from '@dhtmlx/trial-react-gantt';

export type ZoomLevel = 'day' | 'month' | 'year';

export const defaultZoomLevels: NonNullable<GanttConfig['zoom']> = {
  current: 'day',
  levels: [
    { 
      name: 'day',
      scale_height: 27,
      min_column_width: 80,
      scales: [{ unit: 'day', step: 1, format: '%d %M' }],
    },
    {
      name: 'month',
      scale_height: 50,
      min_column_width: 120,
      scales: [
        { unit: 'month', format: '%F, %Y' },
        { unit: 'week', format: 'Week #%W' },
      ],
    },
    {
      name: 'year',
      scale_height: 50,
      min_column_width: 30,
      scales: [{ unit: 'year', step: 1, format: '%Y' }],
    },
  ],
};

export const seedTasks: SerializedTask[] = [
  {
    id: 1,
    text: 'Office itinerancy',
    type: 'project',
    start_date: new Date(2025, 3, 2).toISOString(),
    duration: 17,
    progress: 0.4,
    parent: 0,
    open: true,
  }
  // ...
];

export const seedLinks: Link[] = [
  { id: 2, source: 2, target: 3, type: '0' },
  { id: 3, source: 3, target: 4, type: '0' },
  // ...
];
~~~

## Building the Control Toolbar Component

Now, let's add a **Toolbar** component in `src/common/Toolbar.tsx`.

This component gives users quick access to common Gantt controls, like zooming between *day*, *month*, and *year* views, and performing **undo/redo** actions.

~~~tsx
import Divider from '@mui/material/Divider';  
import ButtonGroup from '@mui/material/ButtonGroup';  
import UndoIcon from '@mui/icons-material/Undo';  
import RedoIcon from '@mui/icons-material/Redo';  
import Button from '@mui/material/Button';  
import type { ZoomLevel } from './Seed';

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

We use **Material UI components** (`Button`, `ButtonGroup`, `Divider`, and icons) to create a simple, clean toolbar layout.

The toolbar accepts the following optional props:

- `onUndo` and `onRedo` - callback functions for undo/redo actions.
- `onZoom` - a callback triggered when the user clicks one of the zoom buttons.
- `currentZoom` - tells the toolbar which zoom level is currently active, so the selected button can be highlighted. 

The buttons for "Day", "Month", and "Year" call `onZoom('day')`, `onZoom('month')`, or `onZoom('year')` respectively. The selected zoom level button uses `variant="contained"`, while the others are `outlined`, providing a clear visual cue for the current state. 

Later in the tutorial, we'll connect this toolbar to our store actions:

- When a user clicks "Day", we'll call `setZoom('day')` from our store  
- The Undo button will trigger the store's `undo()` method to revert to previous states  
- The Redo button will call `redo()` to reapply changes  
- All state changes (task edits, deletions, zoom adjustments, etc.) are tracked in our custom history system and can be reversed or reapplied seamlessly

This updates the Gantt chart's configuration in the global state, and the UI will automatically re-render with the new zoom level.

Let's create the core component in `src/components/GanttComponent.tsx` that brings together DHTMLX React Gantt with Redux Toolkit state management. This component serves as the central piece of our application, handling all Gantt chart interactions and state updates.

We use `useMemo` and `useCallback` hooks to optimize performance by preventing unnecessary re-renders. `useMemo` caches computed values (like configuration objects), while `useCallback` memoizes callback functions. This ensures that these objects and functions aren't recreated on every render if their dependencies haven't been changed.

We create the main component and set up Redux integration:

~~~tsx
import React, { useRef, useEffect, useMemo, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';  
import ReactGantt, { GanttConfig, ReactGanttProps, Link, ReactGanttRef, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import {  
  undo,  
  redo,  
  updateTask,  
  createTask,  
  deleteTask,  
  updateLink,  
  createLink,  
  deleteLink,  
  setZoom,  
} from '../redux/ganttSlice';

import type { RootState, AppDispatch } from '../redux/store';  
import Toolbar from '../common/Toolbar';  
import { type ZoomLevel } from '../common/Seed';

const ReactGanttExample: React.FC = () => {  
  const ganttRef = useRef<ReactGanttRef>(null);  
  const dispatch = useDispatch<AppDispatch>();  
  const { tasks, links, config } = useSelector((state: RootState) => state.gantt);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Redux Toolkit';  
  }, []);
}
~~~

- `ganttRef` gives us direct access to the Gantt instance for calling methods like undo/redo  
- `dispatch` is our function for sending actions to the Redux store  
- We use `useSelector` hooks to extract tasks, links, and configuration from the Redux state  
- `useEffect` sets the document title when the component mounts

The component needs to handle user actions from the toolbar and the Gantt chart itself. We use `useCallback` to memoize these handler functions:  
~~~tsx
const handleUndo = useCallback(() => {  
  dispatch(undo());  
}, [dispatch]);

const handleRedo = useCallback(() => {  
  dispatch(redo());  
}, [dispatch]);

const handleZoomIn = useCallback(  
  (newZoom: ZoomLevel) => {  
    dispatch(setZoom(newZoom));  
  },  
  [dispatch]  
);
~~~

- `handleZoomIn` dispatches an action to update the zoom level in Redux state  
- `handleUndo` and `handleRedo` dispatch the `undo`/`redo` actions from the slice, which restore the previous snapshot from `past` or `future`
- These functions are passed to the Toolbar component as callbacks

Now we configure the Gantt chart using `useMemo` to cache configuration objects: 

~~~tsx
const ganttConfig: GanttConfig = useMemo(() => ({ ...config }), [config]);

const templates: ReactGanttProps['templates'] = useMemo(  
  () => ({  
    format_date: (date: Date) => date.toISOString(),  
    parse_date: (date: string) => new Date(date),  
  }),  
  []  
);
~~~

We also need to handle all data changes from the Gantt chart:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, payload, id) => {  
      if (entity === 'task') {  
        const task = payload as SerializedTask;  
        if (action === 'update') {  
          dispatch(updateTask(task));  
        } else if (action === 'create') {  
          dispatch(createTask(task));  
        } else if (action === 'delete') {  
          dispatch(deleteTask(String(id)));  
        }  
      } else if (entity === 'link') {  
        const link = payload as Link;  
        if (action === 'update') {  
          dispatch(updateLink(link));  
        } else if (action === 'create') {  
          dispatch(createLink(link));  
        } else if (action === 'delete') {  
          dispatch(deleteLink(String(id)));  
        }  
      }  
    },  
  }),  
  [dispatch]  
);
~~~

The `data.save` callback is called whenever any change occurs in the Gantt chart.

It receives four parameters:  
  - `entity`: whether it's a 'task' or 'link'  
  - `action`: the type of operation ('create', 'update', 'delete')  
  - `payload`: the actual data being modified  
  - `id`: the identifier of the item being modified  

Based on the entity and action, we dispatch the appropriate Redux action. This creates a seamless connection between the Gantt chart's internal state and our Redux store.

If you need a deeper explanation of this callback, see [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) in the Basics guide.

Finally, we render the complete component:  

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={handleUndo} onRedo={handleRedo} onZoom={handleZoomIn} currentZoom={config.zoom.current} />

    <ReactGantt tasks={tasks} links={links} config={ganttConfig} templates={templates} data={data} ref={ganttRef} />  
  </div>  
);  
~~~

## Integrating Redux Provider

Update your `src/main.tsx` to include the Redux Provider:  

~~~tsx
import React from 'react';  
import { createRoot } from 'react-dom/client';  
import { Provider } from 'react-redux';  
import { store } from './redux/store';  
import './index.css';  
import App from './App';

createRoot(document.getElementById('root')!).render(  
  <React.StrictMode>  
    <Provider store={store}>  
      <App />  
    </Provider>  
  </React.StrictMode>  
);
~~~

And then update your `src/App.tsx` to use our Gantt component:

~~~tsx
import './App.css'  
import GanttComponent from './components/GanttComponent'

function App() {  
  return (  
    <div style={{ height: '100vh', width: '95vw' }}>  
      <GanttComponent />  
    </div>  
  )  
}

export default App
~~~

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
- added React Gantt and wired it to a Redux Toolkit store
- implemented snapshot-based undo/redo in the `ganttSlice`
- connected Material UI toolbar to zoom and history actions
- used the `data.save` callback so that every task/link change in the Gantt chart becomes a Redux action.

The result is a Gantt chart, whose tasks, links and configuration are fully driven by Redux state.

## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/dhtmlx/react-gantt-redux-starter).

## What's next

To go further:

- Revisit the concepts behind this example in [](integrations/react/state/state-management-basics.md)
- Combine Redux-driven state with advanced configuration and templating in the [React Gantt overview](integrations/react/installation.md)
- Explore the same pattern with other state managers:
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)
