---
title: Data Binding & Management Basics in React Gantt
sidebar_label: Basics
description: "Overview of the two data binding models in React Gantt and the baseline pattern for using React state as the source of truth before integrating Redux, Zustand, MobX, Jotai, XState, or Valtio."
---

# Data Binding & State Management in React Gantt

React Gantt supports **two data binding patterns**:

1. **React state as the source of truth** - _recommended for most React apps_.
2. **Gantt as the source of truth** - _useful for specialized cases_.

Both approaches are valid, but you should pick one and follow it consistently to avoid unexpected behavior.

This article explains both modes and shows basic examples of each.

If you haven't rendered a basic chart yet, start from the [Quick Start](integrations/react/quick-start.md).

## Data Models

### React state as the source of truth (recommended)

In this model:

- you keep `tasks`, `links`, `resources`, `resourceAssignments` in React state or a state library
- you pass them to `<Gantt>` as props
- when a user changes something, ReactGantt calls your `data.save` or `data.batchSave` callback
- you update React state -> React re-renders -> ReactGantt re-reads the new props.

This is the right choice in case your page has other React UI that must see the same data as Gantt and when your application has additional React components or uses a state manager that relies on the same data.

However, it will require more frequent re-parsing or re-rendering of the Gantt.

### Gantt as the source of truth

In this approach, you treat ReactGantt and your backend as the main owner of the data:

- ReactGantt loads the initial dataset via `data.load`, or via props, or via an imperative API call
- ReactGantt applies user changes internally and/or sends them to the server
- you **do not** keep a mirrored copy of all tasks/links in React state that is constantly fed back into props.

The key difference is the absence of a full loop - user changes do not update the React state and React does not re-apply updated props after each change.

This model is useful when datasets are very large as it reduces the overhead of constantly updating React state when Gantt data changes and simplifies large-batch operations (like auto-scheduling) without repeated re-renders.

On the other hand, you lose the direct synchronization between Gantt data and your React state. And if you do store tasks/links in a React state,
you need to be sure not to unintentionally overwrite Gantt's internal state.

## React state as the source of truth {#reactstateasthesourceoftruth}

In this pattern, you hold all core collections in state and pass them as props (`tasks`, `links`, `resources`, `resourceAssignments`). Whenever the user modifies tasks or links inside the Gantt (for example, by creating or deleting a task), the Gantt triggers a callback. In this callback, you update your React state with the new or removed data. Once the state is updated, React re-renders the **ReactGantt** component, which in turn reads the updated props from the latest state.

When typing your state, use `SerializedTask` for tasks and `SerializedLink` for links. These types represent the user-facing data shape — date fields accept `Date | string`, and there are no internal `$`-prefixed properties. Use `Task` and `Link` only when working with data inside Gantt event handlers, where Gantt has already parsed the data.

### Minimal example with React state

~~~tsx
import { useState } from 'react';
import Gantt, {
  Task,
  Link
} from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

import { demoData } from "./demoData";

export default function ReactStateGantt() {
  const [tasks, setTasks] = useState<Task[]>(demoData.tasks);
  const [links, setLinks] = useState<Link[]>(demoData.links);


  return (
    <div style={{ height: "100vh" }}>
      <Gantt
        tasks={tasks}
        links={links}
        data={{
          save: (entity, action, item, id) => {
            // Update React state here (see below for patterns)
            console.log("Change:", { entity, action, id, item });
          },
        }}
      />
    </div>
  );
}

~~~

This gives you a basic starting point - React controls what is rendered via props, Gantt reports changes via `save` callback and makes React the authoritative owner of the data.

The next sections show the typical patterns you implement inside that callback.

## Handling changes with `data.save` {#handlingchangeswithdatasave}

When you provide `data.save`, ReactGantt calls it for **every change** the user makes:

~~~ts
(entity: string, action: string, item: any, id: string|number) => {...}
~~~

Where:
 
- `entity` is `"task" | "link" | "resource" | "resourceAssignment"`
- `action` is `"create" | "update" | "delete"`
- `item` is the created/updated/deleted object
- `id` is the object id

Here is a simple example that updates React state directly:

~~~tsx
function handleSave(entity, action, item, id) {
  if (entity === "task") {
    setTasks((prev) => {
      if (action === "create") return [...prev, item];
      if (action === "update") return prev.map((t) => (t.id === id ? item : t));
      if (action === "delete") return prev.filter((t) => t.id !== id);
      return prev;
    });
  }

  if (entity === "link") {
    setLinks((prev) => {
      if (action === "create") return [...prev, item];
      if (action === "update") return prev.map((l) => (l.id === id ? item : l));
      if (action === "delete") return prev.filter((l) => l.id !== id);
      return prev;
    });
  }

  // You can apply the same idea for resources / assignments if needed
}
~~~

In a real application you almost never keep this logic inline:

- in Redux Toolkit this becomes a reducer or thunk
- in Zustand/Jotai/MobX/Valtio it lives in the store
- for server integration you can also call your API from here.

