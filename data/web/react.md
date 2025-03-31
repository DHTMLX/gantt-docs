React Gantt
==================

{{note React Gantt is available under [Commercial, Enterprise and Ultimate licenses](https://dhtmlx.com/docs/products/licenses.shtml).
If you're using Individual or GPL editions of Gantt, please refer to [How to Start article](desktop/howtostart_react.md) for React. }}

Overview
--------------------

DHTMLX Gantt is a pure JS component that can work in any browser environment. The Commercial and higher editions of Gantt include a **React Gantt** component that encapsulates DHTMLX Gantt and allows you to use it natively with React.

The wrapper lets you create a fully functional Gantt chart in your React applications using the familiar props/state model. Under the hood, it manages a standard DHTMLX Gantt instance, translating your React props (such as tasks and config) into the corresponding Gantt initialization and data structures.

**Key Features**

- Declarative data handling: Pass an array of tasks, links, resources, etc. as props.
- Configurable: Map React props to the underlying gantt.config, gantt.templates, gantt.plugins, etc.
- Access to Gantt's full API: Use a ref to call methods like api/gantt_gettask.md, api/gantt_updatetask.md, or api/gantt_addtasklayer.md.
- Easy customization: Use React components for templates, lightbox forms, or inline editors.

If you're new to DHTMLX Gantt, see the [DHTMLX Gantt documentation](desktop/guides.md) for an overview of features like desktop/working_time.md, desktop/auto_scheduling.md, desktop/resource_management.md, and more.

Installation and NPM access
-------------------

**Installing the Trial Version of React Gantt Component**

{{note If you want to use the trial version of DHTMLX Gantt, download the trial DHTMLX Gantt package and follow the steps mentioned in the README file. Note that the trial React Gantt component is available for 30 days only.}}

**Installing the PRO Version of React Gantt Component**

{{note If you already own DHTMLX Gantt under a proprietary license, send your license number to contact@dhtmlx.com to receive login credentials for the private npm registry as well as a detailed guide on how to install the React Gantt component. Note that private npm access is available until your proprietary license expires.}}


Version Requirements
--------------------

- React `v18.0.0` or newer

Basic Usage
-------------------

Here is a minimal snippet showing how to import and render the Gantt chart:

~~~js
import { useState } from 'react';
import ReactGantt from '@dhx/gantt-react';
import '@dhx/gantt-react/dist/gantt-react.css';
import { demoData } from './DemoData'

export default function BasicGantt() {
  const [theme, setTheme] = useState("terrace");
  const [tasks, setTasks] = useState(demoData.tasks);
  const [links, setLinks] = useState(demoData.links);

  return (
    <div style={ { height: '500px' } }>
      <ReactGantt
        tasks={tasks}
        links={links}
        skin={theme}
      />
    </div>
  );
}
~~~

Where **demoData** has the following [format](desktop/loading.md):

~~~

const demoData = {
  tasks: [
    { id: 1, text: "Product Launch", type: "project", open: true, parent: 0},
    { id: 2, text: "Planning Phase", type: "project", open: true, parent: 1},
    { id: 3, text: "Requirement Gathering", type: "task", progress: 0.2, 
      start_date: "2025-06-01", duration: 3, parent: 2},
    { id: 4, text: "Technical Feasibility", type: "task", progress: 0.4, 
      start_date: "2025-06-04", duration: 2, parent: 2},
    { id: 5, text: "Implementation Phase", type: "project", progress: 0.1, 
      open: true, start_date: "2025-06-08", duration: 10, parent: 1},
    { id: 6, text: "Prototype Development", type: "task", progress: 0.0, 
     start_date: "2025-06-08", duration: 4, parent: 5},
    { id: 7, text: "Feature Testing", type: "task", progress: 0.0, 
     start_date: "2025-06-12", duration: 4, parent: 5},
    { id: 8, text: "Go-Live Milestone", type: "milestone", progress: 0, 
     start_date: "2025-06-18", duration: 0, parent: 1}
  ],
  links: [
    { id: 1, source: 3, target: 4, type: "0" },
    { id: 2, source: 4, target: 5, type: "0" },
    { id: 3, source: 6, target: 7, type: "0" },
    { id: 4, source: 7, target: 8, type: "0" }
  ]
};
export demoData;
~~~

Binding Data
--------------------

Gantt React Wrapper supports multiple ways of loading and saving data.

#### Using existing data

When the data is available in the code, it can be passed to Gantt using state variables and appropriate props:

~~~js
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

#### Using built-in transport

You can provide a URL from which Gantt will load data and another URL to which Gantt will send updates:

~~~js
import React from 'react';
import ReactGantt from "@dhx/gantt-react";
import "@dhx/gantt-react/dist/gantt-react.css";

export default function BasicInitDemo() {

  const props = {
    data: {
      load: "/api/data",
      save: "/api/data"
    }
  }

  return (
    <ReactGantt ...{props} />
  );
}
~~~

Internally, the **load** URL is passed to the api/gantt_load.md method. The endpoint must return data in the format described in the desktop/loading.md article.

The **save** URL receives updates in the format described in this [article](desktop/server_side.md#technique:~:text=Request%20and%20response%20details).

You can also pass a function callback to the **save** property of the **data**. This function will be called each time Gantt data changes and serves as a routing function for the internal [DataProcessor](desktop/server_side.md#customrouting):

~~~js
import React from 'react';
import ReactGantt from "@dhx/gantt-react";
import "@dhx/gantt-react/dist/gantt-react.css";

export default function BasicInitDemo() {

  const props = {
    data: {
      load: "/api/data",
      save: (entity, action, data, id){
          console.log(`${entity} - ${action} - ${id}`, data);;
      }
    }
  }

  return (
    <ReactGantt ...{props} />
  );
}
~~~

#### Batch saving mode

In previous modes, React Gantt would invoke the callback for each modified entity individually. This behavior mirrors the default approach of the underlying Gantt library. However, in some cases, it can lead to performance issues in React - especially during bulk operations such as Auto Scheduling, which may modify dozens or even hundreds of tasks at once. Recalculating state for each individual update is not an efficient solution in such scenarios.

To address this, React Gantt provides a dedicated data.batchSave handler for bulk operations. This handler is called once with the result of multiple changes performed in the Gantt instance:

~~~

const [tasks, setTasks] = useState(data.tasks);
const [links, setLinks] = useState(data.links);

return <ReactGantt
  ref={ganttRef}
  tasks={tasks}
  links={links}

  data={ {
    batchSave: (updates) => {
      if (updates.task) {
        setTasks(tasks => updateTasks(tasks, updates.task));
      }
      if (updates.link) {
        setLinks(links => updateLinks(links, updates.link));
      }

    }
  } }
/>
~~~

The `updates` object passed to the batchSave callback has the following structure:

~~~js
{
  tasks: DataCallbackChange<Task>[],
  links: DataCallbackChange<Link>[],
  resources: DataCallbackChange<Resource>[],
  resourceAssignments: DataCallbackChange<ResourceAssignment>[],
}

interface DataCallbackChange<T> {
  entity: string;
  action: string;
  data: T;
  id: number | string;
}
~~~

Configuration & Props
-------------------

The React wrapper accepts the `config` prop (mapped to [gantt.config](api/refs/gantt_props.md)) and the `templates` prop (mapped to [gantt.templates](api/refs/gantt_templates.md)).


~~~js

<ReactGantt
  tasks={tasks}
  links={links}
  config= { {
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
  } }
  templates= { {
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
    task_class: (start, end, task) => {
      return task.priority === 'high' ? 'highlight-task' : '';
    },
  } }
/>
~~~

#### Using React Components in Templates 

When specifying templates in props, you can return React elements from your template functions:

~~~js
function PriorityBadge({ priority }) {
  return <span style={ { color: 'red' } }>{priority}</span>;
}

<ReactGantt
  templates={ {
    task_text: (start, end, task) => {
      return <PriorityBadge priority={task.priority} />;
    }
  } }
/>
~~~

{{note Internally, DHTMLX Gantt manipulates the DOM in a non-React way. When you return React components from templates, they are embedded into Gantt's HTML via portals. Keep in mind that for large datasets, heavily rendering complex React components may impact performance.}}

You can override many aspects using templates:

- api/gantt_task_text_template.md, api/gantt_task_class_template.md for the bars
- [formatting the scale](desktop/configuring_time_scale.md#dateformat) for timeline headers
- [column templates](desktop/specifying_columns.md#datamappingandtemplates) for the left-hand grid cells
- and many more. Please refer to the [available guides](desktop/guides.md) on Gantt

You can find the full list of props supported by React Gantt in the following article: web/react_configuration_props.md

Themes & Styling
-----------------

Gantt is shipped with several built-in themes that can be activated via the **skin** prop and changed dynamically:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/gantt-react";
import "@dhx/gantt-react/dist/gantt-react.css";

export default function BasicInitDemo() {
  const [theme, setTheme] = useState("terrace"); 
  const tasks = [.];
  const links = [...];

  const switchTheme = () => {
    setTheme((prevTheme) => (prevTheme === "terrace" ? "dark" : "terrace"));
  };


  return (
    <div style={ {height: '600px'} }>
      <div>
        <button onClick={switchTheme}>Switch Theme</button>
      </div>
      <ReactGantt
        tasks={tasks}
        links={links}
        skin={theme}  /*!*/
      />
    </div>
  );
};
~~~

You can find detailed descriptions of the existing themes in [this article](desktop/skins.md).

Themes can be additionally customized using custom styles and by overriding css variables:

~~~css
  :root {
      --dhx-gantt-task-background: #d96c49;
      --dhx-gantt-task-color: #fff;
      --dhx-gantt-task-border-radius: 8px;
  }
~~~

For additional configuration, please check the desktop/custom_skins.md

Replacing the Lightbox
------------------

DHTMLX Gantt comes with a built-in configurable task editor called the [Lightbox](desktop/default_edit_form.md).

If needed, you can replace it with a React-based modal or any other component in one of the following ways:

#### By Providing a Custom Component via the customLightbox Prop

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
            style={ { width: '100%', padding: '8px', marginTop: '10px' } }
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
import ReactGantt from "@dhx/gantt-react";
import "@dhx/gantt-react/dist/gantt-react.css";
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

#### By using onBeforeLightbox event prop

For more complex scenarios, you can capture the [onBeforeLightbox](api/gantt_onbeforelightbox_event.md) event (fired when the Lightbox is invoked) and override the default behavior:

~~~js
import { useEffect, useRef } from 'react';
import ReactGantt from "@dhx/gantt-react";
import "@dhx/gantt-react/dist/gantt-react.css";
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

#### By using JS Gantt API

Please refer to desktop/custom_edit_form.md for further details on overriding or extending the built-in Lightbox.


Accessing the Underlying Gantt API
------------------

In most cases, ReactGantt props are enough to configure your chart. However, sometimes you'll need direct access to the DHTMLX Gantt API for advanced operations (e.g. gantt.showDate, gantt.unselectTask, or custom zooming).

#### Using a Ref

The recommended approach is to attach a ref to your <ReactGantt> component. The wrapper uses forwardRef to expose the internal Gantt instance:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt from '@dhx/gantt-react';

export default function GanttWithRef() {
  const ganttRef = useRef(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (gantt) {
      // For example, select a task programmatically
      gantt.selectTask(1);
    }
  }, []);

  return (
    <ReactGantt
      ref={ganttRef}
      tasks={[/* ... */]}
      links={[/* ... */]}
    />
  );
}
~~~

#### Common API Examples


~~~js
// getTask and updateTask
const task = gantt.getTask(1);
task.text = "Updated task name";
gantt.updateTask(1);

// addTask
gantt.addTask({ id: 5, text: "New Task", start_date: new Date(2025, 05, 01), duration: 3 });

// render
gantt.render(); 
~~~

See the DHTMLX Gantt [API Reference](api/refs/gantt_methods.md) for the full list of methods.

#### Avoid Conflicts with React Props

- If you manually call gantt.parse({ tasks, links }) or gantt.addTask() from your code, be aware you may need to keep the React props in sync. Otherwise, the next time React re-renders, it may overwrite your manual changes.
- The recommended approach is to rely on the wrapper's props for tasks and links, or manage them in your React state. Then let the wrapper handle re-parsing.



Compatibility with SSR Frameworks (Next.js, Remix)
--------------


{{note Since the underlying DHTMLX Gantt library is a purely browser widget (it reads and manipulates the DOM directly), it cannot be rendered in a Node/SSR environment. Therefore, you must disable or delay server-side rendering for any route or component that uses ReactGantt. }}

#### Next.js

If you're using Next.js, you can dynamically import your ReactGantt component with SSR disabled:

~~~js
import dynamic from 'next/dynamic';

const GanttDemo = dynamic(() => import('../components/GanttDemo'), {
  ssr: false
});

export default function GanttPage() {
  return (
    <div style={ { height: '100vh' } }>
      <GanttDemo />
    </div>
  );
}
~~~
This ensures that Next.js only loads your Gantt in the client's browser, preventing errors during the server-render phase.

#### Remix

In Remix, you can conditionally render the Gantt component only on the client:

~~~js
import { ClientOnly } from 'remix-utils/client-only';
import ReactGantt from '@dhx/gantt-react';

export default function GanttPage() {

  return (
    <div style={ { height: '100vh' } }>
      <ClientOnly fallback={<p>Loading...</p>}>
        {() => <ReactGantt
          tasks={[/* ... */]}
          links={[/* ... */]}
        />}
      </ClientOnly>
    </div>
  );
}
~~~

That pattern defers rendering of the actual Gantt until the component is hydrated in the browser, avoiding SSR errors.

Next Steps
-------------------

- For detailed info on how to pass config, see web/react_configuration_props.md
- For advanced use see [DHTMLX Gantt documentation](desktop/guides.md) 



@index:
- web/react_configuration_props.md