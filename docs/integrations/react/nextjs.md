---
title: React Gantt with Next.js
sidebar_label: Next.js

---

React Gantt with Next.js
===============

**Next.js Quick Start**

You should be familiar with the basic concepts of [React](https://react.dev/) and [Next.js](https://nextjs.org/docs). If not, refer to their official documentation before starting this guide.

DHTMLX React Gantt is fully compatible with Next.js. In this tutorial we will create a simple Next.js application and render a Gantt chart on a page.

## Creating a project

Before creating a new project, install [Node.js](https://nodejs.org/).

To scaffold a Next.js application, run:

~~~bash
npx create-next-app@latest
~~~

When prompted, choose:
- Project name: **react-gantt-nextjs-quick-start**
- Use the default template (TypeScript, ESLint, Tailwind CSS, App Router, Turbopack)

Next.js will create the project structure and install the basic dependencies.

After installation, navigate into the project directory:

~~~bash
cd react-gantt-nextjs-quick-start
~~~


## Step 1. Installing the React Gantt package

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

After installation, we can set up the data and create the Gantt component.

## Step 2. Preparing demo data

Create a `data/` folder at the project root. Inside it, add a `demoData.ts` file containing the initial tasks and links:

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


### Step 3. Creating the Gantt component

Next.js uses Server Components by default, but React Gantt should be rendered inside a Client Component in most practical cases.

This is required whenever you:

- use `ref` to access the Gantt instance
- pass callbacks (events, templates, data handlers)
- use ReactGantt `hooks`
- provide dynamic config or React elements

Therefore, our Gantt component will begin with "use client".

Create a new file at `components/Gantt/Gantt.tsx`

~~~tsx title="components/Gantt/Gantt.tsx"
"use client";

import { useRef } from "react";
import Gantt, { ReactGanttRef, Task, Link, GanttConfig } from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

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


This component initializes the Gantt chart and provides it with configuration, initial data, and a `ref` for future API calls. The `config` object defines the layout and scales, while `tasks` and `links` props supply the chart with its dataset.

The `save` function inside the `data` prop is used to track updates made to tasks and links inside the Gantt. In this tutorial we add a simple placeholder handler for tracking changes. If you want to send updates to a backend or bind them to React state, you can follow the official data-binding [guide](integrations/react.md#bindingdata).


## Step 4. Adding Gantt to the page

Open `app/page.tsx` and render the Gantt chart on the main page:

~~~tsx title="app/page.tsx"
import Gantt from "../components/Gantt/Gantt";
import { tasks, links } from "../data/demoData";

export default function HomePage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Gantt tasks={tasks} links={links} />
    </div>
  );
}
~~~

Now the page will display a full-screen Gantt chart.

## Step 5. Starting the application

Run the development server:

~~~bash
npm run dev
~~~

Then open `http://localhost:3000` in your browser. You should now see a working Gantt chart rendered using React Gantt inside a Next.js application.

## Summary

You have created a minimal Next.js project with DHTMLX React Gantt, added demo data, and rendered a fully interactive Gantt chart. This is a minimal setup required to get started, and it mirrors what you will use in production environments.

## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/dhtmlx/react-gantt-nextjs-starter).

From here, you can continue exploring:

- [React-driven data flow](integrations/react.md#bindingdata).
- [React Gantt Templates Documentation](integrations/react/configuration-props.md).