The state-management tutorials are built on this pattern, this example just demonstrates the starting point.

## Bulk updates with `data.batchSave`

`data.save` is the most convenient entry point for capturing user changes, but it has one drawback - Auto Scheduling, as drag-shifting many tasks or other heavy operations on large projects can generate hundreds or even thousands of changes. 

If you anticipate this is going to be the case for your application, you can switch to **batch mode** by providing `data.batchSave` instead of `data.save`. In this mode, ReactGantt will provide you with grouped changes:

~~~ts
type GanttBatchChanges = {
  tasks?: Array<DataCallbackChange<Task>>;
  links?: Array<DataCallbackChange<Link>>;
  resources?: Array<DataCallbackChange<Resource>>;
  resourceAssignments?: Array<DataCallbackChange<ResourceAssignment>>;
};

interface DataCallbackChange<T> {
  entity: string;
  action: string;
  data: T;
  id: number | string;
}

~~~

Here is a minimal usage example:

~~~tsx
<ReactGantt
  // ...props with tasks/links/resources etc.
  data={{
    batchSave: (changes) => {
      console.log("Batch changes:", changes);

      if (changes.tasks) {
        setTasks((prev) => applyTaskBatch(prev, changes.tasks));
      }

      if (changes.links) {
        setLinks((prev) => applyLinkBatch(prev, changes.links));
      }

      // Same for resources / assignments if required
    },
  }}
/>

~~~

Where `applyTaskBatch`/`applyLinkBatch` are small helpers that loop over `{ action, data, id }` and return the updated array.

As a rule of thumb,
- Use `batchSave` when you expect a lot of changes at once, and/or you want to send all changes to the backend in a single request
- Use `save` when most edits are single tasks/links, and/or you want the simplest possible integration

## Loading data into React state

In the React-driven model, Gantt receives its data through React state. Where that state *comes from* is entirely up to your application architecture.

There are three common ways developers populate their state: 

