---
title: "Using Gantt on the server"
sidebar_label: "Node.js Gantt"
description: "run the DHTMLX Gantt auto scheduling engine headless on the server with the Node.js package"
---

# Using Gantt on the server


The auto scheduling engine of DHTMLX Gantt runs on the server as well as in the browser.
With the Node.js package you can create a Gantt instance with no DOM, load your data, and run the
same scheduling calculation your users see in the UI - to validate a plan, recalculate it after a
change, or process schedules in a background job.

It is the same engine, so the schedule your server computes and
the one your users see do not drift apart. The engine is deterministic: the same data always
produces the same schedule on the server and on the client.

Typical reasons to use it:

- When you receive an update of the task from another source (e.g. from the mobile app) and need to run the auto-scheduling in order to update timing of the related tasks
- When you have several users of the same app that can make changes simultaneously, and you need to synchronize and validate the schedule
- When you need to run calculations and analyze the schedule with your server code
- When you want to expose scheduling through an API, so that non-JavaScript clients rely on the same engine
- When you want to assert scheduling outcomes in automated tests, without a browser

For this reason, we provide a separate build of dhtmlxGantt that can run on the server-side in the Node.js environment.

DHTMLX Gantt for Node.js has the same functionality as Commercial/Enterprise/Ultimate packages, which means the **Gantt.getGanttInstance** method is available and allows creating a new instance of a gantt.

## Terms of using


