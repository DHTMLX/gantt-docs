---
title: "Multiple Charts on a Page"
sidebar_label: "Multiple Charts on a Page"
---

# Multiple Charts on a Page

:::info
This functionality is available in the Gantt PRO version under the Commercial (since October 6, 2021), Enterprise and Ultimate licenses
:::

Basically, dhtmlxGantt is a static object and the default instance of it continually exists on the page. You may access it via the global **gantt** object at any time. But you can also create a new gantt object if needed.

## Gantt Instance Configuration

To create a new instance of dhtmlxGantt, use the **Gantt.getGanttInstance()** method:

~~~js
// beware, "Gantt" in the command goes with the capital letter
const ganttChart = Gantt.getGanttInstance();
~~~

The method can take a configuration object as a parameter:

~~~js
const gantt = Gantt.getGanttInstance({
    plugins:{
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
        start_date: new Date(2020, 0, 1),
        end_date: new Date(2021, 0, 1),
    },
    calendars: [
        {
            id:"global",
            worktime: {
                hours: ["8:00-17:00"],
                days: [ 0, 1, 1, 1, 1, 0 ,0],
                customWeeks: {
                    lastMonthOfYear: {
                        from: new Date(2020, 11, 1),// December 1st, 2020
                        to: new Date(2021, 0, 1),// January 1st 00:00, 2021,
                        hours: ["9:00-13:00"],
                        days: [ 0, 1, 1, 1, 1, 1, 0]
                    },
                    firstMonthOfNextYear:{
                        from: new Date(2021, 0, 1),// January 1st, 2021
                        to: new Date(2021, 1, 1),// Feb 1st 00:00, 2021,
                        hours: ["14:00-16:00"],
                        days: [ 1, 1, 1, 1, 1, 0, 1]
                    }
                }
            }
        }
    ],
    data: {
        tasks: [
            { id: 11, text: "Project #1", type: "project", "open": true, "parent": 0 },
            { id: 1, start_date: "05-04-2020", text: "1", duration: 1, parent: "11", 
            type: "task" },
            { id: 2, start_date: "05-04-2020", text: "2", duration: 3, parent: "11", 
            type: "task" },
            { id: 3, start_date: "05-04-2020", text: "3", duration: 3, parent: "11", 
            type: "task" },
            { id: 4, start_date: "05-04-2020", text: "4", duration: 3, parent: "11", 
            type: "task" },
            { id: 5, start_date: "05-04-2020", text: "5", duration: 1, parent: "11", 
            type: "task" }
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

- **container** - (*string|HTMLElement*) an HTML container (or its id) that the Gantt chart will be displayed in. If not specified, Gantt will be initialized without a container.
- **config** - (*object*) an object with configuration settings of the Gantt chart
- **calendars** - (*array*) an array of worktime calendars to be loaded into the gantt. Calendars must be specified in the format supported by the [gantt.addCalendar](api/method/addcalendar.md) method. 
- **templates** - (*object*) an object with templates 
- **events** - (*object*) an object with event handlers. 


You need to use the following format while specifying event handlers for a new instance of Gantt:

~~~js
const gantt = Gantt.getGanttInstance({
     events: {
          onTaskCreated: function(task){
               task.owner = null;
               return true;
          },
          onTaskClick: function(id){
               alert(gantt.getTask(id).text);
               return true;
          }
     }
})
~~~

- **data** - (*object|string*) an object with data to load or the URL to load data from
- **plugins** - (*object*) extensions that need to be activated
- **locale** - (*string|object*) a two-letter language code or an object of the locale that needs to be activated

**Note**, that calling the **Gantt.getGanttInstance()** method without parameters will return the gantt object with default configuration settings.
Therefore, you will need to configure your new instance, initialize it and populate with data, as usual.

Let's take a simple example: 2 Gantt charts, one under another: 

~~~js
window.addEventListener("DOMContentLoaded", function(){
    var gantt1 = Gantt.getGanttInstance();
    gantt1.init("gantt_here");
    gantt1.parse(tasksA);

    var gantt2 = Gantt.getGanttInstance();
    gantt2.init("gantt_here_2");
    gantt2.parse(tasksB);
});

<body>
<div id="gantt_here" style="width:100%; height: 50%;"></div>
<div id="gantt_here_2" style="width:100%; height: 50%;"></div>
</body>
~~~

## Integration with dhtmlxLayout

A good way to place multiple Gantt charts on the page is using [dhtmlxLayout](https://docs.dhtmlx.com/layout__index.html). 
It not only provides a beautiful frame, but also ensures correct interacting with other elements on the page and acting according to the page size changes. 

:::note
Note that dhtmlxLayout is a separate product, not a part of the dhtmlxGantt library. If you would like to use dhtmlxLayout in your application, you should purchase the license. 
Please [check the licensing options](https://dhtmlx.com/docs/products/dhtmlxLayout/#editions-licenses).
:::

**To attach a dhtmlxGantt instance to a layout cell**, use the **attachGantt()**  method.
  
**Note**, attaching dhtmlxGantt to a cell automatically initializes it. So, configure dhtmlxGantt instance before placing it into the layout.

~~~js
function init() {
    var dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

    gantt1 = Gantt.getGanttInstance();
    gantt1.config.min_column_width = 50;
    gantt1.config.scale_height = 90;
    dhxLayout.cells("a").attachGantt(null, null, gantt); /*!*/
    gantt1.parse(tasksA);
        
    gantt2 = Gantt.getGanttInstance();
    gantt2.config.date_grid = "%Y-%m-%d %H:%i";
    gantt2.config.xml_date = "%Y-%m-%d %H:%i:%s";
    dhxLayout.cells("b").attachGantt(null, null, gantt2);/*!*/
    gantt2.parse(tasksB);
}
~~~

## Destructor of Gantt and DataProcessor instances {#destructorofganttanddataprocessorinstances}

Starting from version 5.1, the dhtmlxGantt object has a [destructor](api/method/destructor.md) that can be used to dispose unnecessary instances of the Gantt.

The destructor of the gantt instance can be used as follows:

~~~js
var gantt = Gantt.getGanttInstance();
gantt.destructor();
~~~

The destructor will implement the following tasks:

- clear the data loaded into a gantt instance
- destroy the dataProcessor (if it is attached to the gantt) 
- detach the gantt from DOM
- detach all DOM events attached via the [gantt.event()](api/method/event.md) method

Note, that the destructor won't destroy the data stores created by the [gantt.createDatastore()](api/method/createdatastore.md) method. 
You have to destroy them manually, like this:

~~~js
// creating a datastore
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});

// destroying the datastore later
resourcesStore.destructor();
~~~

### Using destructor with Angular

Here is an example of using the destructor to dispose a gantt instance while using the Angular framework:

~~~js
@Component({selector: 'app-gantt', template: `...`})
class MyGanttComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Gantt.getGanttInstance();

     // configure and init
  }
  
  ngOnDestroy() {
     this.$gantt.destructor();
     this.$gantt = null;
  }
}
~~~

### Detaching the dataProcessor

Calling the destructor of data processor will clear the dataprocessor instance and detach it from the gantt. For example:

~~~js
var gantt = Gantt.getGanttInstance();
var dp = new gantt.dataProcessor("url");
dp.init(gantt);

// destroys data processor and detaches it from the gantt
dp.destructor();
~~~

:::note
If you use a package that does not allow creating multiple instances of the gantt object (GPL or Commercial editions), calling the gantt destructor will make the gantt inaccessible until page reload.
:::

