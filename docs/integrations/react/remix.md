---
title: React Gantt with Remix
sidebar_label: Remix

---

# React Gantt with Remix

**Remix Quick Start**

You should be familiar with the basic concepts of [React](https://react.dev/) and [Remix](https://remix.run/). If not, refer to their official documentation before starting this guide.

In this tutorial, we will create a simple Remix application and render a Gantt chart on a page.

## Creating a project

Before creating a new project, make sure you have [Node.js](https://nodejs.org/) installed.

Since Remix now ships as part of **React Router v7**, the recommended way to scaffold a project is:

~~~bash
npx create-react-router@latest
~~~

When prompted, choose:
- Project name: **react-gantt-remix-quick-start**
- Use the default template (React, TypeScript, TailwindCSS, SSR)
- **Install dependencies**: Yes

Then navigate into your project folder:

~~~bash
cd react-gantt-remix-quick-start
~~~

And start the development server:

~~~bash
npm run dev
~~~

Your application will be available at `http://localhost:5173`.

## Step 1. Installing the React Gantt package

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

After installation, we can prepare our data and component.

## Step 2. Preparing demo data

Inside the  `app/` folder, create a new `data/` directory and add the `demoData.ts` file with the initial dataset:

~~~ts title="data/demoData.ts"
import type { Task, Link } from '@dhtmlx/trial-react-gantt';

export const tasks: Task[] = [
  { id: 1, text: "Office itinerancy", type: "project", start_date: new Date(2025, 3, 2), duration: 17, progress: 0.4, parent: 0, open: true },
  { id: 2, text: "Office facing", type: "project", start_date: new Date(2025, 3, 2), duration: 8, progress: 0.6, parent: 1, open: true },
  { id: 3, text: "Furniture installation", type: "project", start_date: new Date(2025, 3, 11), duration: 8, progress: 0.6, parent: 1, open: true },
  // ...
];

export const links: Link[] = [
  { id: 2, source: 2, target: 3, type: "0" },
  { id: 3, source: 3, target: 4, type: "0" },
  // ...
];
~~~

This data will be passed into our Gantt component.

### Step 3. Creating the Gantt component

Remix allows using client-side components via the standard React architecture. We will create a dedicated component to render the Gantt chart.

Create the `app/components/Gantt/` folder. Inside it, create the `Gantt.tsx` file. Open the newly created file and insert the following code:

~~~tsx title="app/components/Gantt/Gantt.tsx"
import { useMemo, useRef } from 'react';
import Gantt, { type ReactGanttRef, type Task, type Link, type GanttConfig } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';


export interface GanttProps {
  tasks: Task[];
  links: Link[];
}


export default function GanttChart({ tasks, links }: GanttProps) {
  const ganttRef = useRef<ReactGanttRef>(null);


  const config: GanttConfig = useMemo(
    () => ({
      grid_width: 500,
      scale_height: 90,
      scales: [
        { unit: 'year', step: 1, date: '%Y' },
        { unit: 'month', step: 1, date: '%M' },
        { unit: 'day', step: 1, date: '%d %M' },
      ],
    }),
    []
  );


  return (
    <Gantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
      config={config}
      data={{
        save: (entity: string, action: string, data: Task | Link, id: string | number) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        },
      }}
    />
  );
}
~~~


This component initializes the Gantt chart and provides it with configuration, initial data, and a `ref` for future API calls. The `config` object defines the layout and scales, while `tasks` and `links` props supply the chart with its dataset.

The `save` function inside the `data` prop is used to track updates made to tasks and links inside the Gantt. In this tutorial we add a simple placeholder handler for tracking changes. If you want to send updates to a backend or bind them to React state, you can follow the official data-binding [guide](integrations/react.md#bindingdata).


## Step 4. Rendering Gantt on a Remix route

Open the main page route - `app/routes/home.tsx`.
Replace its content with the following:

~~~tsx title="app/routes/home.tsx"
import GanttChart from '~/components/Gantt/Gantt';
import type { Route } from './+types/home';
import { tasks, links } from '~/data/demoData';


export function meta({}: Route.MetaArgs) {
  return [
    { title: 'DHTMLX React Gantt | Remix (React Router) Quick Start' },
    { name: 'description', content: 'DHTMLX React Gantt | Remix (React Router) Quick Start' },
  ];
}


export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GanttChart tasks={tasks} links={links} />
    </div>
  );
}
~~~

Now the Gantt chart will be displayed at the `/` route.

## Step 5. Starting the application

Run the development server:

~~~bash
npm run dev
~~~

Then open `http://localhost:5173` in your browser. You should now see a working Gantt chart with the sample dataset.

## Summary

You have created a minimal Remix application with DHTMLX React Gantt, added demo data, and rendered a fully interactive Gantt chart. This is a minimal setup required to get started, and it mirrors what you will use in production environments.

## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/dhtmlx/react-gantt-remix-starter).

From here, you can continue exploring:

- [React-driven data flow](integrations/react.md#bindingdata).
- [React Gantt Templates Documentation](integrations/react/configuration-props.md).
