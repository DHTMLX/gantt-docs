---
title: Quick Start with React Gantt
sidebar_label: Quick Start
description: "Step-by-step guide to using the React Gantt component"
---

# Quick Start with React Gantt

:::note
This tutorial covers the React wrapper included in the **Commercial, Enterprise, and Ultimate** editions of DHTMLX Gantt. 
If you are using the **Individual** or **GPL** edition, follow the alternative guide: 
[How to Start with React](integrations/react/js-gantt-react.md).
:::

The **React Gantt** component is the official wrapper for **DHTMLX Gantt**. 
This guide walks you through creating a small React application and rendering a basic Gantt chart using the trial package.

If you're new to React, start with the official [React documentation](https://react.dev/learn). Check [a complete working project that follows this tutorial on GitHub](https://github.com/dhtmlx/react-gantt-quick-start).

## Version requirements

- React **18 or newer**

## Creating a new React project

To create a React project and go to the project directory, run the following commands:

~~~bash
npm create vite@latest react-gantt-quick-start -- --template react-ts
cd react-gantt-quick-start
~~~

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

## Adding demo data

We'll use static data for this example. Create a file named `src/demoData.ts`.

When typing initial data, you can use `SerializedTask` for tasks and `SerializedLink` for links. These types accept string dates and don't include Gantt's internal `$`-prefixed properties, making them ideal for data you define outside of Gantt (state stores, API responses, seed files):

~~~ts
import type { Task, Link } from '@dhtmlx/trial-react-gantt';

export const tasks: Task[] = [
  { id: 1, text: "Office itinerancy", type: "project", start_date: new Date(2025, 3, 2), duration: 17, progress: 0.4, parent: 0, open: true },
  ...
];

export const links: Link[] = [
  { id: 2, source: 2, target: 3, type: "0" },
  ...
];
~~~

## Creating a Gantt component

To add a Gantt component, create an `src/components/Gantt/Gantt.tsx` file with the following content:

~~~tsx
import Gantt, {
  ReactGanttRef,
  Task,
  Link,
  GanttConfig
} from '@dhtmlx/trial-react-gantt';

import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
import { useRef } from 'react';

export interface GanttProps {
  tasks: Task[];
  links: Link[];
}

export default function GanttChart({ tasks, links }: GanttProps) {
  const ganttRef = useRef<ReactGanttRef>(null);

  const config: GanttConfig = {
    grid_width: 500,
    scale_height: 90,
    scales: [
      { unit: "year", step: 1, date: "%Y" },
      { unit: "month", step: 1, date: "%M" },
      { unit: "day", step: 1, date: "%d %M" }
    ]
  };

  return (
    <Gantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
      config={config}
      data={{
        save: (entity, action, data, id) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        }
      }}
    />
  );
}
~~~


## Rendering Gantt in the App

To display Gantt, replace the code of `src/App.tsx` with the following one:

~~~tsx
import GanttChart from './components/Gantt/Gantt';
import { tasks, links } from './demoData';

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <GanttChart tasks={tasks} links={links} />
    </div>
  );
}
~~~

After that, run the app using the command below:

~~~bash
npm run dev
~~~

At this point, you have a **fully working React + DHTMLX Gantt application**.

This setup represents the **minimum configuration** needed to:

- render a Gantt chart
- display tasks and links
- apply a basic scale configuration
- attach the Gantt instance via a React ref
- receive events through the `data.save` callback

This is the same minimal example used in the [GitHub demo project](https://github.com/dhtmlx/react-gantt-quick-start).

From here, you can continue by adding more advanced features:

- syncing data with React state
- loading/saving data from your backend
- adding templates and custom renderers
- enabling plugins (auto-scheduling, critical path)
- adding resources, calendars, or grouping

The next sections introduce these capabilities one by one.


## Using React state as the source of truth 
_(recommended for most React apps)_

In real applications tasks and links usually come from the React state. 
Below is a complete example where Gantt **sends changes back to React** via the `data.save` callback.

~~~tsx
import { useState } from "react";
import Gantt from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";
import { tasks as initialTasks, links as initialLinks } from "./demoData";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [links, setLinks] = useState(initialLinks);

  return (
    <div style={{ height: "100vh" }}>
      <Gantt
        tasks={tasks}
        links={links}
        data={{
          save: (entity, action, item, id) => {
            if (entity === "task") {
              if (action === "create") setTasks(tasks => [...tasks, item]);
              if (action === "update") setTasks(tasks => tasks.map(x => x.id === id ? item : x));
              if (action === "delete") setTasks(tasks => tasks.filter(x => x.id !== id));
            }
            if (entity === "link") {
              if (action === "create") setLinks(links => [...links, item]);
              if (action === "update") setLinks(links => links.map(x => x.id === id ? item : x));
              if (action === "delete") setLinks(links => links.filter(x => x.id !== id));
            }
          }
        }}
      />
    </div>
  );
}
~~~

### Why choose this mode

- React always sees the same data as the Gantt UI  
- Works perfectly with Redux / Zustand / Jotai / MobX  
- Easy to sync with backend APIs


## Alternative Mode: Gantt as the source of truth 
_(useful for very large datasets or heavy auto-scheduling)_

In this mode React does not own tasks/links.

~~~tsx
<Gantt
  data={{
    load: "/api/gantt-data",
    save: "/api/gantt-data"
  }}
/>
~~~

### When to prefer this mode

- Tens of thousands of tasks  
- Many auto-scheduling updates  
- You want minimal React rendering overhead  


## Using Templates 
_(return React elements from template functions)_

Templates allow customizing almost every part of the chart.

~~~tsx
const templates = {
  task_text: (start, end, task) => (
    <span style={{ color: "red" }}>#{task.id}: {task.text}</span>
  )
};

<Gantt templates={templates} />
~~~

### More details

See the full section here: [React Gantt Templates Documentation](integrations/react/configuration-props.md).


## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/dhtmlx/react-gantt-quick-start).

## Next steps

- Study all the available [React Gantt props](integrations/react/configuration-props.md)
- Explore advanced Gantt features in the [Guides](guides.md)
