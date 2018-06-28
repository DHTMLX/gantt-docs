Splitting Tasks into Subtasks
===========================

In case you have a large task which is not continuous and can be interrupted, you can divided into several parts. There can be as many parts, as it's required.

Inside, such a task presents a project with subtasks:

![Unsplit split task](desktop/split_task_inside.png)

However, it is rendered a set of linked tasks:

![Splitted task](desktop/split_task.png)

To split a task, you need to set the **render** property with the value *split* in the task object:

~~~js
{id: 1, text: "Task #2", start_date: "03-04-2018 00:00", type: "project", 
	render:"split", parent: 0},  /*!*/
{id: 2, text: "Task #2.1", start_date: "03-04-2018 00:00", duration: 1, 
	parent: 1},
{id: 3, text: "Task #2.2", start_date: "05-04-2018 00:00", duration: 2, 
	parent: 1},
{id: 4, text: "Task #2.3", start_date: "08-04-2018 00:00", duration: 1, 
	parent: 1}
~~~

The task "Task#2" is splitted and rendered as a set of its child tasks: "Task#2.1", "Task#2.2" and "Task#2.3".

{{sample  04_customization/11_split_task.html}}


###Switching split mode via lightbox

You can configure the lightbox so that it allows switching the split mode for the task on and off. For this you can add a new section with a checkbox into the lightbox via the **gantt.config.lightbox.project_sections** and
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

The result will look like this:

![Split task checkbox](desktop/split_task_checkbox.png)

When the checkbox will be unchecked, a splitted task will be rendered as a project with subtasks.


##Checking if task is split

You can check whether a task is split with the help of the api/gantt_issplittask.md method. It takes the task object as an argument and returns true, if the task is split.

~~~js
var task = gantt.getTask(1);
if(gantt.isSplitTask(task)){
  ...
}

~~~


@todo: needs improving of the structure