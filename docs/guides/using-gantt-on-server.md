---
title: "Using Gantt on the server"
sidebar_label: "Node.js Gantt"
---

Using Gantt on the server
=================================

In some cases, you may need to use a specialized logic of dhtmlxGantt separately from the gantt chart, for example:

- When you receive an update of the task from another source (e.g. from the mobile app) and need to run the auto-scheduling in order to update timing of the related tasks
- When you have several users of the same app that can make changes simultaneously, and you need to synchronize and validate the schedule
- When you need to run calculations and analyze the schedule with your server code

For this reason, we provide a separate build of dhtmlxGantt that can run on the server-side in the Node.js environment.

DHTMLX Gantt for Node.js has the same functionality as Commercial/Enterprise/Ultimate packages, which means the **Gantt.getGanttInstance** method is available and allows creating a new instance of a gantt.

Terms of using
--------------

Node.js server module of DHTMLX Gantt is provided as an add-on package to the client-side version of Gantt. Thus, you can add the Node.js build at extra fee while buying Gantt under any commercial license ([Individual](https://dhtmlx.com/docs/products/dhtmlxGantt/individual/), [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/commercial/), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/enterprise/)). The [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/ultimate/) license includes it by default.

In case you have already obtained the main library of dhtmlxGantt, you can [purchase the Node.js module separately](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=58429) and we will send you a link to the server-side version of Gantt.

Versioning
-------------------

dhtmlxGantt applies to the Node.js package the same scheme of the version numbering as to the browser packages (for example, v7.0.0 is the first version of Gantt for a Node.js package).

:::note
We advice you to use the same version of the gantt libraries on the client side as on the server side.
:::

Adding the library to the project
----------------------------------

You can install dhtmlxGantt for Node.js as a local package:

~~~js
"dependencies": {
    "@dhtmlx/gantt-node": "file:../../gantt_7.0.0_node"
    ...
}
~~~

Or you can import dhtmlxgantt.node.js directly from your code, as in:

~~~js
import { Gantt } from "@dhtmlx/gantt-node";

const gantt = Gantt.getGanttInstance({
    plugins:{
        auto_scheduling: true,
    },
    config: {
        work_time: true,
        duration_unit: "hour",
        auto_scheduling: true,
        auto_scheduling_strict: true,
        auto_scheduling_initial: false
    },
    data: {
        tasks: [
            { id: 1, text: "Project #1", type: "project", parent: 0 },
            { id: 2, start_date: "05-04-2020 00:00", text: "Task #1", duration: 1, 
            parent: 1, type: "task" },
            { id: 3, start_date: "05-04-2020 00:00", text: "Task #2", duration: 3, 
            parent: 1, type: "task" },
            { id: 4, start_date: "05-04-2020 00:00", text: "Task #3", duration: 3, 
            parent: 1, type: "task" },
            { id: 5, start_date: "05-04-2020 00:00", text: "Task #4", duration: 3, 
            parent: 1, type: "task" },
            { id: 6, start_date: "05-04-2020 00:00", text: "Task #5", duration: 1, 
            parent: 1, type: "task" }
        ], 
        links: [
            { id: 1, source: 1, target: 2, type: "0" },
            { id: 2, source: 2, target: 3, type: "0" },
            { id: 3, source: 3, target: 4, type: "0" },
            { id: 4, source: 4, target: 5, type: "0" },
            { id: 5, source: 5, target: 6, type: "0" }
        ]
    },
    events:{
        onAfterAutoSchedule: function(taskId, updatedTasks) {
            console.log("Following tasks were auto scheduled:");
            console.table(updatedTasks.map((taskId) => {
                return {
                    id: taskId,
                    text: this.getTask(taskId).text
                };
            }));
        },
        onParse: function() {
            console.log("Loaded data:")
            console.table(this.serialize().data);
        },
        onGanttReady: () => {
            console.log("Running dhtmlxGantt on the backend");
        }
    }
});

console.table(gantt.serialize());
~~~

Limitations
------------

dhtmlxGantt provides the same core API for Node.js as the browser version.

However, some methods that are available in the client-side version of Gantt either won't work or won't be defined in the server library, namely:

- Server-side rendering is not implemented. Calling such methods as [gantt.render](api/method/render.md), [gantt.refreshData](api/method/refreshdata.md), [gantt.refreshTask](api/method/refreshtask.md), etc. won't produce any HTML but will trigger related API events, for example, [onBeforeGanttRender](api/event/onbeforeganttrender.md), [onGanttRender](api/event/onganttrender.md), etc.
- [Popup messages API](guides/message-boxes.md) is not included into the Node package. The gantt.message, gantt.alert, gantt.confirm methods will be undefined.
- [Built-in ajax helpers](api/other/ajax.md) are not ported to Node.js, so neither gantt ajax API nor [gantt.load](api/method/load.md) nor default dataProcessor routings will work. You need to use [gantt.parse](api/method/parse.md) and [custom routing of the dataProcessor](guides/server-side.md#customrouting).

:::note
The evaluation version of dhtmlxGantt for Node.js has limited functionality that allows loading up to 75 of Tasks or Links.
If you try to load a larger data set, only the first 75 items will be loaded.
:::