- [Local component state](#localstate)
- [State Managers (Redux Toolkit, Zustand, MobX, Jotai, XState, Valtio)](#statemanagers)
- [Loading data from an API](#loadingfromapi)

### Local component state {#localstate}

This is useful for quick demos, prototypes, or small applications.

Data often comes from a local seeder file, but it can also be computed or derived.

~~~jsx
export default function GanttTemplatesDemo() {
  const [tasks, setTasks] = useState(projectData.tasks);
  const [links, setLinks] = useState(projectData.links);
  const [resources, setResources] = useState(projectData.resources);
  const [resourceAssignments, setResourceAssignments] = 
      useState(projectData.resourceAssignments);

  return (
    <div style={{height: '100vh'}}>
      <ReactGantt
        tasks={tasks}
        links={links}
        resources={resources}
        resourceAssignments={resourceAssignments}
      />
    </div>
  );
};
~~~

This pattern is very similar to using a state manager - the only difference is where the state lives.


### State Managers (Redux Toolkit, Zustand, MobX, Jotai, XState, Valtio) {#statemanagers}

In many production apps, Gantt data lives in a global store rather than inside a component.

ReactGantt integrates naturally with these libraries. You read data from the store via selectors or store hooks and pass it to `<Gantt>` as props, exactly the same way you would with the local state.

Here are a few illustrations of what this typically looks like.

**Redux Toolkit**

~~~ts
const { tasks, links } = useSelector((state: RootState) => state.gantt);
~~~

**Zustand**

~~~ts
const tasks = useGanttStore((state) => state.tasks);
~~~

**MobX**

~~~tsx
<Gantt tasks={store.tasks} links={store.links} />
~~~

Although each library has its own API, the integration pattern is identical - you supply `tasks`, `links`, `resources`, etc. as props, you handle user updates through `data.save` or `data.batchSave`, the only difference is where the state originates.

The state-manager tutorials demonstrate how to implement the same pattern in each specific library:

- [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Using React Gantt with Zustand](integrations/react/state/zustand.md)
- [Using React Gantt with MobX](integrations/react/state/mobx.md)
- [Using React Gantt with XState](integrations/react/state/xstate.md)
- [Using React Gantt with Jotai](integrations/react/state/jotai.md)
- [Using React Gantt with Valtio](integrations/react/state/valtio.md)


### Loading data from an API {#loadingfromapi}

In real applications, you usually load data from a backend and place it into React state (local or global).

Below is a more complete example that mirrors typical usage:

~~~tsx
import { useEffect, useState } from "react";
import Gantt, {
  Task,
  Link,
  Resource,
  ResourceAssignment,
  Calendar,
} from "@dhtmlx/trial-react-gantt";

interface GanttData {
  tasks: Task[];
  links: Link[];
  resources: Resource[];
  resourceAssignments: ResourceAssignment[];
}

export default function GanttWithApi() {
  const [data, setData] = useState<GanttData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/gantt-data");
        const raw = await response.json();

        const nextData: GanttData = {
          tasks: raw.tasks,
          links: raw.links,
          resources: raw.resources ?? [],
          resourceAssignments: raw.resourceAssignments ?? []
        };

        setData(nextData);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  if (isLoading || !data) {
    return <div>Loading Gantt...</div>;
  }

  return (
    <ReactGantt
      tasks={data.tasks}
      links={data.links}
      resources={data.resources}
      resourceAssignments={data.resourceAssignments}
      data={{
        save: (entity, action, item, id) => {
          // Update state and sync with backend here
        },
      }}
    />
  );
}
~~~

This approach integrates cleanly with state managers:

- load data in an effect or thunk,
- store it in Redux/Zustand/MobX/etc.,
- pass it to `<Gantt>` via props,
- handle updates with `save`/`batchSave`.

## Gantt as the source of truth in a React app {#ganttasthesourceoftruth}

The second binding mode is **Gantt as the source of truth** where Gantt (and optionally your backend) is treated as the primary data holder.

React renders the component but does **not** maintain tasks/links/resources as a canonical state that must flow into props after every update.

This model removes the `React state <-> Gantt` loop entirely.

### When this model makes sense

Use **Gantt as the source of truth** when

- datasets are very large (thousands of tasks)
- auto-scheduling or mass updates happen frequently
- React does not need to react to every single update in real time
- the page is primarily "Gantt-centric"

React remains responsible for layout, routing, and surrounding UI, but Gantt owns the data life cycle.

### Providing initial data 

Even in this model, you may still give Gantt an initial dataset.
The key difference is that you do not continuously reflect changes back into React state.

You can initialize Gantt using any of the following approaches: loading data via URLs, loading data via custom functions, passing an initial snapshot via props. Check the details below.

#### Loading data via URLs

Gantt can load everything directly from your backend using REST endpoints:


~~~tsx
<Gantt
  data={{
    load: "/api/gantt/load",
    save: "/api/gantt/save",
  }}
/>
~~~

- `data.load` is called once on initialization
- `data.save` is triggered whenever the user modifies tasks/links.

#### Loading data via custom functions

Instead of URLs, you can provide async functions:

~~~tsx
<Gantt
  data={{
    load: async () => {
      const res = await fetch("/api/gantt/load");
      return res.json();
    },
    save: async (entity, action, item, id) => {
      // see the example below
    },
  }}
/>
~~~

#### Passing an initial snapshot via props (one-way)

You can still provide initial data via props:

~~~tsx
<Gantt tasks={initialTasks} links={initialLinks} />
~~~

In this case, the props are simply a starting point. After initialization, Gantt maintains its own internal store and continues from there. You do not re-feed new arrays into props after every edit, because React is not considered the canonical owner of the data in this model.

### How updates work

Whenever users create, edit, or delete data, Gantt triggers the `save` (or `batchSave`) callback.

Gantt initially assigns temporary IDs to created records. The backend must replace them with the real database IDs.

This logic reflects how the DataProcessor module behaves in the JS Gantt (see [Server-Side Integration](guides/server-side.md) in JS Docs).

When a new task, link, resource, or assignment is created, the `save` call must return a Promise that resolves to:

~~~json
{ "id": "<database id>"}
~~~


For example:

~~~ts
data.save = async (entity, action, item, id) => {
  if (action === "create") {
    const response = await fetch(`/api/${entity}`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json(); 
    // result should contain { id: newDatabaseId }
    return { id: result.id };
  }

  if (action === "update") {
    await fetch(`/api/${entity}/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" }
    });
    return {};
  }

  if (action === "delete") {
    await fetch(`/api/${entity}/${id}`, { method: "DELETE" });
    return {};
  }
};
~~~

Returning `{id: newId}` allows Gantt to replace the temporary ID with the permanent one.
This ensures that subsequent update/delete operations target the correct record in your database.

#### Using `batchSave`

`batchSave` groups multiple changes into a single callback.
As several new records may appear together, Gantt does not expect `batchSave` to return anything.

When using `batchSave` you must create new records on the backend and obtain their permanent IDs and update Gantt using imperative API calls to replace temporary IDs:

~~~ts
gantt.changeTaskId(tempId, realId);
gantt.changeLinkId(tempId, realId);
~~~

## What's next

Once you're clear on the two data models you can move on to the specific tutorials.

State managers:

- [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Using React Gantt with Zustand](integrations/react/state/zustand.md)
- [Using React Gantt with MobX](integrations/react/state/mobx.md)
- [Using React Gantt with XState](integrations/react/state/xstate.md)
- [Using React Gantt with Jotai](integrations/react/state/jotai.md)
- [Using React Gantt with Valtio](integrations/react/state/valtio.md)

Or learn more about usage of imperative API and server-side communication:

- [React Gantt Configuration](integrations/react/configuration-props.md)
- [Server-Side Integration](guides/server-side.md)