Node.js server module of DHTMLX Gantt is provided as an add-on package to the client-side version of Gantt. Thus, you can add the Node.js build at extra fee while buying Gantt under any commercial license ([Individual](https://dhtmlx.com/docs/products/dhtmlxGantt/individual/), [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/commercial/), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/enterprise/)). The [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/ultimate/) license includes it by default.

In case you have already obtained the main library of dhtmlxGantt, you can [purchase the Node.js module separately](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=58429) and we will send you a link to the server-side version of Gantt.

## Versioning


dhtmlxGantt applies to the Node.js package the same scheme of the version numbering as to the browser packages (for example, v7.0.0 is the first version of Gantt for a Node.js package).

:::note
We advice you to use the same version of the gantt libraries on the client side as on the server side.
:::

## Adding the library to the project


You can install dhtmlxGantt for Node.js as a local package:

~~~js title="package.json"
"dependencies": {
    "@dhx/gantt-node": "file:../../gantt_10.0.0_node"
    ...
}
~~~

To try the engine out before buying a license, install the evaluation build from npm:

~~~bash
npm install @dhtmlx/trial-gantt-node
~~~

:::note
The evaluation version of dhtmlxGantt for Node.js has limited functionality that allows loading up to 75 of Tasks or Links.
If you try to load a larger data set, only the first 75 items will be loaded.
:::

The examples below import **@dhx/gantt-node**. If you installed the evaluation package, import
**@dhtmlx/trial-gantt-node** instead - the API is the same.

## Creating an instance


Import the library and create an instance with the **getGanttInstance** method. The instance takes
its plugins, config, data and event handlers at once, so a scheduling task can be a single call:

~~~js
import { Gantt } from "@dhx/gantt-node";

const gantt = Gantt.getGanttInstance({
    plugins:{
        auto_scheduling: true,
        critical_path: true
    },
    config: {
        date_format: "%Y-%m-%d %H:%i",
        work_time: true,
        duration_unit: "day",
        auto_scheduling:{
            enabled: true,
            apply_constraints: true
        }
    },
    data: {
        tasks: [
            { id: 1, text: "Design", start_date: "2026-01-05 00:00", duration: 2, parent: 0 },
            { id: 2, text: "Build",  start_date: "2026-01-05 00:00", duration: 3, parent: 0 },
            { id: 3, text: "Ship",   start_date: "2026-01-05 00:00", duration: 1, parent: 0 }
        ],
        links: [
            { id: 1, source: 1, target: 2, type: "0" },
            { id: 2, source: 2, target: 3, type: "0" }
        ]
    },
    events:{
        onAfterAutoSchedule: function(taskId, updatedTasks) {
            console.log("Rescheduled tasks:", updatedTasks);
        }
    }
});

// recalculate the whole project
gantt.autoSchedule();

// read the recalculated schedule
console.table(gantt.serialize().data);
~~~

The [serialize](api/method/serialize.md) method returns the tasks and links with their recalculated
**start_date** / **end_date** values, ready to be stored in your database. Note the
[date_format](api/config/date_format.md) config: it defines the format the dates of the loaded and
serialized data are written in, and all the examples on this page use it.

## Recalculating a part of the project


Pass a task id to [autoSchedule](api/method/autoschedule.md) to recalculate only the group of
tasks connected to that task, and leave the rest of the project alone:

~~~js
gantt.autoSchedule(taskId);
~~~

## Working time on the server


Working calendars behave the same way headless as in the browser. Enable the
[work_time](api/config/work_time.md) config and define the calendars before loading the data.
The **"global"** id replaces the calendar that all tasks use by default:

~~~js
gantt.config.work_time = true;

gantt.addCalendar({
    id: "global",
    worktime: {
        hours: ["9:00-13:00", "14:00-18:00"],
        days: {
            weekdays: [0, 1, 1, 1, 1, 1, 0],
            dates: { "2026-04-13": false } // a holiday
        }
    }
});
~~~

A task can use its own calendar - assign the calendar id to the **calendar_id** property of the
task object:

~~~js
gantt.addCalendar({
    id: "contractor",
    worktime: {
        hours: ["10:00-19:00"],
        days: { weekdays: [1, 1, 1, 1, 1, 1, 1] }
    }
});

// this task is scheduled over weekends as well, and cannot start before April 13
gantt.parse({
    tasks: [
        { id: 5, text: "Marketing copy", start_date: "2026-04-18 09:00",
          duration: 2, calendar_id: "contractor", parent: 0,
          constraint_type: "snet", constraint_date: "2026-04-18 09:00" }
    ]
});
~~~

See [Work Time Calculation](guides/working-time.md) for the complete calendar API.

## Inspecting the schedule


Since there is nothing to render on the server, the results of the calculation are read through
the API. Besides the dates themselves, the engine can report how the schedule was reached:

~~~js
// all dependency loops in the loaded data
gantt.findCycles();

// would this link close a loop? checked before the link is added
gantt.isCircularLink({ source: 3, target: 1 });

// the tasks and links a recalculation of task 2 would touch
gantt.getConnectedGroup(2);
// => { tasks: [1, 2, 3], links: [1, 2] }

// the effective constraint of a task and the dates it allows
gantt.getConstraintType(gantt.getTask(1)); // => "asap"
gantt.getConstraintType(gantt.getTask(5)); // => "snet"
gantt.getConstraintLimitations(gantt.getTask(5));
// => { earliestStart, earliestEnd, latestStart, latestEnd }, the unconstrained ends being null
~~~

The critical path and slack are available as well, as long as the
[critical_path](guides/critical-path.md) plugin is enabled - it is in the instance created above:

~~~js
// is this task on the critical path?
gantt.isCriticalTask(gantt.getTask(2));

// slack is returned in the configured duration_unit, "day" in this example
gantt.getTotalSlack(gantt.getTask(2));
gantt.getFreeSlack(gantt.getTask(2));
~~~

## Reacting to scheduling conflicts


The auto scheduling events fire on the server too, so conflicts can be handled in your own code -
for example to reject a save or to flag a plan for review. [onAutoScheduleConflict](api/event/onautoscheduleconflict.md)
reports a constraint that could not be satisfied, a task placed on its own non-working time, and a
dependency on an unscheduled task; dependency loops come through the separate
[onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md) event:

~~~js
gantt.attachEvent("onAutoScheduleConflict", function(conflict) {
    // log, reject, or annotate the plan
    console.warn(conflict.kind, conflict.taskId);
});

gantt.attachEvent("onAutoScheduleCircularLink", function(groups) {
    // each group is a set of task and link ids that form a loop
    console.warn("circular dependencies:", groups);
});

gantt.attachEvent("onBeforeTaskAutoSchedule", function(task) {
    // return false to keep this task where it is
    return true;
});
~~~

The full list of scheduling methods and events is in the
[Auto Scheduling](guides/auto-scheduling.md#api-overview) guide.

## Returning the changes to the client


A common use of the server-side gantt is to let a thin client - a mobile app, or any front end
without a Gantt chart - delegate the scheduling logic to the backend: the client sends what the
user did, the server applies it to a gantt instance, runs the auto scheduling, and returns the
result. [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md) fires for every task the
scheduler moved, which collects the **cascade** of the edit:

~~~js
const rescheduled = [];
gantt.attachEvent("onAfterTaskAutoSchedule", function(task) {
    rescheduled.push(task.id);
    return true;
});

gantt.parse(projectData);
gantt.updateTask(updatedTaskId);   // the change the user made
gantt.autoSchedule(updatedTaskId);

const rescheduledTasks = rescheduled.map(id => gantt.getTask(id));
~~~

:::note
This is the cascade only. The task the user edited is not in the list unless the scheduler moved it
too, and added, deleted or relinked items are not there either - your response and your persistence
layer have to include the initiating change as well. When a request can carry arbitrary changes, a
[custom dataProcessor routing](guides/server-side.md#customrouting), or a diff of `serialize()`
before and after, is a more complete way to build the change set.
:::

## Code samples


The Node.js package ships runnable samples in its `/samples` folder:

- `nodejs` - loading data and running auto scheduling, in JavaScript
- `typescript` - the same scenario in TypeScript
- `scheduling_engine` - working calendars, task constraints, critical path and slack, and the
  schedule analysis API
- `nodejs_with_export` - importing and exporting MS Project, Primavera P6 and Excel files

To run one of them, open its folder, run `npm install` and then `npm start`.

## Limitations


dhtmlxGantt provides the same core API for Node.js as the browser version.

However, some methods that are available in the client-side version of Gantt either won't work or won't be defined in the server library, namely:

- Server-side rendering is not implemented. Calling such methods as [gantt.render](api/method/render.md), [gantt.refreshData](api/method/refreshdata.md), [gantt.refreshTask](api/method/refreshtask.md), etc. won't produce any HTML but will trigger related API events, for example, [onBeforeGanttRender](api/event/onbeforeganttrender.md), [onGanttRender](api/event/onganttrender.md), etc.
- [Popup messages API](guides/message-boxes.md) is not included into the Node package. The gantt.message, gantt.alert, gantt.confirm methods will be undefined.
- [Built-in ajax helpers](api/other/ajax.md) are not ported to Node.js, so neither gantt ajax API nor [gantt.load](api/method/load.md) nor default dataProcessor routings will work. You need to use [gantt.parse](api/method/parse.md) and [custom routing of the dataProcessor](guides/server-side.md#customrouting).
- The interactive features that depend on the UI - the [edit form](guides/edit-form.md), drag and drop, inline editors, keyboard navigation - have no effect. Everything related to **data and scheduling** works exactly as in the browser.

## Related pages


- [Auto Scheduling](guides/auto-scheduling.md)
- [Work Time Calculation](guides/working-time.md)
- [Task Constraints](guides/constraint.md)
- [Critical Path](guides/critical-path.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md) - a client-side gantt with a Node.js REST backend
