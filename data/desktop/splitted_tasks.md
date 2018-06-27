Spliting Tasks into Subtasks
===========================

You can split large tasks into subtasks and render splitted tasks in the Gantt chart.

![Splitted task](desktop/split_task.png)

{{sample  04_customization/11_split_task.html}}

To split a task, you need to set the **render** property with the value *split* in the task object:

~~~js
{"id": 13, "text": "Task #2", "start_date": "03-04-2018 00:00", "type": "project", 
	"render":"split", "parent": "11", "progress": 0.5, "open": false, "duration": 11},  /*!*/
{"id": 17, "text": "Task #2.1", "start_date": "03-04-2018 00:00", "duration": 1, 
	"parent": "13", "progress": 1, "open": true},
{"id": 18, "text": "Task #2.2", "start_date": "05-04-2018 00:00", "duration": 2, 
	"parent": "13", "progress": 0.8, "open": true},
{"id": 19, "text": "Task #2.3", "start_date": "08-04-2018 00:00", "duration": 1, 
	"parent": "13", "progress": 0.2, "open": true}
~~~

The task "Task#2" will be splitted and rendered as a set of its child tasks: "Task#2.1", "Task#2.2" and "Task#2.3".

You can configure the lightbox so that it allows switching the split mode for the task on and off. For this you can add a split section as a checkbox into the lightbox via the **gantt.config.lightbox.project_sections** and
add a label for the new section:

~~~js
gantt.locale.labels.section_split = "Display";
gantt.config.lightbox.project_sections = [
	{name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
	{name: "split", type:"checkbox", map_to: "render", options:[
		{key:"split", label:"Split Task"}
	]},
	{name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~

For example, like this:

![Split task checkbox](desktop/split_task_checkbox.png)

When the checkbox will be unchecked, "Task#2" will be rendered as a project with subtasks:

![Unsplit split task](desktop/split_task_inside.png)

##Checking if task is split

You can check whether a task is split with the help of the api/gantt_issplittask.md method. It takes the task object as a parameter and returns true, if the task is split.

~~~js
var isSplit = gantt.isSplitTask({
    "id": 13, 
    "text": "Task #2", 
    "start_date": "03-04-2018 00:00", 
    "type": "project", 
    "render":"split", 
    "parent": "11", "progress": 0.5, 
    "open": false, 
    "duration": 11
});
// => true
~~~


@todo: needs improving of the structure