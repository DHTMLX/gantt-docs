---
title: "Multiple Charts on a Page"
sidebar_label: "Multiple Charts on a Page"
---

# Multiple Charts on a Page

:::info
This functionality is available in the Gantt PRO version under the Commercial (since October 6, 2021), Enterprise and Ultimate licenses
:::

Basically, DHTMLX Gantt is a static object and the default instance of it continually exists on the page. You may access it via the global `gantt` object at any time. But you can also create a new gantt object if needed.

## Gantt Instance Configuration

To create a new instance of DHTMLX Gantt, use the `Gantt.getGanttInstance()` method:

~~~js
// beware, "Gantt" in the command goes with the capital letter
const ganttChart = Gantt.getGanttInstance();
~~~

The method can take a configuration object as a parameter:

~~~js
const ganttInstance = Gantt.getGanttInstance({
    plugins: {
        auto_scheduling: true,
    },
    container: "gantt_here",
    config: {
        work_time: true,
        duration_unit: "minute",
        auto_scheduling_compatibility: true,
        auto_scheduling: true,
        auto_scheduling_strict: true,
        auto_scheduling_initial: true,
        start_date: new Date(2027, 0, 1),
        end_date: new Date(2028, 0, 1),
    },
    calendars: [
        {
            id: "global",
            worktime: {
                hours: ["8:00-17:00"],
                days: [0, 1, 1, 1, 1, 0, 0],
                customWeeks: {
                    lastMonthOfYear: {
                        from: new Date(2027, 11, 1),
                        to: new Date(2028, 0, 1),
                        hours: ["9:00-13:00"],
                        days: [0, 1, 1, 1, 1, 1, 0]
                    },
                    firstMonthOfNextYear: {
                        from: new Date(2028, 0, 1),
                        to: new Date(2028, 1, 1),
                        hours: ["14:00-16:00"],
                        days: [1, 1, 1, 1, 1, 0, 1]
                    }
                }
            }
        }
    ],
    data: {
        tasks: [
            { id: 11, text: "Project #1", type: "project", "open": true, "parent": 0 },
            { id: 1, text: "1", start_date: "2027-04-05", duration: 1, parent: "11" },
            { id: 2, text: "2", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 3, text: "3", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 4, text: "4", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 5, text: "5", start_date: "2027-04-05", duration: 1, parent: "11" }
        ],
        links: [
            { source: "1", target: "2", type: "0", id: 1 },
            { source: "1", target: "3", type: "0", id: 2 },
            { source: "1", target: "4", type: "0", id: 3 },
            { source: "2", target: "4", type: "0", id: 4 },
            { source: "3", target: "4", type: "0", id: 5 },
            { source: "4", target: "5", type: "0", id: 6 }
        ]
    }
});
~~~

As a result, you will get an initialized Gantt chart with the specified settings.

The config object can contain the following properties:

- `container` - (*string|HTMLElement*) an HTML container or its ID where the Gantt chart will be displayed. If not specified, Gantt will be initialized without a container.
- `config` - (*object*) an object with Gantt chart configuration settings
- `calendars` - (*array*) an array of worktime calendars to be loaded into the gantt instance. Calendars must be specified in the format supported by the [`gantt.addCalendar()`](api/method/addcalendar.md) method
- `templates` - (*object*) an object with templates
- `events` - (*object*) an object with event handlers

You need to use the following format while specifying event handlers for a new Gantt instance:

~~~js
const ganttInstance = Gantt.getGanttInstance({
    events: {
        onTaskCreated: (task) => {
            task.owner = null;
            return true;
        },
        onTaskClick: (taskId) => {
            alert(ganttInstance.getTask(taskId).text);
            return true;
        }
    }
});
~~~

- `data` - (*object|string*) an object with data to load or the URL to load data from
- `plugins` - (*object*) extensions that need to be activated
- `locale` - (*string|object*) a two-letter language code or an object of the locale that needs to be activated

Note that calling the `Gantt.getGanttInstance()` method without parameters will return a gantt object with the default configuration settings.
Therefore, you will need to configure your new instance, initialize it, and populate it with data, as usual.

