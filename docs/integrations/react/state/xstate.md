---
title: Using React Gantt with XState
sidebar_label: XState
description: "Learn how to integrate React Gantt into an XState-driven architecture. Covers modeling Gantt data in a state machine, handling events from save callback, and coordinating UI and business logic."
---


# React Gantt - XState Tutorial

This tutorial will guide you through creating a React TypeScript application with Vite, integrating DHTMLX React Gantt component, and managing state with XState.

## Prerequisites

- Basic knowledge of React, TypeScript, Vite, and XState
- Recommended: read [](integrations/react/state/state-management-basics.md) to understand the data binding mode and the `data.save` callback this tutorial builds on.

## Quick setup - create the project

Before you start, install [Node.js](https://nodejs.org/en/).

Create a Vite React + TypeScript project:

~~~bash  
npm create vite@latest react-gantt-xstate-demo -- --template react-ts  
cd react-gantt-xstate-demo  
~~~

Now let's install the required dependencies.

* For **npm**: 

~~~bash
npm install xstate @xstate/react @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* For **yarn**:

~~~bash
yarn add xstate @xstate/react @mui/material @mui/icons-material @emotion/react @emotion/styled
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

The toolbar accepts the following optional props that enable seamless integration with our XState machine:

- `onUndo` and `onRedo` - callback functions that dispatch undo/redo events to our state machine.
- `onZoom` - a callback that sends zoom update events to our machine when users click zoom buttons
- `currentZoom` - indicates which zoom level is currently active, allowing the toolbar to highlight the selected button

The buttons for "Day", "Month", and "Year" call `onZoom('day')`, `onZoom('month')`, or `onZoom('year')` respectively. The selected zoom level button uses `variant="contained"`, while the others are `outlined`, providing a clear visual cue for the current state. 

The toolbar connects directly to our XState machine through event dispatching:

- Zoom Controls: When a user clicks "Day", we send a `SET_ZOOM` event with the level to our state machine, which updates the Gantt chart's configuration through predefined actions  
- The Undo button sends an `UNDO` event to the machine, triggering the undo action to revert to previous states, while the Redo button sends a `REDO` event to reapply changes  
- All state changes (task edits, deletions, zoom adjustments, etc.) are handled as discrete events in our state machine and can be reversed or reapplied through the history system


## Creating the Main Gantt Component

Let's start by building our main component that will host the Gantt chart. Create `src/components/GanttComponent.tsx`.

First, we import `useEffect`, `useMemo`, and `useRef` from React, the main `ReactGantt` component and types from the Gantt package, our custom `Toolbar` component, and the `ganttMachine` definition from the XState setup:

~~~tsx
import { useCallback, useEffect, useMemo } from 'react';
import { useMachine } from '@xstate/react';
import ReactGantt, {
  type ReactGanttRef,
  type ReactGanttProps,
  type Link,
  type SerializedTask,
} from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { ganttMachine } from '../machine';
import { type ZoomLevel } from '../seed/Seed';
~~~

Now, let's set up the component and connect it to our XState machine:

~~~tsx
export default function DemoXState() {  
  const [state, send] = useMachine(ganttMachine);  
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | XState';  
  }, []);
}
~~~

- We use the `useMachine` hook from `@xstate/react` to connect our component to the state machine  
- The hook returns the current `state` and a `send` function for dispatching events to the machine  
- `ganttRef` provides direct access to the Gantt instance for imperative operations  
- `useEffect` sets the document title when the component mounts

Let's configure the Gantt chart's templates which define date formatting and parsing for consistent data handling and event handlers:

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(  
  () => ({  
    format_date: (d) => d.toISOString(),  
    parse_date: (s) => new Date(s),  
  }),  
  []  
);

const handleUndo = useCallback(() => {  
  send({ type: 'UNDO' });  
}, [send]);

const handleRedo = useCallback(() => {  
  send({ type: 'REDO' });  
}, [send]);

const handleZoom = useCallback(  
  (level: ZoomLevel) => {  
    send({ type: 'SET_ZOOM', level });  
  },  
  [send]  
);
~~~

We use `useCallback` to memoize event handlers for undo, redo, and zoom operations, which prevents unnecessary re-renders of child components when the component updates. Each handler dispatches a specific event type to the state machine with the required payload.

