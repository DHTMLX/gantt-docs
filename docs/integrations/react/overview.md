---
title: React Gantt Overview
sidebar_label: Overview
description: "Overview of the official React wrapper: features, props, theming, events, and access the underlying Gantt API"

---

# React Gantt Overview

:::note
React Gantt is available under [Commercial, Enterprise and Ultimate licenses](https://dhtmlx.com/docs/products/licenses.shtml).
If you're using Individual or GPL editions of Gantt, please refer to the [How to Start](integrations/react/js-gantt-react.md) article for React.
:::

## Overview

DHTMLX Gantt is a pure JS component that can work in any browser environment. The Commercial and higher editions of Gantt include a **React Gantt** component that encapsulates DHTMLX Gantt and allows you to use it natively with React.

The wrapper lets you create a fully functional Gantt chart in your React applications using the familiar props/state model. Under the hood, it manages a standard DHTMLX Gantt instance, translating your React props (such as tasks and config) into the corresponding Gantt initialization and data structures.

**Key features**

- Declarative data handling: Pass an array of tasks, links, resources, etc. as props.
- Configurable: Map React props to the underlying *gantt.config*, *gantt.templates*, *gantt.plugins*, etc.
- Access to the full Gantt API: Use a ref to call methods like [getTask](api/method/gettask.md), [updateTask](api/method/updatetask.md), or [addTaskLayer](api/method/addtasklayer.md).
- Easy customization: Use React components for templates, lightbox forms, or inline editors.

If you're new to DHTMLX Gantt, see the [DHTMLX Gantt documentation](guides.md) for an overview of features like [Work Time Calculation](guides/working-time.md), [Auto Scheduling](guides/auto-scheduling.md), [Resource Management](guides/resource-management.md), and more.

## Installation and NPM Access

For up-to-date installation instructions for both the Evaluation and Professional builds, including npm registry configuration and offline examples, see the [Installation Guide](integrations/react/installation.md).

Once you have installed the package, you can import the wrapper in your React code as follows:

~~~ts
// Evaluation build (public npm)
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

// Professional build (private npm)
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
~~~

## Version Requirements

- React `v18.0.0` or newer

## Basic Usage

Here is a minimal snippet showing how to import and render the Gantt chart:

~~~jsx
import { useState } from 'react';
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
import { demoData } from './DemoData'

export default function BasicGantt() {
  const [theme, setTheme] = useState("terrace");
  const [tasks, setTasks] = useState(demoData.tasks);
  const [links, setLinks] = useState(demoData.links);

  return (
    <div style={ { height: '500px' }}>
      <ReactGantt
        tasks={tasks}
        links={links}
        theme={theme}
      />
    </div>
  );
}
~~~

Note that the above snippet shows how to include the commercial Gantt version. To use the trial code sources, include the package in the following way:

~~~js
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
~~~

Where **demoData** has the following [format](guides/loading.md):

~~~js
export const demoData = {
  tasks: [
    { id: 1, text: "Product Launch", type: "project", open: true, parent: 0},
    { id: 2, text: "Planning Phase", type: "project", open: true, parent: 1},
   	{ id: 3, text: "Requirement Gathering", type: "task", progress: 0.2, 
      start_date: "01-06-2025", duration: 3, parent: 2},
    { id: 4, text: "Technical Feasibility", type: "task", progress: 0.4, 
      start_date: "04-06-2025", duration: 2, parent: 2},
    { id: 5, text: "Implementation Phase", type: "project", progress: 0.1, 
      open: true, start_date: "08-06-2025", duration: 10, parent: 1},
    { id: 6, text: "Prototype Development", type: "task", progress: 0.0, 
     start_date: "08-06-2025", duration: 4, parent: 5},
    { id: 7, text: "Feature Testing", type: "task", progress: 0.0, 
     start_date: "12-06-2025", duration: 4, parent: 5},
    { id: 8, text: "Go-Live Milestone", type: "milestone", progress: 0, 
     start_date: "18-06-2025", duration: 0, parent: 1}
  ],
  links: [
    { id: 1, source: 3, target: 4, type: "0" },
    { id: 2, source: 4, target: 5, type: "0" },
    { id: 3, source: 6, target: 7, type: "0" },
    { id: 4, source: 7, target: 8, type: "0" }
  ]
};
export {demoData};
~~~

**Related article**: [dhtmlxReactGantt and Firebase Integration](integrations/react/firebase-integration.md)

## Binding Data {#bindingdata}

The **React Gantt** wrapper offers flexible ways of loading and saving data. Conceptually, there are two primary approaches to manage changes in your Gantt data:

- **React (or a state manager) as the source of truth**
- **Gantt as the source of truth**

Either approach is valid, but you should pick one and follow it consistently to avoid unexpected behavior.

:::info Looking for a deeper explanation?

This section gives a high-level overview of the two binding models.
For a more detailed guide, including full examples, see [](integrations/react/state/state-management-basics.md).
:::

### React (or a state manager) as the source of truth

In this pattern, **ReactGantt** receives all task/link data via props (from `useState`, Redux, Zustand, etc.). Whenever the user modifies tasks or links in the chart, Gantt calls the `data.save` callback. In that callback, you update your application state. When the state changes, React re-renders **ReactGantt**, and the Gantt instance is synchronized with the latest data.

~~~tsx
import { useMemo, useState } from 'react';
import ReactGantt, { type Task, type Link } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

export function MyGanttApp({ initialTasks, initialLinks }: {
  initialTasks: Task[];
  initialLinks: Link[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const data = useMemo(
    () => ({
      save: (entity: string, action: string, item: any, id: string | number) => {
        if (entity === 'task') {
          setTasks((prev) => {
            if (action === 'create') return [...prev, item as Task];
            if (action === 'update') return prev.map((task) =>
              task.id === id ? (item as Task) : task
            );
            if (action === 'delete') return prev.filter((task) => task.id !== id);
            return prev;
          });
        }

        if (entity === 'link') {
          setLinks((prev) => {
            if (action === 'create') return [...prev, item as Link];
            if (action === 'update') return prev.map((link) =>
              link.id === id ? (item as Link) : link
            );
            if (action === 'delete') return prev.filter((link) => link.id !== id);
            return prev;
          });
        }
      },
    }),
    []
  );

  return (
    <ReactGantt
      tasks={tasks}
      links={links}
      data={data}
    />
  );
}
~~~

This approach makes your React (or global) state the single source of truth. It works naturally with state managers such as Redux Toolkit, Zustand, MobX, Jotai, XState, or Valtio - you simply replace `useState` with your store hooks/selectors and move the update logic into the store.

For more examples (including integrations with specific managers) see [React state as the source of truth](integrations/react/state/state-management-basics.md#reactstateasthesourceoftruth).

### Gantt as the source of truth

In this approach, **Gantt itself** keeps the authoritative copy of the data. You still initialize or load tasks and links (via props or URLs), but once the chart is running, Gantt handles changes internally and forwards updates to your backend or a custom handler, without going through React state on every edit.

~~~tsx
import ReactGantt from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

export function GanttTransportExample() {
  return (
    <ReactGantt
      data={{
        load: '/api/gantt/data',  // Gantt loads tasks/links from this endpoint
        save: '/api/gantt/data',  // Gantt sends changes back here
      }}
    />
  );
}
~~~

In this mode:

- the local Gantt instance remains the primary holder of the current data
- React doesn't re-render on every task/link change
- bulk operations like Auto Scheduling are cheaper, because they don't trigger repeated React updates.

If you still keep some representation of tasks/links in React state, be careful not to overwrite Gantt's internal state with stale data.

For more details see [Gantt as the source of truth](integrations/react/state/state-management-basics.md#ganttasthesourceoftruth).

## Configuration & Props

The React wrapper accepts the `config` prop (mapped to [gantt.config](api/overview/properties-overview.md)) and the `templates` prop (mapped to [gantt.templates](api/overview/templates-overview.md)).


~~~js
<ReactGantt
  tasks={tasks}
  links={links}
  config= {{
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%F, %Y" },
      { unit: "day", step: 1, format: "%d %M" },
    ],
    columns: [
      { name: "text", tree: true, width: "*", resize: true },
      { name: "start_date", align: "center", resize: true },
      { name: "duration", align: "center", resize: true },
      {
        name: "custom",
        align: "center",
        template: (task) => <AlertButton task={task} onClick={handleButtonClick} />,
        resize: true,
      },
      { name: "add", width: 44 },
    ],
  }}
  templates= {{
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
    task_class: (start, end, task) => {
      return task.priority === 'high' ? 'highlight-task' : '';
    },
  }}
/>
~~~

### Using React components in templates 

When specifying templates in props, you can return React elements from your template functions:

~~~js
function PriorityBadge({ priority }) {
  return <span style={{color: 'red' }}>{priority}</span>;
}

<ReactGantt
  templates={{
    task_text: (start, end, task) => {
      return <PriorityBadge priority={task.priority} />;
    }
  }}
/>
~~~

:::note
Internally, DHTMLX Gantt manipulates the DOM in a non-React way. When you return React components from templates, they are embedded into Gantt's HTML via portals. Keep in mind that for large datasets, heavily rendering complex React components may impact performance.
:::

You can override many aspects using templates:

- [task_text](api/template/task_text.md), [task_class](api/template/task_class.md) for the bars
- [formatting the scale](guides/configuring-time-scale.md#dateformat) for timeline headers
- [column templates](guides/specifying-columns.md#datamappingandtemplates) for the left-hand grid cells
- and many more. Please refer to the [available guides](guides.md) on Gantt

You can find the full list of props supported by React Gantt in the following article: [](integrations/react/configuration-props.md)

## Themes & Styling

Gantt is shipped with several built-in themes that can be activated via the **theme** prop and changed dynamically:

~~~jsx
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {
  const [theme, setTheme] = useState("terrace"); 
  const tasks = [...];
  const links = [...];

  const switchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "terrace" ? "dark" : "terrace"));
  };


  return (
    <div style={{height: '600px'}}>
      <div>
        <button onClick={switchTheme}>Switch Theme</button>
      </div>
      <ReactGantt
        tasks={tasks}
        links={links}
        theme={theme}  /*!*/
      />
    </div>
  );
}
~~~

You can find detailed descriptions of the existing themes in [this article](guides/skins.md).

Themes can be additionally customized using custom styles and by overriding CSS variables:

~~~css
:root {
    --dhx-gantt-task-background: #d96c49;
    --dhx-gantt-task-color: #fff;
    --dhx-gantt-task-border-radius: 8px;
}
~~~

For additional configuration, please check the [Skins Customization](guides/custom-skins.md) guide.

## Replacing the Lightbox

DHTMLX Gantt comes with a built-in configurable task editor called [Lightbox](guides/default-edit-form.md).

If needed, you can replace it with a React-based modal or any other component in one of the following ways:

### By providing a custom component via the `customLightbox` prop

To do so, pass a component through the **customLightbox** prop:

~~~js
import React, { useState } from 'react';

export interface CustomLightboxProps {
  data: any;
  onSave: (task: any) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const CustomLightbox: React.FC<CustomLightboxProps> = ({
  data,
  onSave,
  onCancel,
  onDelete
}) => {
  const [description, setDescription] = useState<string>(data.text || '');

  const handleSaveClick = () => {
    onSave({ ...data, text: description });
  };

  const modalStyles = {
   ...
  };

  return (
    <div>
      <div style={modalStyles.overlay} onClick={onCancel} />
      <div style={modalStyles.content}>
        <h3>Edit Task</h3>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{width: '100%', padding: '8px', marginTop: '10px' }}
          />
        </div>
        <div style={modalStyles.buttonGroup}>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CustomLightbox;
~~~

After that, you can use the added component in the following way:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
import CustomLightbox from "./EditorModal";

export default function BasicInitDemo() {
  const ganttRef = useRef(null);

  const tasks = [...];
  const links = [...];

  useEffect(() => {
    //const gantt = ganttRef.current?.instance;
    
  }, []);

  return (
    <ReactGantt 
      ref={ganttRef}
      tasks={tasks}
      links={links}
      customLightbox={<CustomLightbox />} />
  );
}
~~~

### By using onBeforeLightbox event prop

For more complex scenarios, you can capture the [onBeforeLightbox](api/event/onbeforelightbox.md) event (fired when the Lightbox is invoked) and override the default behavior:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";
import { useNavigate } from 'react-router-dom';


export default function BasicInitDemo() {
  const ganttRef = useRef<any>(null);

  const tasks = [...];
  const links = [...];
  const navigate = useNavigate();

  const handleTaskEdit = (id: any) => {
    const ganttInstance = ganttRef.current?.instance;
    navigate(`/editor/${id}`, { state: { task: ganttInstance.getTask(id) } });
  };

  return (
    <ReactGantt 
      ref={ganttRef}
      tasks={tasks}
      links={links}
      onBeforeLightbox={handleTaskEdit} />
  );
}
~~~

### By using JS Gantt API

Please refer to [Custom Lightbox](guides/custom-edit-form.md) for further details on overriding or extending the built-in Lightbox.

## Replacing built-in Modals

The default UI includes two modal popups:

- the confirm dialog that appears before deleting a task
- the confirm dialog that appears before deleting a link

Both can be overridden using the `modals` prop of ReactGantt:

~~~js
<ReactGantt
  ...
  modals={{
    onBeforeTaskDelete: ({
      task,
      callback,
      ganttInstance,
    }: {
      task: Task;
      callback: () => void;
      ganttInstance: GanttStatic;
    }) => void,
    onBeforeLinkDelete: ({
      link,
      callback,
      ganttInstance,
    }: {
      link: Link;
      callback: () => void;
      ganttInstance: GanttStatic;
    }) => void,
  }}
  ...
/>

~~~

You can use these props to activate your custom modals whenever a confirmation dialog is called by Gantt.
Calling the `callback()` provided in the arguments will finalize the deletion of the appropriate task or link. To cancel the deletion, simply close the modal without calling the callback.

## Using React Components in Grid

### In headers

The **label** property of a grid column can be either a `string` or a `ReactElement`. This lets you embed React-based filters, buttons, or other UI directly in the column header:

~~~js
const config: GanttConfig = {
  columns: [
    { name: "text", label: "Name", tree: true, width: 180, 
        resize: true },
    // Embedding React element directly
    { name: "start_date", label: <DateFilter />, width: 150, 
        align: "center", resize: true },
    // Alternatively, using a function returning a React element:
    { name: "end_date", label: () => <DateFilter />, width: 150, 
        align: "center", resize: true },
    ...
  ],
  row_height: 40,
  grid_width: 550,
};
~~~

When the wrapper detects a React element in a label or any other template property, it will render this element using a React Portal in the grid's header cell.

### In cells

Grid cells are defined by the **template** property of the column. This template function receives a task object and must return either a plain `string` or a `ReactElement`:

~~~jsx
import { useRef } from 'react';

function AlertButton({ task, onClick }) {
  return <button onClick={onClick}>{`Task ID: ${task.id}`}</button>;
}

export default function GanttWithGridCells({ handleButtonClick, ganttRef }) {
  const config = {
    columns: [
      { name: "text", tree: true, width: 180, resize: true },
      { name: "start_date", width: 150, align: "center", resize: true },
      { name: "duration", width: 80, align: "center", resize: true },
      {
        name: "custom",
        align: "center",
        label: <span>My Column</span>,
        width: 140,
        // Returning a React element
        template: (task) => (
          <AlertButton
            task={task}
            onClick={() => {
              handleButtonClick(task);
              // Force re-rendering of the task if needed
              ganttRef.current?.instance.updateTask(task.id);
            }}
          />
        ),
        resize: true,
      },
      { name: "add", width: 44 },
    ],
    row_height: 40,
    grid_width: 550,
  };

  return <ReactGantt ref={ganttRef} config={config} /* ...other props */ />;
}
~~~

By returning a React element from your column template, you can create fully interactive content (buttons, dropdowns, badges, etc.) in each cell of the Gantt grid. Internally, the wrapper will inject those elements via portals into the DOM nodes that Gantt manages.

### In inline editors

DHTMLX Gantt supports [inline editing for grid cells](guides/inline-editing.md). In this React wrapper, you can provide your own custom React editors by specifying an editor object in the **column** config, and then mapping an editor name to a React component in the `inlineEditors` prop. Check the example below.


Define a React-based inline editor component:

~~~jsx
import React, {
    useState,
    forwardRef,
    useImperativeHandle
} from 'react';
import { InlineEditorMethods, InlineEditorProps } from '@dhx/react-gantt';


const MyInlineEditor = forwardRef<InlineEditorMethods, InlineEditorProps>(
    ({ initialValue, task, save, cancel, ganttInstance }, ref) => {
        const [value, setValue] = useState(initialValue || "");

        useImperativeHandle(ref, (): InlineEditorMethods => ({
            getValue: () => value,
            setValue: (val: any) => setValue(val),
            isValid: () => true, 
            focus: () => {

            },
            isChanged: (originalValue: any) => {
                return originalValue !== value;
            },

            save: () => {  }
        }));

        return (
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                autoFocus
            />
        );
    }
);

export default MyInlineEditor;
~~~

Use the custom editor in your Gantt configuration:

~~~jsx
import ReactGantt from "@dhx/react-gantt";
import MyInlineEditor from "./CustomInlineEditor";

function Demo() {
  const config = {
    columns: [
      { name: "text", tree: true, width: 180, resize: true },
      {
        name: "duration",
        width: 80,
        align: "center",
        editor: { type: "customInputEditor", map_to: "text" }, /*!*/
        resize: true
      },
      { name: "start_date", width: 150 },
      { name: "add", width: 44 }
    ]
  };

  return (
    <ReactGantt
      config={config}
      inlineEditors={{
        customInputEditor: MyInlineEditor  /*!*/
      } }
      tasks={[/*...*/]}
      links={[/*...*/]}
    />
  );
}
~~~

When the user double-clicks the column cell, Gantt will display your editor component in place. The wrapper's internal code calls the methods (getValue, setValue, etc.) that you expose via `useImperativeHandle(ref, ...)`, ensuring the Gantt instance stays in sync with the changes in your component.

The value of `type` of the editor object must match the key in `inlineEditors`. 

The `map_to` property specifies the property of the Task object from which the editor will read and write values. Please refer to the article that covers [inline editing](guides/inline-editing.md) for further details.

If you're implementing an editor that makes something more complex than writing a value to a property of a task - you need to implement a required logic in the **save** function and specify the `map_to` option of the input to **"auto"**. In this case, the gantt won't modify the task object, but instead will call the **save** function when it's time to apply the changes made to the editor. The `initialValue` of the editor will be passed as `null`.

:::note
Note, you can define non-React inline editors using the [editor_types](guides/inline-editing.md#custominlineeditor) property of the **config** property.
:::

#### Editor component properties

- <span class="subproperty">**initialValue**</span> - (*any*) - the initial value of the editor
- <span class="subproperty">**task**</span> - (*Task*) - the task that is being edited
- <span class="subproperty">**save**</span> - (*function*) - tells the gantt to save and close the editor
- <span class="subproperty">**cancel**</span> - (*function*) - tells the gantt to close the editor without saving
- <span class="subproperty">**ganttInstance**</span> - (*GanttStatic*) - the current instance of the underlying Gantt object


## Filtering

Use the `filter` prop to specify a filter for the tasks that should be displayed:

~~~jsx
const [filter, setFilter] = useState<((task: Task) => boolean) | null>(null);

function showCompleted() {
  setFilter(() => (task: Task) => task.progress === 1);
}
function resetFilter() {
  setFilter(null);
}

return (
  <ReactGantt
    ...
    filter={filter}
    ...
  />
);

~~~

To filter resources in the [Resource Panel](guides/resource-management.md), use the `resourceFilter` prop:

~~~js
function handleResourceSelectChange(resourceId: string | null) {
  setSelectedResource(resourceId);
  if (resourceId === null) {
    setResourceFilter(null);
  } else {
    setResourceFilter(
      () => (resource: ResourceItem) => String(resource.id) === String(resourceId)
    );
  }
}

return (
  <ReactGantt
    ref={ganttRef}
    tasks={tasks}
    links={links}
    resources={resources}
    resourceFilter={resourceFilter}
    config={config}
    templates={templates}
    plugins={{auto_scheduling: true }}
  />
);

~~~

## Working Calendars

To enable work-time calculations in **ReactGantt**, make sure to enable [work_time](api/config/work_time.md):

~~~js
  const config: GanttConfig = {
    ...
    work_time: true
  };
~~~

Working calendars can be passed to **ReactGantt** through the `calendars` prop:

~~~jsx
const calendars: Calendar[] = [
  {
    id: "global",
    hours: ["8:00-12:00", "13:00-17:00"], // global work hours for weekdays
    days: {
      weekdays: {
        0: false, // 0 = Sunday, 6 = Saturday
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: false
      },
      dates: {
        "2025-04-06": true,  // override work hours for a specific date
        "2025-04-08": false
      }
    }
  }
];

return (
  <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
    <ReactGantt
      ...
      calendars={calendars}
      ...
    />
  </div>
);

~~~

In order to highlight working time in the Gantt Timeline or to perform work-time calculations, you can use the provided `useWorkTime` hook:

~~~jsx
import ReactGantt, { useWorkTime, Calendar } from "@dhx/react-gantt";

export default function GanttTemplatesDemo() {
  const ganttRef = useRef<ReactGanttRef>(null);

  const { isWorkTime } = useWorkTime(ganttRef);
  const templates: GanttTemplates = {
    timeline_cell_class: (task: Task, date: Date) => {
      return isWorkTime({ date, task }) ? "" : "weekend";
    }
  };

  const calendars: Calendar[] = [
    {
      id: "global",
      hours: ["8:00-12:00", "13:00-17:00"], // global work hours for weekdays
      days: {
        weekdays: {
          0: false, // 0 = Sunday, 6 = Saturday
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: false
        },
        dates: {
          "2025-04-06": true,  // override work hours for a specific date
          "2025-04-08": false
        }
      }
    }
  ];

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactGantt
        ...
        calendars={calendars}
        templates={templates}
        config={config}
        ref={ganttRef}
      />
    </div>
  );
};

~~~

Alternatively, you can access the [inner Gantt object](#accessingtheunderlyingganttapi) and use [working time](guides/working-time.md) methods directly.

## Grouping Tasks {#groupingtasks}

Use the `groupTasks` prop to [group tasks](guides/grouping.md) by any of task's properties:

~~~js
  const [grouping, setGrouping] = useState<GroupConfig | boolean>({
    relation_property: 'status',
    groups:[
      {id: 1, name: "New"},
      {id: 2, name: "In Progress"},
      {id: 3, name: "Done"}
    ],
    group_id: "key",
    group_text: "label"
  });

  return (
  <ReactGantt
    ref={ganttRef}
    tasks={tasks}
    links={links}
    groupTasks={grouping}
  />
);
~~~

To disable grouping, set `groupTasks` to `false`:

~~~js
setGrouping(false);
~~~


## Vertical Markers in Timeline Area

[Vertical markers](guides/markers.md) can be added to **ReactGantt** via the `markers` property:

~~~jsx
  const projectStartMarker = {
    id: "marker1",
    start_date: new Date(2025, 3, 2),
    text: "Project start!",
    css: "project-start"
  };
  const projectEndMarker = {
    id: "marker2",
    start_date: new Date(2025, 3, 16),
    text: "Project end",
    css: "project-end"
  };

  const [markers, setMarkers] = useState<Marker[]>([
    projectStartMarker,
    projectEndMarker
  ]);

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactGantt
        ...
        markers={markers}
        ...
      />
    </div>
  );
~~~

:::note
Note, the **text** property of the Marker object accepts either HTML string or React Element
:::

## Accessing the Underlying Gantt API {#accessingtheunderlyingganttapi}

In most cases, ReactGantt props are enough to configure your chart. However, sometimes you'll need direct access to the DHTMLX Gantt API for advanced operations (e.g. worktime calculations, gantt.showDate, gantt.unselectTask, or custom zooming).

### Using built-in hooks

ReactGantt provides ready to use hooks that expose some methods of Gantt API. Please check the related article [](integrations/react/configuration-props.md).

### Using a Ref

For the cases when declarative props and built-in hooks are not enough, the wrapper allows accessing the internal Gantt instance using `ref`:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // here you can call ANY Gantt API method
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
    />
  );
}
~~~


See the DHTMLX Gantt [API Reference](api/overview/methods-overview.md) for the full list of methods.

#### Avoid conflicts with React props

- If you manually call `gantt.parse({ tasks, links })` or `gantt.addTask()` from your code, be aware you may need to keep the React props in sync. Otherwise, the next time React re-renders, it may overwrite your manual changes.
- The recommended approach is to rely on the wrapper's props for tasks and links, or manage them in your React state. Then let the wrapper handle re-parsing.


## Compatibility with SSR Frameworks (Next.js, Remix)

:::note
Starting from ReactGantt v9.0.12 the wrapper is SSR-ready. You can import it in Next.js or Remix without turning SSR off. If you use older versions - you must disable or delay server-side rendering for any route or component that uses ReactGantt.
:::

:::note
During the server rendering, the component outputs only a placeholder `<div>`, the actual Gantt markup is created during the browser-side hydration phase.
:::

#### Next.js

ReactGantt is SSR-compatible, but your own component must be a client component in most real-world scenarios.

You will need to add `"use client"` at the top of your component whenever you use a `ref` to access the Gantt instance, pass event handlers or callbacks, return React elements from templates, 

This is a typical configuration:

~~~jsx
'use client';

import "@dhx/react-gantt/dist/react-gantt.css";
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <ReactGantt tasks={/* ... */} links={/* ... */} />
    </div>
  );
}
~~~

If you use legacy versions (v9.0.11 or older), you need to dynamically import your ReactGantt component with SSR disabled:

~~~jsx
import dynamic from 'next/dynamic';

const GanttDemo = dynamic(() => import('../components/GanttDemo'), {
  ssr: false
});

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <GanttDemo />
    </div>
  );
}
~~~


#### Remix

Starting from v9.0.12, no `<ClientOnly>` wrapper is required:

~~~js

import "@dhx/react-gantt/dist/react-gantt.css";
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {
  return (
    <div style={{ height: '100vh' }}>
      <ReactGantt tasks={/* ... */} links={/* ... */} />
    </div>
  );
}
~~~


If you use legacy versions (v9.0.11 or older), you have to conditionally render the Gantt component only on the client:

~~~jsx
import { ClientOnly } from 'remix-utils/client-only';
import ReactGantt from '@dhx/react-gantt';

export default function GanttPage() {

  return (
    <div style={{height: '100vh' }}>
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => <ReactGantt
          tasks={/* ... */}
          links={/* ... */}
        />}
      </ClientOnly>
    </div>
  );
}
~~~

## Next Steps

- For additional info on how to configure ReactGantt, see [this article](integrations/react/configuration-props.md)
- For advanced use see [DHTMLX Gantt documentation](guides.md) 