Let's take a simple example: two Gantt charts, one under another:

~~~js
window.addEventListener("DOMContentLoaded", () => {
    const firstGantt = Gantt.getGanttInstance();
    firstGantt.init("gantt_here");
    firstGantt.parse(tasksA);

    const secondGantt = Gantt.getGanttInstance();
    secondGantt.init("gantt_here_2");
    secondGantt.parse(tasksB);
});
~~~

~~~html
<body>
    <div id="gantt_here" style="width: 100%; height: 50%;"></div>
    <div id="gantt_here_2" style="width: 100%; height: 50%;"></div>
</body>
~~~

## Integration with DHTMLX Layout

A good way to place multiple Gantt charts on the page is using [DHTMLX Layout](https://docs.dhtmlx.com/suite/layout/).
It not only provides a convenient layout frame, but also ensures correct interaction with other elements on the page and responds to page size changes.

:::note
Note that DHTMLX Layout is a separate product, not a part of the DHTMLX Gantt library. If you would like to use DHTMLX Layout in your application, you should purchase the license.
Please [check the licensing options](https://dhtmlx.com/docs/products/licenses.shtml).
:::

A DHTMLX Gantt instance can be placed into a layout cell by defining a container in the cell and initializing Gantt in it.

~~~js
new dhx.Layout("layout_container", {
    rows: [
        {
            id: "top",
            height: "50%",
            html: '<div id="gantt_here" style="width: 100%; height: 100%;"></div>'
        },
        {
            id: "bottom",
            height: "50%",
            html: '<div id="gantt_here_2" style="width: 100%; height: 100%;"></div>'
        }
    ]
});

const firstGantt = Gantt.getGanttInstance();
firstGantt.init("gantt_here");
firstGantt.parse(tasksA);

const secondGantt = Gantt.getGanttInstance();
secondGantt.init("gantt_here_2");
secondGantt.parse(tasksB);
~~~

## Destructor of Gantt and DataProcessor instances {#destructorofganttanddataprocessorinstances}

Starting from version 5.1, the DHTMLX Gantt object has a [`destructor()`](api/method/destructor.md) method that can be used to dispose unnecessary Gantt instances.

The `destructor()` method of a gantt instance can be used as follows:

~~~js
const ganttInstance = Gantt.getGanttInstance();
ganttInstance.destructor();
~~~

The destructor will perform the following tasks:

- clear the data loaded into a gantt instance
- destroy the data processor if it is attached to the gantt
- detach the gantt from DOM
- detach all DOM events attached via the [`gantt.event()`](api/method/event.md) method

Note that the destructor will not destroy the data stores created by the [`gantt.createDatastore()`](api/method/createdatastore.md) method.
You have to destroy them manually, like this:

~~~js
// creating a datastore
const ganttInstance = Gantt.getGanttInstance();
const resourcesStore = ganttInstance.createDatastore({
    name: "resource",
    initItem: (item) => {
        item.id = item.key || ganttInstance.uid();
        return item;
    }
});

// destroying the datastore later
resourcesStore.destructor();
~~~

### Using destructor with Angular

Here is an example of using the destructor to dispose a gantt instance while using the Angular framework:

~~~ts
@Component({ template: '...' })
class MyGanttComponent implements OnInit, OnDestroy {
    private ganttInstance;

    ngOnInit() {
        this.ganttInstance = Gantt.getGanttInstance();

        // configure and init
    }

    ngOnDestroy() {
        if (this.ganttInstance) {
            this.ganttInstance.destructor();
        }
    }
}
~~~

### Detaching the dataProcessor

Calling the destructor of a data processor will clear the data processor instance and detach it from the gantt. For example:

~~~js
const ganttInstance = Gantt.getGanttInstance();
const dataProcessor = ganttInstance.createDataProcessor({
    url: "url",
    mode: "REST"
});

// destroys data processor and detaches it from the gantt
dataProcessor.destructor();
~~~

:::note
If you use a package that does not allow creating multiple instances of the gantt object (GPL or Commercial editions), calling the gantt destructor will make the gantt inaccessible until the page is reloaded.
:::