The most critical part - connecting Gantt data changes to our XState machine:

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') {  
          send({ type: 'ADD_TASK', task });  
        } else if (action === 'update') {  
          send({ type: 'UPSERT_TASK', task });  
        } else if (action === 'delete') {  
          send({ type: 'DELETE_TASK', id });  
        }  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') {  
          send({ type: 'ADD_LINK', link });  
        } else if (action === 'update') {  
          send({ type: 'UPSERT_LINK', link });  
        } else if (action === 'delete') {  
          send({ type: 'DELETE_LINK', id });  
        }  
      }  
    },  
  }),  
  [send]  
);
~~~

- The `data.save` callback handles all data modifications from the Gantt chart  
- It routes different operations (create, update, delete) to appropriate machine events using the `send` function  
- Each user action in the Gantt chart becomes a discrete event sent to the state machine  
- The dependency array ensures the callback updates when the `send` function changes

If you need a deeper explanation of this callback, see [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) in the Basics guide.

Finally, we render the complete component:

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar  
      onUndo={handleUndo}  
      onRedo={handleRedo}  
      currentZoom={state.context.config.zoom.current}  
      onZoom={handleZoom}  
    />  
    <ReactGantt  
      ref={ganttRef}  
      tasks={state.context.tasks}  
      links={state.context.links}  
      config={state.context.config}  
      templates={templates}  
      data={data}  
    />  
  </div>  
);  
~~~

- The Toolbar receives event handlers that dispatch `UNDO`, `REDO`, and `SET_ZOOM` events to the state machine  
- The ReactGantt component receives all data (`tasks`, `links`, `config`) from the machine's context

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

## Setting Up the XState Machine

Now let's create our state management solution using XState. Create `src/machine.ts`:

~~~ts
import { createMachine, assign } from 'xstate';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

export interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}

export interface ContextType {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;

  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
}
~~~

- We define TypeScript interfaces for the machine's context and snapshot structure  
- `ContextType` defines all Gantt-related state including tasks, links, configuration, and history tracking  
- `Snapshot` interface represents the state structure for undo/redo functionality

Now we define the event types that our machine will handle:

~~~ts
type SetZoomEvent = { type: 'SET_ZOOM'; level: ZoomLevel };  
type UndoEvent = { type: 'UNDO' };  
type RedoEvent = { type: 'REDO' };  
type AddTaskEvent = { type: 'ADD_TASK'; task: SerializedTask };  
type UpsertTaskEvent = { type: 'UPSERT_TASK'; task: SerializedTask };  
type DeleteTaskEvent = { type: 'DELETE_TASK'; id: string | number };  
type AddLinkEvent = { type: 'ADD_LINK'; link: Link };  
type UpsertLinkEvent = { type: 'UPSERT_LINK'; link: Link };  
type DeleteLinkEvent = { type: 'DELETE_LINK'; id: string | number };

type EventType =  
  | SetZoomEvent  
  | UndoEvent  
  | RedoEvent  
  | AddTaskEvent  
  | UpsertTaskEvent  
  | DeleteTaskEvent  
  | AddLinkEvent  
  | UpsertLinkEvent  
  | DeleteLinkEvent;
~~~

- Each user interaction is represented as a discrete event with a specific type and payload  
- Events are strongly typed, ensuring type safety across the entire application

Let's create the state machine configuration:

~~~ts
const createSnapshot = (ctx: ContextType): Snapshot => ({  
  tasks: structuredClone(ctx.tasks),  
  links: structuredClone(ctx.links),  
  config: structuredClone(ctx.config),  
});

export const ganttMachine = createMachine(  
  {  
    id: 'gantt',  
    types: {  
      context: {} as ContextType,  
      events: {} as EventType,  
    },  
    context: {  
      tasks: seedTasks,  
      links: seedLinks,  
      config: { zoom: defaultZoomLevels },  
      past: [],  
      future: [],  
      maxHistory: 50,  
    },  
    initial: 'ready',  
    states: {  
      ready: {  
        on: {  
          SET_ZOOM: { actions: ['pushHistory', 'setZoom'] },  
          UNDO: { actions: 'undo' },  
          REDO: { actions: 'redo' },

          ADD_TASK: { actions: ['pushHistory', 'addTask'] },  
          UPSERT_TASK: { actions: ['pushHistory', 'upsertTask'] },  
          DELETE_TASK: { actions: ['pushHistory', 'deleteTask'] },

          ADD_LINK: { actions: ['pushHistory', 'addLink'] },  
          UPSERT_LINK: { actions: ['pushHistory', 'upsertLink'] },  
          DELETE_LINK: { actions: ['pushHistory', 'deleteLink'] },  
        },  
      },  
    },  
  },
)
~~~

