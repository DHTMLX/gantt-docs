Initializing a Gantt Chart with JQuery
==========================================
If you are using JQuery library, you can render the Gantt chart on a page using a usual syntax. 

A standard Gantt chart with JQuery can be initialized as in:

{{snippet
A Gantt chart initialized with JQuery
}}
~~~js
$(".mygantt").dhx_gantt({
	data:demo_tasks,
    scale_unit:"year",
	step:1,
	date_scale:"%Y"
});
$("#gantt1").dhx_gantt().parse(tasksA);
~~~

~~~html
<div class="mygantt" id='gantt1' style='width:100%; height:30%;'></div>
~~~

{{sample
	01_initialization/07_jquery.html
}}

where:

- **".mygantt"** - a jQuery compatible CSS selector of the container, in which the Gantt chart will be created 
- **dhx_gantt()** method instantiates dhtmlxGantt. As a parameter the method takes a configuration object:
  - **data** - (*object*) a data set that will  be loaded to the Gantt chart
  - **scale_unit**, **step**, **date_scale** and any other configuration parameters 
  ( normally set through gantt.config.{option} ) are set in such a way
  
{{note
A Gantt chart, initialized through jQuery call, uses the same configuration and API that the standard (initialized through JavaScript) Gantt chart does
}}

{{sample
	01_initialization/07_jquery.html
}}