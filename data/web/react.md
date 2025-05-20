React Gantt
==================

{{note React Gantt is available under [Commercial, Enterprise and Ultimate licenses](https://dhtmlx.com/docs/products/licenses.shtml).
If you're using Individual or GPL editions of Gantt, please refer to the [How to Start](desktop/howtostart_react.md) article for React. }}

Overview
--------------------

DHTMLX Gantt is a pure JS component that can work in any browser environment. The Commercial and higher editions of Gantt include a **React Gantt** component that encapsulates DHTMLX Gantt and allows you to use it natively with React.

The wrapper lets you create a fully functional Gantt chart in your React applications using the familiar props/state model. Under the hood, it manages a standard DHTMLX Gantt instance, translating your React props (such as tasks and config) into the corresponding Gantt initialization and data structures.

**Key features**

- Declarative data handling: Pass an array of tasks, links, resources, etc. as props.
- Configurable: Map React props to the underlying *gantt.config*, *gantt.templates*, *gantt.plugins*, etc.
- Access to the full Gantt API: Use a ref to call methods like api/gantt_gettask.md, api/gantt_updatetask.md, or api/gantt_addtasklayer.md.
- Easy customization: Use React components for templates, lightbox forms, or inline editors.

If you're new to DHTMLX Gantt, see the [DHTMLX Gantt documentation](desktop/guides.md) for an overview of features like desktop/working_time.md, desktop/auto_scheduling.md, desktop/resource_management.md, and more.

Installation and NPM Access
-------------------

**Installing the Trial version of React Gantt component**

{{note If you want to use the trial version of React Gantt, [download the trial DHTMLX Gantt package](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml) and follow 
the steps mentioned in the README file. The React Gantt samples are included into this package as well.
Note that the trial React Gantt component is available for 30 days only.}}

**Installing the PRO version of React Gantt component**

{{note If you already own DHTMLX Gantt under a proprietary license, send your **license number** to ***contact@dhtmlx.com*** to receive login credentials for the private
**npm** registry as well as a detailed guide on how to install the React Gantt component. Note that private **npm** access is available until your proprietary license expires.}}


Version Requirements
--------------------

- React `v18.0.0` or newer

Basic Usage
-------------------

Here is a minimal snippet showing how to import and render the Gantt chart:

~~~js
import { useState } from 'react';
import ReactGantt from '@dhx/react-gantt';
import '@dhx/react-gantt/dist/react-gantt.css';
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
        theme={theme}
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

The **ReactGantt** wrapper offers flexible ways of loading and saving data. Conceptually, there are two primary approaches to manage changes in your Gantt data:

1. React state as the source of truth
2. Gantt as the source of truth

Either approach is valid, but you should pick one and follow it consistently to avoid unexpected behavior.

### React state as the source of truth

In this pattern, the **ReactGantt** reads all task/link data from your React state. Whenever the user modifies tasks or links inside the Gantt (for example, by creating or deleting a task), the Gantt triggers a callback. In this callback, you update your React state with the new or removed data. Once the state is updated, React re-renders the **ReactGantt** component, which in turn re-initializes the Gantt data from the latest state.

~~~js
function MyGanttApp() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const data = {
    save: (entity: string, action: string, raw: any, id: string | number) => {
      if (entity === 'task') {
        if (action === 'create') {
          setTasks((prev) => [...prev, item]);
        } ...
      }
      ...
    }
  };

  return (
    <ReactGantt
      tasks={tasks}
      links={links}
      data={data}
      // ...other props
    />
  );
}
~~~

In this example, **ReactGantt** calls the **save** callback when a new task is created, and the React state is updated accordingly. When the state changes, ReactGantt re-initializes the Gantt data.

This approach makes your React state a single source of truth for both UI and server updates and works naturally with other React logic or Redux-based state.

However, it will require more frequent re-parsing or re-rendering of the Gantt.

### Gantt as the source of truth

In this approach, changes happen directly inside the Gantt instance without necessarily being mirrored into a React state variable. You can still initialize or load tasks and links (through props or via the Gantt's built-in data processor), but once the Gantt is running, it handles data internally. If you configure an update callback or use built-in transport, Gantt will forward changes to a server endpoint or a custom function, but it will not automatically overwrite or revert from a React state after modifications.

~~~js
<ReactGantt
  data={ {
    load: "/api/data",     // gantt loads initial tasks/links from here
    save: "/api/data"      // gantt sends updates back here
  } }
/>
~~~

Here, Gantt handles fetching/sending data on its own. The local Gantt instance remains the primary holder of the current data.

This approach reduces the overhead of constantly updating React state when Gantt data changes and simplifies large-batch operations (like auto-scheduling) without repeated re-renders.

On the other side, you lose the direct synchronization between Gantt data and your React state. And if you do store tasks/links in a React state,
you need to be sure not to unintentionally overwrite Gantt's internal state.

### Loading data

When the data is available in the code, it can be passed to Gantt using state variables and appropriate props:

~~~js
export default function GanttTemplatesDemo() {
  const [tasks, setTasks] = useState(projectData.tasks);
  const [links, setLinks] = useState(projectData.links);
  const [resources, setResources] = useState(projectData.resources);
  const [resourceAssignments, setResourceAssignments] = 
      useState(projectData.resourceAssignments);

  return (
    <div style={ {height: '100vh'} }>
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

### Loading data using built-in transport

You can provide a URL from which Gantt will load data and another URL to which Gantt will send updates:

~~~js
import React from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

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

### Saving changes

The **save** URL receives updates in the format described in this [article](desktop/server_side.md#technique:~:text=Request%20and%20response%20details).

You can also pass a function callback to the **save** property of the **data**. This function will be called each time Gantt data changes and serves as a routing function for the internal [DataProcessor](desktop/server_side.md#customrouting):

~~~js
import React from 'react';
import ReactGantt from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function BasicInitDemo() {

  const props = {
    data: {
      load: "/api/data",
      save: (entity, action, data, id) => {
          console.log(`${entity} - ${action} - ${id}`, data);
      }
    }
  };

  return (
    <ReactGantt ...{props} />
  );
}
~~~

### Batch saving mode

In previous modes, React Gantt would invoke the callback for each modified entity individually. This behavior mirrors the default approach of the underlying Gantt library. However, in some cases, it can lead to performance issues in React - especially during bulk operations such as Auto Scheduling, which may modify dozens or even hundreds of tasks at once. Recalculating state for each individual update is not an efficient solution in such scenarios.

To address this, React Gantt provides a dedicated **data.batchSave** handler for bulk operations. 
This handler is called once with the result of multiple changes performed in the Gantt instance:

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

The `updates` object passed to the **batchSave** callback has the following structure:

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

### Using React components in templates 

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

Gantt is shipped with several built-in themes that can be activated via the **theme** prop and changed dynamically:

~~~js
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
    <div style={ {height: '600px'} }>
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
};
~~~

You can find detailed descriptions of the existing themes in [this article](desktop/skins.md).

Themes can be additionally customized using custom styles and by overriding CSS variables:

~~~css
:root {
	--dhx-gantt-task-background: #d96c49;
	--dhx-gantt-task-color: #fff;
	--dhx-gantt-task-border-radius: 8px;
}
~~~

For additional configuration, please check the desktop/custom_skins.md guide.

Replacing the Lightbox
------------------

DHTMLX Gantt comes with a built-in configurable task editor called [Lightbox](desktop/default_edit_form.md).

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

For more complex scenarios, you can capture the [onBeforeLightbox](api/gantt_onbeforelightbox_event.md) event (fired when the Lightbox is invoked) and override the default behavior:

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

Please refer to desktop/custom_edit_form.md for further details on overriding or extending the built-in Lightbox.

Replacing built-in Modals
------------------

The default UI includes two modal popups:

- the confirm dialog that appears before deleting a task
- the confirm dialog that appears before deleting a link

Both can be overridden using the `modals` prop of ReactGantt:

~~~js
<ReactGantt
  ...
  modals={ {
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
  } }
  ...
/>

~~~

You can use these props to activate your custom modals whenever a confirmation dialog is called by Gantt.
Calling the `callback()` provided in the arguments will finalize the deletion of the appropriate task or link. To cancel the deletion, simply close the modal without calling the callback.

Using React Components in Grid
-------------------

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

~~~
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

DHTMLX Gantt supports [inline editing for grid cells](desktop/inline_editing.md). In this React wrapper, you can provide your own custom React editors by specifying an editor object in the **column** config, and then mapping an editor name to a React component in the `inlineEditors` prop. Check the example below.


Define a React-based inline editor component:

~~~js
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

~~~js
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
    ],
    editable: true
  };

  return (
    <ReactGantt
      config={config}
      inlineEditors={ {
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

The `map_to` property specifies the property of the Task object from which the editor will read and write values. Please refer to the article that covers [inline editing](desktop/inline_editing.md) for futher details.

If you're implementing an editor that makes something more complex than writing a value to a property of a task - you need to implement a required logic in the **save** function and specify the `map_to` option of the input to **"auto"**. In this case, the gantt won't modify the task object, but instead will call the **save** function when it's time to apply the changes made to the editor. The `initialValue` of the editor will be passed as `null`.

{{note Note, you can define non-React inline editors using the [editor_types](desktop/inline_editing.md#custominlineeditor) property of the **config** property.}}

#### Editor component properties

- <span class=subproperty>**initialValue**</span> - (*any*) - the initial value of the editor
- <span class=subproperty>**task**</span> - (*Task*) - the task that is being edited
- <span class=subproperty>**save**</span> - (*function*) - tells the gantt to save and close the editor
- <span class=subproperty>**cancel**</span> - (*function*) - tells the gantt to close the editor without saving
- <span class=subproperty>**ganttInstance**</span> - (*GanttStatic*) - the current instance of the underlying Gantt object



Filtering
-----------------

Use the `filter` prop to specify a filter for the tasks that should be displayed:

~~~js
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

To filter resources in the [Resource Panel](desktop/resource_management.md), use the `resourceFilter` prop:

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
    plugins={ { auto_scheduling: true } }
  />
);

~~~

Working Calendars
------------------

To enable work-time calculations in **ReactGantt**, make sure to enable  api/gantt_work_time_config.md:

~~~js
  const config: GanttConfig = {
    ...
    work_time: true
  };
~~~

Working calendars can be passed to **ReactGantt** through the `calendars` prop:

~~~js
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
  <div style={ { height: '100%', display: 'flex', flexDirection: 'column' } }>
    <ReactGantt
      ...
      calendars={calendars}
      ...
    />
  </div>
);

~~~

In order to highlight working time in the Gantt Timeline or to perform work-time calculations, you can use the provided `useWorkTime` hook:

~~~js
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
    <div style={ { height: '100%', display: 'flex', flexDirection: 'column' } }>
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

Alternatively, you can access the [inner Gantt object](#accessingtheunderlyingganttapi) and use [working time](desktop/working_time.md) methods directly.

Grouping Tasks
-----------------

Use the `groupTasks` prop to [group tasks](desktop/grouping.md) by any of task's properties:

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


Vertical Markers in Timeline Area
-----------------

[Vertical markers](desktop/markers.md) can be added to **ReactGantt** via the `markers` property:

~~~js
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
    <div style={ { height: '100%', display: 'flex', flexDirection: 'column' } }>
      <ReactGantt
        ...
        markers={markers}
        ...
      />
    </div>
  );
~~~

{{note Note, the **text** property of the Marker object accepts either HTML string or React Element}}

Accessing the Underlying Gantt API
------------------

In most cases, ReactGantt props are enough to configure your chart. However, sometimes you'll need direct access to the DHTMLX Gantt API for advanced operations (e.g. worktime calculations, gantt.showDate, gantt.unselectTask, or custom zooming).

### Using built-in hooks

ReactGantt provides ready to use hooks that expose some methods of Gantt API. Please check the related article web/react_configuration_props.md.

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


See the DHTMLX Gantt [API Reference](api/refs/gantt_methods.md) for the full list of methods.

#### Avoid conflicts with React props

- If you manually call `gantt.parse({ tasks, links })` or `gantt.addTask()` from your code, be aware you may need to keep the React props in sync. Otherwise, the next time React re-renders, it may overwrite your manual changes.
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
import ReactGantt from '@dhx/react-gantt';

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

- For additional info on how to configure ReactGantt, see [this article](web/react_configuration_props.md)
- For advanced use see [DHTMLX Gantt documentation](desktop/guides.md) 



@index:
- web/react_configuration_props.md