Machine Configuration:

- The machine has a single `ready` state where all Gantt operations are available  
- Each event triggers a sequence of actions that update the machine's context  
- The `context` defines the initial state with sample data and empty history arrays  
- Event handlers specify which actions to execute when events are received

Now we implement the actions that handle state updates:

~~~ts
{  
  actions: {  
    pushHistory: assign(({ context }) => {  
      const snap = createSnapshot(context);  
      const past = [...context.past, snap];  
      if (past.length > context.maxHistory) past.shift();

      return {  
        past,  
        future: [],  
      };  
    }),  
    setZoom: assign(({ context, event }) => ({  
      config: {  
        ...context.config,  
        zoom: { ...context.config.zoom, current: (event as SetZoomEvent).level },  
      },  
    })),

    undo: assign(({ context }) => {  
      if (context.past.length === 0) return {};

      const previous = context.past[context.past.length - 1];  
      const future = [createSnapshot(context), ...context.future];

      return {  
        ...previous,  
        past: context.past.slice(0, -1),  
        future,  
      };  
    }),

    redo: assign(({ context }) => {  
      if (context.future.length === 0) return {};

      const next = context.future[0];  
      const past = [...context.past, createSnapshot(context)];

      return {  
        ...next,  
        past,  
        future: context.future.slice(1),  
      };  
    }),
  }
}
~~~

History Management Actions:

* `pushHistory` creates a snapshot of the current state and adds it to the history stack  
* `undo` restores the previous state from the `past` array and moves current state to `future`  
* `redo` reapplies the next state from `future` and saves current state to `past`

And let's implement the Gantt-specific data operations:

~~~ts
addTask: assign(({ context: ctx, event }) => ({  
  tasks: [...ctx.tasks, { ...(event as AddTaskEvent).task, id: `DB_ID:${(event as AddTaskEvent).task.id}` }],  
})),

upsertTask: assign(({ context: ctx, event }) => ({  
  tasks: ctx.tasks.map((task) =>  
    String(task.id) === String((event as UpsertTaskEvent).task.id)  
      ? { ...task, ...(event as UpsertTaskEvent).task }  
      : task  
  ),  
})),

deleteTask: assign(({ context, event }) => ({  
  tasks: context.tasks.filter((t) => String(t.id) !== String((event as DeleteTaskEvent).id)),  
})),

addLink: assign(({ context, event }) => ({  
  links: [...context.links, { ...(event as AddLinkEvent).link, id: `DB_ID:${(event as AddLinkEvent).link.id}` }],  
})),

upsertLink: assign(({ context, event }) => ({  
  links: context.links.map((l) =>  
    String(l.id) === String((event as UpsertLinkEvent).link.id) ? { ...l, ...(event as UpsertLinkEvent).link } : l  
  ),  
})),

deleteLink: assign(({ context, event }) => ({  
  links: context.links.filter((l) => String(l.id) !== String((event as DeleteLinkEvent).id)),  
})),  
~~~

- `addTask` creates new tasks with simulated database IDs and adds them to the task list  
- `upsertTask` updates existing tasks by ID 
- `deleteTask` removes tasks by ID from the task list  
- Similar patterns are used for link operations (`addLink`, `upsertLink`, `deleteLink`)  
- Each data modification action is paired with `pushHistory` to ensure undo/redo capability  
- The `assign` function from XState is used to immutably update the machine's context

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
- added React Gantt and connected it to an XState machine via `useMachine`
- modeled tasks, links, and zoom configuration in the machine context
- implemented snapshot-based undo/redo using `past`/`future` history arrays and a `pushHistory` action
- used the `data.save` callback so that every change in the Gantt chart becomes a strongly typed XState event.

This keeps the Gantt component fully declarative, while all mutation logic and history handling live inside the state machine.

## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/dhtmlx/react-gantt-xstate-starter).

## What's next

To go further:

- Revisit the concepts behind this example in [](integrations/react/state/state-management-basics.md)
- Combine XState machine with advanced configuration and templating in the [React Gantt overview](integrations/react/overview.md)
- Compare this XState-driven architecture with other state managers:
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)