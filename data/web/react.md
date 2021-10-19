React Gantt
==================

<a href="https://dhtmlx.com/docs/products/dhtmlxGantt-for-React/" target="_blank">DHTMLX React JS Gantt chart</a> is a separate Gantt chart library for your <a href="https://reactjs.org" target="_blank">React</a> application.

{{note There are two different products, DHTMLX Gantt and DHTMLX React Gantt. 
While they are very similar in UX, they are very different in API.}}

- Check <a href="https://dhtmlx.com/react/demos/gantt/#/base/default" target="_blank">Online Demo</a>
- The complete demo code is available on <a href="https://github.com/web-widgets/react-gantt-demos" target="_blank">GitHub</a>
- View the <a href="https://stackblitz.com/edit/react-gantt-basic" target="_blank">basic project</a>

## Supported functionality

#### Common with DHTMLX Gantt

- adding/editing/deleting tasks and links
- tasks, projects and milestones
- configurable scales and grids
- configurable tooltips
- time markers

#### Unique features

- react widgets can be used for tasks rendering, tooltips and form controls
- all configuration properties are reactive
- full react sources are provided

## Usage

### Installation

- add the react-gantt library into your React project by the following command:

~~~js
npm install @dhtmlx/trial-react-gantt
~~~

This command will install the Trial version, for Commercial one, use "@dhx/react-gantt".

- place the Gantt tag into the desired page:

~~~html
import { Gantt, DefaultTheme } from "@dhtmlx/trial-react-gantt";

export default function GanttBasic() {
    return (
        <DefaultTheme>
            <Gantt />
        </DefaultTheme>
    );
}
~~~

You can check the demo of our minimal project <a href="https://stackblitz.com/edit/react-gantt-basic" target="_blank">here</a>.
You will find the source code of the gantt in the *node_modules/@dhtmlx/trial-react-gantt/src* folder.

### Themes

The react-gantt package includes two predefined themes - Default and Material.

You can apply the desired theme by wrapping Gantt into the DefaultTheme or MaterialTheme tags:

~~~html
<div>
    <DefaultTheme>
        <Gantt />
    </DefaultTheme>
    <MaterialTheme>
        <Gantt />
    </MaterialTheme>
</div>
~~~

or you can just add the theme tag on the page and add a skin class into one of the parent tags of Gantt:

~~~html
<div>
    <DefaultTheme />
    <MaterialTheme />

    <div class="wx-default">
        <Gantt />
    </div>
    <div class="wx-material">
        <Gantt />
    </div>
</div>
~~~

### Initialization

You can define scales/columns/tasks/links during Gantt initialization:

~~~html
<Gantt scales={scales} columns={columns} tasks={tasks} links={links} />
~~~

where data may look like this:

~~~js
const scales = [
    { unit: "month", step: 1, format: "MMMM yyy" },
    { unit: "day", step: 1, format: "d" },
];

const columns = [
    { name: "text", label: "Task name", width: "100%" },
    { name: "start", label: "Start time", align: "center" },
    { name: "duration", label: "Duration", width: "70px", align: "center" },
    { name: "add-task", label: "", width: "50px", align: "center" },
];

const tasks = [
    {
        id: 1,
        open: true,
        start_date: "2020-11-06",
        duration: 8,
        text: "React Gantt Widget",
        progress: 60,
        type: "project",
    },
    {
        id: 2,
        parent: 1,
        start_date: "2020-11-06",
        duration: 4,
        text: "Lib-Gantt",
        progress: 80,
    },
];

const links = [{ source: 2, target: 1, type: 0 }];
~~~

### Integration with backend

Let's take a look at <a href="https://github.com/web-widgets/react-gantt-demos/blob/master/src/GanttBackend.js" target="_blank">GanttBackend.js</a>.

Code defines the action handler through the **save** property. This handler will be triggered on any update and may be used to save changes to the persistent storage.

In the example above, we use <a href="https://github.com/web-widgets/gantt-data-provider/blob/master/src/providers/rest.ts" target="_blank">RestDataProvider</a>.
You are not limited to this solution, though, and can extend the provided class or define a custom handler.

We provide you with 2 demo backends:

- <a href="https://github.com/web-widgets/gantt-go" target="_blank">Go Demo Backend</a>
- <a href="https://github.com/web-widgets/gantt-node" target="_blank">NodeJS Demo Backend</a>

Again, you are not limited to this solution. The above RestDataProvider can work with any REST like service and you can implement a fully custom solution (sockets, graphql, etc.) through a custom save handler.

### Templates

The following elements can be customized via templates:

- task text
- sidebar form

Check the code example <a href="https://github.com/web-widgets/react-gantt-demos/blob/master/src/GanttText.js" target="_blank">here</a>.

- tooltip content

Check the code example <a href="https://github.com/web-widgets/react-gantt-demos/blob/master/src/GanttTooltips.js" target="_blank">here</a>.

## API

### Properties

~~~js
// templates for different elements of gantt
let templates = {};
// array of markers
let markers = [];
// supported task types
let taskTypes = ["task", "project", "milestone"];
// tasks data
let tasks = [];
// links data
let links = [];
// time scales configuration
let scales = [
    { unit: "month", step: 1, format: "MMMM yyy" },
    { unit: "day", step: 1, format: "d" },
];
// grid configuration
let columns = [
    { name: "text", label: "Task name", width: "100%" },
    { name: "add-task", label: "", width: "50px", align: "center" },
];
// time scale start
let start = null;
// time scale end
let end = null;
// width of scale cell
let cellWidth = 100;
// height of chart bar
let cellHeight = 38;
// height of scale cell
let scaleHeight = 30;
// read-only mode flag
let readonly = false;
// show or hide grid
let grid = true;
// show or hide tooltips
let tooltip = null;
// show or hide borders in the chart area
let borders = "full";
~~~

### Callbacks

~~~js
// will be called with the DataStore value on Gantt initialization
let store = null;
// will be called on any action in the Gantt
let actions = null;
// will be called on any data modification in the Gantt
let save = null;
~~~

### Actions

**Data modifications** ( both _action_ and _save_ )

- add-link
- update-link
- delete-link
- add-task
- update-task
- delete-task

**UI State** ( _action_ )

- data-request
- hide-details
- move-task
- scroll-chart
- select-task
- show-details
- task-toggle
- update-task-time

#### Example of callback usage

~~~html
function handler({ action, obj, id }) {
    if (action === "select-task") console.log(`Task ${id} was selected`);
}

<Gantt action={handler} />;
~~~

### Methods

Retrieve the store object:

~~~html
let store;

<Gantt store={(v) => (store = v)} />;
~~~

and now you can use the store's API to get or modify data:

~~~ts
interface IStore {
    getTask(id: number): GanttItemData;
    updateTask(id: number, obj: any, noSave: boolean): void;
    updateLink(id: number, obj: any, noSave: boolean): void;
    action(
        id: number,
        action: string,
        obj: StringHash<any>,
        noSave?: boolean
    ): number;
}
~~~

The **action** method can be used to trigger any of the above actions:

~~~js
store.action(taskId, "tasks-toggle");
store.action(linkId, "delete-link");
store.action(null, "add-link", { source: 1, target: 2, type: 0 });
~~~
