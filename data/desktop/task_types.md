Task Types
==============

{{pronote This functionality is available only in the PRO edition. }}

There are 3 predefined types of tasks that you can present in a Gantt chart ([you can also add a custom type](desktop/task_types.md#creatingacustomtype)):

1. [A regular task (default)](desktop/task_types.md#regulartasks).
2. [A project task](desktop/task_types.md#projecttasks).
3. [A milestone](desktop/task_types.md#milestones).


<img style="border: 1px #C4C4C5 solid;margin: 20px auto 20px auto;display: block;box-shadow: #D8D8D8 0px 0px 7px 1px;"  src="desktop/task_types.png"/>


To set the type of a task, use the [type](desktop/task_properties.md) property of a data item (*values are stored in the api/gantt_types_config.md object*):

{{snippet
Specifying the type of a task in the data set
}}

~~~js
const data = {
	tasks: [
		{ id: 1, text: "Project #1", type: "project", open: true },
		{ id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1 },
		{ id: 3, text: "Alpha release", start_date: "16-04-2025", type: "milestone",
			parent: 1 },
		{ id: 4, text: "Task #2", start_date: "17-04-2025", duration: 3, parent: 1 },
	],
	links: [
		{ id: 1, source: "1", target: "2", type: "1" },
		{ id: 2, source: "2", target: "3", type: "0" },
		{ id: 3, source: "3", target: "4", type: "0" },
	],
};
~~~

{{sample
01_initialization/16_projects_and_milestones.html
}}



Regular tasks
-----------------

By default, dhtmlxGantt provides creating of regular tasks (tasks with **type="task"**).

<img style="border: 1px #C4C4C5 solid;margin: 20px auto 20px auto;display: block;box-shadow: #D8D8D8 0px 0px 7px 1px;" src="desktop/type_task.png">

{{snippet
Specifying regular tasks
}}

~~~js
const data = {
	tasks: [
		{ id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1 }, /*!*/
	],
	links: [],
};
//or
const data = {
	tasks: [
		{ id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1, /*!*/
			type: "task" }, /*!*/
	],
	links: [],
};
~~~

{{sample
01_initialization/16_projects_and_milestones.html
}}

<br>

Tasks with **type="task"** can be characterized as follows:

- Can have 1 parent and any number of child tasks.
- Can be dragged and resized. 
- Doesn't depend on child tasks, i.e. if the user dragges a child of a regular task, the task doesn't change its duration or progress respectively.
- Can appear on the parent projects. See [details](desktop/milestones.md#rolluptasksandmilestones).
- Can be hidden in the timeline. See [details](desktop/milestones.md#hidingtasksandmilestones).



Project tasks
-----------------

Project task is a task that starts, when its earliest child task starts, and ends, when its latest child ends.

{{note
The difference between project and regular tasks is that the duration of a project task depends on its children and is changed respectively.
}}

<img style="border: 1px #C4C4C5 solid;margin: 20px auto 20px auto;display: block;box-shadow: #D8D8D8 0px 0px 7px 1px;" src="desktop/type_project.png">


{{snippet
Specifying project tasks
}}

~~~js
const data = {
	tasks: [
		{ id: 1, text: "Project #1", type: "project", open: true }, /*!*/
		{ id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1 },
		{ id: 3, text: "Alpha release", start_date: "16-04-2025", type: "milestone",
			parent: 1 },
		{ id: 4, text: "Task #2", start_date: "17-04-2025", duration: 3, parent: 1 },
	],
	links: [],
};
~~~

{{sample
01_initialization/16_projects_and_milestones.html
}}

<br>

Tasks with **type="project"** can be characterized as follows:

- Can have 1 parent and any number of child tasks.
- Cannot be dragged and resized, unless drag and drop is explicitly enabled via the api/gantt_drag_project_config.md config.
- Depend on children tasks, i.e. if the user drags a child of a project task, the task changes its duration.
- Ignore the **start_date**, **end_date**, **duration** properties.
- Can't be dragged if have no children tasks.
- Project's **progress** is specified explicitly and doesn't depend on subtasks by default. If you want it to be calculated automatically you'll have to write code for it. [Check the examples](desktop/how_to.md#howtocalculatetaskprogressdependingonchildtasks).

{{note
To provide a possibility of adding project tasks, read article desktop/milestones.md. A possibility to add milestones guarantees that your end users can add project tasks as well.
}}



Milestones
--------------------------------------------------------

[Milestone](desktop/milestones.md) is a zero-duration task that is used to mark out important dates of the project ([more details](desktop/milestones.md)).

<img style="border: 1px #C4C4C5 solid;margin: 20px auto 20px auto;display: block;box-shadow: #D8D8D8 0px 0px 7px 1px;" src="desktop/type_milestone.png">


{{snippet
Specifying milestones
}}
~~~js
const data = {
	tasks: [
		{ id: 3, text: "Alpha release", start_date: "16-04-2025", type: "milestone", /*!*/
			parent: 1 }, /*!*/
	],
	links: [],
};
~~~

{{sample
01_initialization/16_projects_and_milestones.html
}}

<br>

Tasks with **type="milestone"** can be characterized as follows:

- Can have 1 parent and any number of child tasks.
- Cannot be dragged and resized.
- Have zero duration and preserve it all the time.
- Ignore the **end_date**, **duration**, **progress** properties.
- Can appear on the parent projects. See [details](desktop/milestones.md#rolluptasksandmilestones).
- Can be hidden in the timeline. See [details](desktop/milestones.md#hidingtasksandmilestones).

{{note
To provide a possibility of adding milestones, read article desktop/milestones.md.
}}



Specific lightbox per task type
----------------------------------------------

Each type of a task has its own set of characteristics. That's why an individual configuration of the details form (lightbox) can be defined for each type.
All configurations are stored in the api/gantt_lightbox_config.md object.

They are:

- **gantt.config.lightbox.sections** - for regular tasks.
- **gantt.config.lightbox.project_sections** - for project tasks.
- **gantt.config.lightbox.milestone_sections** - for milestones.

The default configuration settings are the following:

~~~js
gantt.config.lightbox.sections = [
	{ name: "description", type: "textarea", map_to: "text", height: 70, focus: true },
	{ name: "time", type: "duration", map_to: "auto" }
];

gantt.config.lightbox.project_sections = [
	{ name: "description", type: "textarea", map_to: "text", height: 70, focus: true },
	{ name: "type", type: "typeselect", map_to: "type" },
	{ name: "time", type: "duration", map_to: "auto", readonly: true }
];

gantt.config.lightbox.milestone_sections = [
	{ name: "description", type: "textarea", map_to: "text", height: 70, focus: true },
	{ name: "type", type: "typeselect", map_to: "type" },
	{ name: "time", type: "duration", map_to: "auto", single_date: true }
];
~~~

When a user changes the type of a task in the related select, the corresponding configuration is applied to the the lightbox popup and it is updated dynamically.

You can [add a custom type](desktop/task_types.md#creatingacustomtype) and specify an appropriate structure of the lightbox for it as well.

To go into details on a lightbox configuration, you can read the desktop/edit_form.md chapter.



Creating a custom type
-----------------------------------------------

All tasks' types are defined in the api/gantt_types_config.md object. <br>Generally, to add a custom tasks' type you need to:

1. Add a new value to the api/gantt_types_config.md object.
2. Define individual settings for the new type.

Let's assume, you want to add a new type of tasks - **meeting**.
**Meeting**  will be an ordinary task but colored in different color and with different inputs in the lightbox.

<img style="border: 1px #C4C4C5 solid;margin: 20px auto 20px auto;display: block;box-shadow: #D8D8D8 0px 0px 7px 1px;" src="desktop/custom_task_type.png">

To define a new type with the name **meeting** and specify an individual lightbox for it, use the following technique:

<ol>
	<li>Add a new type to the api/gantt_types_config.md object:<br><br>

~~~js
gantt.config.types.meeting = "type_id";
~~~

<i>
where "meeting" is a programmatic name of the type. It doesn't affect anything. The only purpose of the programmatic type name is to make work with types more readable.<br>
"type_id" is the type identifier, that will be stored in the database. The type identifier must be unique within the <a href="api/gantt_types_config.md ">types</a> object.</i>
<br><br>
	</li>
	<li>Set the label for the new type in the "typeselect" control:<br><br>

~~~js
gantt.locale.labels.type_meeting = "Meeting";
~~~

<br>
</li>
<li>Specify a new structure of the lightbox for the newly-created type:<br><br>

~~~js
gantt.config.lightbox.meeting_sections = [
	{ name: "title", type: "textarea", map_to: "text", height: 20, focus: true },
	{ name: "details", type: "textarea", map_to: "details", height: 70 },
	{ name: "type", type: "typeselect", map_to: "type" },
	{ name: "time", type: "time", map_to: "auto", height: 72 }
];

gantt.locale.labels.section_title = "Subject";
gantt.locale.labels.section_details = "Details";
~~~
<br>
	</li>
<li>Specify a style for the new type and apply it using the api/gantt_task_class_template.md template:<br><br>

~~~html
.meeting_task{
	border:2px solid #BFC518;
	color:#6ba8e3;
	background: #F2F67E;
}

.meeting_task .gantt_task_progress{
	background:#D9DF29;
}
~~~

~~~js
gantt.templates.task_class = (start, end, task) => {
	return task.type === gantt.config.types.meeting 
		? "meeting_task" 
		: "";
};
~~~
<br>
</li>
	<li>Set the template for text of the "meeting" tasks using the api/gantt_task_text_template.md template: <br><br>

~~~js
gantt.templates.task_text = (start, end, task) =>
	task.type === gantt.config.types.meeting
		? `Meeting: <b>${task.text}</b>`
		: task.text;
~~~
	</li>
</ol>

{{sample
04_customization/12_custom_task_type.html
}}



Custom display of task types
-----------------------------------------------------------------

To customize the look of existing task types, use the api/gantt_type_renderers_config.md option. The options allows you to redefine functions responsible for displaying different tasks types on the page.

<img src="desktop/custom_look.png"/>

~~~js
gantt.config.type_renderers["project"] = (task, defaultRender) => {
    const taskBar = document.createElement("div");
    taskBar.setAttribute(gantt.config.task_attribute, task.id);
    taskBar.className = "custom-project";

    const taskSize = gantt.getTaskPosition(task);
    taskBar.innerHTML = [
        "<div class='project-left'></div>",
        "<div class='project-right'></div>"
    ].join('');

    taskBar.style.left = `${taskSize.left}px`;
    taskBar.style.top = `${taskSize.top + 7}px`;
    taskBar.style.width = `${taskSize.width}px`;

    return taskBar;
};
~~~

{{sample
04_customization/17_classic_gantt_look.html
}}
