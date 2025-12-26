---
title: "Integration with JQuery"
sidebar_label: "Integration with JQuery"
---

# Integration with JQuery

If you are using JQuery library, you can render the Gantt chart on a page using a usual syntax. 

A standard Gantt chart with JQuery can be initialized as in:

**A Gantt chart initialized with JQuery**
~~~js
$(".mygantt").dhx_gantt({
    data:demo_tasks,
    scales:[
        { unit:"year",step:1,format:"%Y"}
    ]
});
$("#gantt1").dhx_gantt().parse(tasksA);
~~~

~~~html
<div class="mygantt" id='gantt1' style='width:100%; height:30%;'></div>
~~~


[jQuery integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)


where:

- **".mygantt"** - a jQuery compatible CSS selector of the container, in which the Gantt chart will be created 
- **dhx_gantt()** method instantiates dhtmlxGantt. As a parameter the method takes a configuration object:
  - **data** - (*object*) a data set that will  be loaded to the Gantt chart
  - **[scales](api/config/scales.md)** - (*array*) an array with configuration settings of the time scale
  
:::note
A Gantt chart, initialized through jQuery call, uses the same configuration and API as the standard (initialized through JavaScript) Gantt chart does.
:::


[jQuery integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)

