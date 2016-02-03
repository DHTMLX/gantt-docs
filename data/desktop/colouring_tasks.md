Coloring Tasks
=======================
Coloring tasks allows you to highlight specific tasks in order to pay user's attention to them.

<img style="padding-top:15px; padding-bottom:15px;" src="desktop/coloring_tasks.png"/>


To set a custom style for tasks, you can use one of the following approaches:

1. [To redefine the default tasks' template](desktop/colouring_tasks.md#redefiningthetaskstemplate)
2. [To set style values in properties of the task object](desktop/colouring_tasks.md#specifyingstyleinthepropertiesofthetaskobject)


Redefining the task's template
-----------------------------------------
To set a custom style for the task through a template, use the api/gantt_task_class_template.md template. For example, to color tasks depending on their priority, use the code like in:

{{snippet
Coloring tasks depending on their priority
}}
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

The similar approach can be applied to links. Read more about this [here](desktop/colouring_lines.md#redefiningthelinkstemplate)


Specifying style in the properties of the task object
-----------------------------------------------------
To specify a custom style for a task, you can add 3 extra properties to the data object (or just some one of them):

- **color** - the background color of the task bar
- **textColor** - the color of the text inside the task bar (don't affect tasks with the "milestone" type)
- **progressColor** - the color of the progress bar (by default, just makes it a bit darker then the task's color using the following style 'background-color: rgb(54, 54, 54); opacity: 0.2') <br> <br>
<img src="desktop/task_color_properties.png"/>

{{note
Note, these are special properties. 
By default, the gantt checks whether a task has them and if it does, applies the related values to the task's bar and text. Otherwise - uses predefined colors.
}}

{{snippet
Setting the task's color in the data object
}}
~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1",start_date:"01-04-2013", duration:18,color:"red"},
     {id:2, text:"Task #1",   start_date:"02-04-2013", duration:8, color:"blue", parent:1},
     {id:3, text:"Task #2",   start_date:"11-04-2013", duration:8, color:"blue", parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getTask(1).color = "red"
~~~
{{sample
04_customization/16_inline_task_colors.html
}}

<br>

If, at least one of the properties is assigned, the task receives additional class - **"gantt_task_inline_color"**. <br>
You can use this class to override some other style for the task (use the "*.gantt_task_line.gantt_task_inline_color*" selector for the class):

~~~js
.gantt_task_line.gantt_task_inline_color .gantt_task_progress {
	background-color: rgb(54, 54, 54);
	opacity: 0.2;
}
~~~

<br>



The properties can have any valid css color value, e.g. all of the following notations are valid:

~~~js
task.color = "#FF0000";
task.color = "red";
task.color = "rgb(255,0,0)";
~~~


The similar approach can be applied to links. Read more about this [here](desktop/colouring_lines.md#specifyingcolorinthepropertiesofthelinkobject)