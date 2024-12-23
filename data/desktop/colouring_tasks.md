Tasks Coloring 
=======================

Coloring tasks allows you to highlight specific tasks in order to pay user's attention to them.

<img style="padding-top:15px; padding-bottom:15px;" src="desktop/coloring_tasks.png"/>


To set a custom style for tasks, you can use one of the following approaches:

1. [To redefine the default tasks' template](desktop/colouring_tasks.md#redefiningthetaskstemplate)
2. [To set style values in the properties of the task object](desktop/colouring_tasks.md#specifyingstyleinthepropertiesofthetaskobject)
3. [To generate styles from data](desktop/colouring_tasks.md#loadingcolorswithdata)

Redefining the task's template
-----------------------------------------

To set a custom style for the task through a template, use the api/gantt_task_class_template.md template. For example, to color tasks depending on their priority, use the code as in:

{{snippet
Coloring tasks depending on their priority
}}
~~~css
<style>


	/* high */
	.gantt_task_line.high {
		--dhx-gantt-task-background: #d96c49;
		--dhx-gantt-task-color: #fff;
	}

	/* medium */
	.gantt_task_line.medium {
		--dhx-gantt-task-background: #f57730;
		--dhx-gantt-task-color: #fff;
	}

	/* low */
	.gantt_task_line.low {
		--dhx-gantt-task-background: #fff;
		--dhx-gantt-task-color: #fff;
	}

</style>
~~~

~~~js
gantt.templates.task_class  = function(start, end, task){
	switch (task.priority){
		case "1":
			return "high";
			break;
		case "2":
			return "medium";
			break;
		case "3":
			return "low";
			break;
	}
};
~~~
{{sample
	04_customization/04_task_styles.html
}}


{{note
To style other aspects of tasks, use the templates listed in the desktop/timeline_templates.md article.
}}

A similar approach can be applied to links. Read more about it [here](desktop/colouring_lines.md#redefiningthelinkstemplate).


Specifying style in the properties of a task object
-----------------------------------------------------

To specify a custom style for a task, you can add 3 extra properties to the data object (or just some of them):

- **color** - the background color of the task bar
- **textColor** - the color of the text inside the task bar (don't affect tasks with the "milestone" type)
- **progressColor** - the color of the progress bar (by default, just makes it a bit darker than the task's color using the following style 'background-color: rgb(54, 54, 54); opacity: 0.2')

<img src="desktop/task_color_properties.png"/>

{{note
Note, these are special properties. 
By default, Gantt checks whether a task has them and if it does, applies the related values to the task's bar and text. Otherwise, the predefined colors are applied.
}}

{{snippet
Setting the task's color in the data object
}}
~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18, color:"red"},
     {id:2, text:"Task #1", start_date:"02-04-2013", 
     	duration:8, color:"blue", parent:1},
     {id:3, text:"Task #2", start_date:"11-04-2013", 
     	duration:8, color:"blue", parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getTask(1).color = "red";
~~~

{{sample
04_customization/16_inline_task_colors.html
}}

{{note
Adding a custom color via the **color** property is followed by adding of an inline style, which has the highest priority among other styles. As a result, the critical path won't be highlighted, and any custom style you have added to change the task background or color won't be applied.}}

In order to make the tasks look critical, you can use the following code:

~~~css
.gantt_critical_task {
  --dhx-gantt-task-background: #e63030 !important;
}
~~~

{{editor	https://snippet.dhtmlx.com/xipdml7a		Coloring critical tasks and links}}

If at least one of the properties of a task object is assigned, the task receives additional class **"gantt_task_inline_color"**. <br>
You can use this class to override some other style for the task (use the "*.gantt_task_line.gantt_task_inline_color*" selector for the class):

~~~css
.gantt_task_line.gantt_task_inline_color .gantt_task_progress {
	background-color: rgb(54, 54, 54);
	opacity: 0.2;
}
~~~

The properties can have any valid CSS color value, e.g. all of the following notations are valid:

~~~js
task.color = "#FF0000";
task.color = "red";
task.color = "rgb(255,0,0)";
~~~


A similar approach can be applied to links. Read more about it [here](desktop/colouring_lines.md#specifyingcolorinthepropertiesofthelinkobject).

Loading colors with data
-----------------------------------------------------

If colors are a part of your data which comes from the backend, e.g. when task color is associated with a stage or a resource assigned to a task which can't be hardcoded on the page, it may be a good solution to generate styles from your data manually.

Let's suppose that you have the following collection of users that can be assigned to tasks. Task styles should be defined by the properties of user records:

~~~js
[
	{"key":1, "label":"John", "backgroundColor":"#03A9F4", "textColor":"#FFF"},
	{"key":2, "label":"Mike", "backgroundColor":"#f57730", "textColor":"#FFF"},
	{"key":3, "label":"Anna", "backgroundColor":"#e157de", "textColor":"#FFF"},
	{"key":4, "label":"Bill", "backgroundColor":"#78909C", "textColor":"#FFF"},
	{"key":7, "label":"Floe", "backgroundColor":"#8D6E63", "textColor":"#FFF"}
]
~~~

In this use case, users and their colors are created and managed by different parts of the app and gantt generally doesn't know user ids and their colors in advance.

This is what you can do in this case:

- Define a named serverList for this collection

~~~js
gantt.serverList("people");
~~~

- Load options to the page, either by [using the gantt data format](desktop/supported_data_formats.md#jsonwithcollections) or manually via a custom xhr 

- Once options are loaded, you can generate CSS styles from the data:

~~~js
gantt.attachEvent("onLoadEnd", function(){
    // use an arbitrary id for the style element
	var styleId = "dynamicGanttStyles";
    
    // in case you'll be reloading options with colors - 
    // reuse a previously created style element
    
	var element = document.getElementById(styleId);
	if(!element){
		element = document.createElement("style");
		element.id = styleId;
		document.querySelector("head").appendChild(element);
	}
	var html = [];
	var resources = gantt.serverList("people");

	// generate css styles for each option and write css into the style element
    
	resources.forEach(function(r){
		if(r.backgroundColor && r.textColor){
			html.push(".gantt_task_line.gantt_resource_" + r.key + "{" +
				"--dhx-gantt-task-background:"+r.backgroundColor+"; " +
				"--dhx-gantt-task-color:"+r.textColor+"; " +
			"}");

		}
	});
	element.innerHTML = html.join("");
});
~~~

If you get resources from the [resource datastore](api/gantt_resource_store_config.md), you need to use *r.id* instead of *r.key* for the resource id.

- After that you'll be able to assign related classes you generated from the task templates:

~~~js
gantt.templates.task_class = function (start, end, task) {
	var css = [];

	if(task.owner_id){
		css.push("gantt_resource_" + task.owner_id);
	}

	return css.join(" ");
};
~~~

{{sample
11_resources/01_assigning_resources.html
}}

