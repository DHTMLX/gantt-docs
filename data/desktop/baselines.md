Displaying Additional Elements in the Timeline Area
======================================================

Common description
------------------------------------------
By default, dhtmlxGantt renders elements of the timeline area as layers and does it in the following order:

1. Timeline's grid
2. Links
3. Tasks

Displaying additional elements, such as a baseline or deadline marker, is usually done by creating a displayable layer and placing custom elements there
 (using the absolute positioning to put custom elements next to the related task).

**To add one more layer to the timeline area**, use the api/gantt_addtasklayer.md method. As a parameter, the method takes a function that: 

- Takes a task's object;
- Returns a DOM element that will be displayed or *false* (the element for a task should be hidden).

~~~js
gantt.addTaskLayer(function myNewElement(task) {
		var el = document.createElement('div');
        //your code
		return el;
});
~~~
{{sample
	04_customization/14_deadline.html
}}

<br>

Note, 

1. After you call the method, dhtmlxGantt adds a container to the timeline area. 
2. When dhtmlxGantt renders data, the api/gantt_addtasklayer.md method will be called for each task and the returned DOM element will be appended to the container.
3. For placing elements, you can use a usual absolute position. 
4. When a Gantt's task is updated, it will be updated in all layers including the custom ones (the function will be called for the updated task and the related DOM element will be replaced).
5. dhtmlxGantt provides a method for calculating task's position and size - api/gantt_gettaskposition.md. You can use it to calculate the position and size for your custom elements as well.

Example of usage
--------------------------

To understand how to apply this functionality, let's consider an example: you have a planned and an actual time for tasks and need to display both of times.

<img style="" src="desktop/baselines.png"/>

###Step 1. Reduce the task height and move task lines upper

In the initial state tasks look like this:

<img src="desktop/baselines_start.png">

First of all, you need to free some space for baselines under the tasks. 
For this purpose, it's necessary to reduce the task height to make it equal to approximately a half of the row height:

~~~js
gantt.config.task_height = 16;
gantt.config.row_height = 40;
~~~

And move the task line to the top of the row by applying the following CSS code:

~~~css
.gantt_task_line, .gantt_line_wrapper {
	margin-top: -9px;
}
.gantt_side_content {
	margin-bottom: 7px;
}
.gantt_task_link .gantt_link_arrow {
	margin-top: -12px
}
.gantt_side_content.gantt_right {
	bottom: 0;
}
~~~

The result will be the following:

<img src="desktop/baselines_task_height.png">

###Step 2. Add additional data properties

After that, you need to add additional data properties to the task object. Let's name them: 'planned_start' and 'planned_end'. 

<img style="" src="desktop/baseline_task_object.png"/>

###Step 3. Convert added data properties to Date objects

dhtmlxGantt is aware just of the 'start_date' and 'end_date' data properties and automatically parse them to Date objects.
Any other date properties require additional processing. <br>
To make the added 'planned_start', 'planned_end' properties recognizable by dhtmlxGantt, 
parse them to Date objects with the help of the parseDate() method in the api/gantt_ontaskloading_event.md event handler. 

~~~js
gantt.attachEvent("onTaskLoading", function(task){
	task.planned_start = gantt.date.parseDate(task.planned_start, "xml_date");
	task.planned_end = gantt.date.parseDate(task.planned_end, "xml_date");
	return true;
});
~~~

###Step 4. Display custom elements for the planned time

Then, call the api/gantt_addtasklayer.md method to display planned time for task (defined by the 'planned_start' and 'planned_end' properties).
~~~js
gantt.addTaskLayer(function draw_planned(task) {
	if (task.planned_start && task.planned_end) {
		var sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
		var el = document.createElement('div');
		el.className = 'baseline';
		el.style.left = sizes.left + 'px';
		el.style.width = sizes.width + 'px';
		el.style.top = sizes.top + gantt.config.task_height  + 13 + 'px';
		return el;
	}
	return false;
});
~~~

###Step 5. Specify the CSS rules for the added elements

Next, add a style for your new elements: 

~~~css
.baseline {
	position: absolute;
	border-radius: 2px;
	opacity: 0.6;
	margin-top: -7px;
	height: 12px;
	background: #ffd180;
	border: 1px solid rgb(255,153,0);
}
~~~




###Step 6. Add the possibility to edit added data properties in the lightbox

Finally, redefine the lightbox structure if you want to provide a possibility to edit the newly added properties from UI.

~~~js
gantt.config.lightbox.sections = [
	{name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
	{name: "time", height: 72, map_to: "auto", type: "duration"},
	{name: "baseline", height: 72, map_to: { 
    	start_date: "planned_start", end_date: "planned_end"}, type: "duration"}
];
gantt.locale.labels.section_baseline = "Planned";
~~~

<br>

The full code of the considered example you can see in the related sample.

{{sample
04_customization/15_baselines.html
}}


@edition: pro
