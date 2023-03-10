Milestones
============

{{pronote This functionality is available only in the PRO edition }}

Milestones are tasks with zero duration that are used to mark out important dates of the project, some key events or goals.
You may use milestones, for example, to highlight dates of review meetings or dates of expected completion of project's phases. <br>

Programmatically, a milestone is one of [predefined types of tasks](desktop/task_types.md). But it's handled as [a regular task](desktop/task_types.md), i.e. it triggers the same events and templates. 

<img style="border: 1px #C4C4C5 solid;margin: 20px auto 20px auto;display: block;box-shadow: #D8D8D8 0px 0px 7px 1px;" src="desktop/type_milestone.png">
{{sample
01_initialization/16_projects_and_milestones.html
}}

<br>

**Generally, to provide a possibility to add milestones to a chart:**

<ol>
	<li>Add an extra section to the lightbox - desktop/typeselect.md -  that will let your users to change the type of tasks and select milestones. <br> <br>
~~~js
gantt.config.lightbox.sections = [
	{name: "description", height: 70, map_to: "text", type: "textarea"},
	{name: "type", type: "typeselect", map_to: "type"},
	{name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~
	</li>
	<li>Define the api/gantt_rightside_text_template.md or api/gantt_leftside_text_template.md template to set a text label for a milestone. <i> Note, the label set with  the api/gantt_task_text_template.md template is not  displayed 
    as milestones have zero duration.</i> <br> <br>
~~~js
gantt.templates.rightside_text = function(start, end, task){
	if(task.type == gantt.config.types.milestone){
		return task.text;
	}
	return "";
};
~~~
    </li>
	<li> Enable the api/gantt_order_branch_config.md property to simplify things for your end users. <i>The option enables dragging tasks within the parent branch and will let your users create milestones at any place but
    then drag them to the right positions. </i> <br> <br>
~~~js
gantt.config.order_branch = true;
~~~
    </li>
</ol>

After you have been completed these steps, your Gantt chart is fully ready to work with milestones.

<img style="border: 1px #C4C4C5 solid;margin: 20px auto 20px auto;display: block;box-shadow: #D8D8D8 0px 0px 7px 1px;" src="desktop/milestone_lightbox.png">

{{sample
01_initialization/16_projects_and_milestones.html
}}

Specifying milestones in a data set
----------------------------------------------

To define milestones in the initial data set, set the [type](desktop/loading.md#specifyingdataproperties) property of a data item to the **'milestone'** value (*values are stored in the api/gantt_types_config.md object*):
~~~js
var data = {
    tasks:[
    	{id:1, text:"Project #1",    type:gantt.config.types.project,    open:true}, 
        {id:2, text:"Task #1",       start_date:"12-04-2020", duration:3, parent:1},
        {id:3, text:"Alpha release", type:gantt.config.types.milestone,   parent:1, /*!*/
            start_date:"14-04-2020"}],                                              /*!*/
    links:[]
};
~~~

Rollup tasks and milestones
-------------------------

Starting with v7.1, there is the ability to show [tasks](desktop/task_types.md#regulartasks) and [milestones](desktop/task_types.md#milestones) on their parent projects. For that, you need to set the **rollup** property of a data item to *true*:

~~~js
var data = {
    tasks:[
        {id:11, text:"Project #1", type:"project", progress: 0.6, open: true},
		{id:12, text:"Task #1", start_date:"03-04-2018", duration:"3",
			parent:"11", progress: 1, open: true},
		{id:13, text:"Task #2", start_date:"03-04-2018", type:"project", 
			parent:"11", progress: 0.5, open: true},
		{id:16, text:"Final milestone", start_date:"08-04-2018", type:"milestone",  /*!*/
			rollup: true, parent:"11", progress: 0, open: true},  /*!*/
		{id:17, text:"Task #2.1", start_date:"03-04-2018", duration:"2", 
			parent:"13", progress: 1, open: true},
		{id:18, text:"Task #2.2", start_date:"06-04-2018", duration:"1",   
			parent:"13", progress: 0.8, open: true}],  
    links:[]
};
~~~

The result will be as in:

<img style="border: 1px #C4C4C5 solid;margin: 20px auto 20px auto;display: block;box-shadow: #D8D8D8 0px 0px 7px 1px;" src="desktop/rollup_milestone.png">

There is also the ability to switch the rollup functionality via the **Rollup** checkbox in the lightbox:


~~~js
gantt.config.lightbox.milestone_sections = [
	{name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
	{name: "rollup", type: "checkbox", map_to: "rollup"},/*!*/
	{name: "hide_bar", type: "checkbox", map_to: "hide_bar"},
	{name: "type", type: "typeselect", map_to: "type"},
	{name: "time", type: "duration", map_to: "auto"}
];
~~~

<img style="border: 1px #C4C4C5 solid;margin: 20px auto 20px 20px;display: block;box-shadow: #D8D8D8 0px 0px 7px 1px;" src="desktop/rollup.png">

{{sample 01_initialization/21_rollup_tasks.html}}

Hiding tasks and milestones
---------------------------

Starting with v7.1, you can hide [task bars](desktop/task_types.md#regulartasks) and [milestones](desktop/task_types.md#milestones) in the timeline area via setting the **hide_bar: true** property of a data item:

~~~js
var data = {
    tasks:[
        {id:11, text:"Project #1", type:"project", progress: 0.6, open: true},
        {id:12, text:"Task #1", start_date:"03-04-2018", duration:"3",
            parent:"11", progress: 1},
        {id:13, text:"Task #2", start_date:"03-04-2018", type:"project", 
            parent:"11", progress: 0.5, open: true},
        {id:16, text:"Final milestone", start_date:"08-04-2018", type:"milestone",  /*!*/
            rollup: true, hide_bar: true, parent:"11", progress: 0},  /*!*/
        {id:17, text:"Task #2.1", start_date:"03-04-2018", duration:"2", 
            parent:"13", progress: 1},
        {id:18, text:"Task #2.2", start_date:"06-04-2018", duration:"1",   
            parent:"13", progress: 0.8}],  
    links:[]
};
~~~

The result will look like this:

<img style="border: 1px #C4C4C5 solid;margin: 20px auto 20px auto;display: block;box-shadow: #D8D8D8 0px 0px 7px 1px;" src="desktop/hide_milestone.png">

**Note**, that if both the **hide_bar:true** and **rollup:true** properties are specified for the data item, the item will be hidden in the timeline but shown on the parent project.

{{note
To hide all rollup items from the project task, set **rollup:false** in the [project](desktop/task_types.md#projecttasks) object (from v8.0):

~~~js
{ id:11, text:"Project #1", type:"project", rollup:false, open: true }
~~~
}}

<br>
You can hide the necessary task/milestone in the timeline area via switching the **Hide bar** checkbox in the lightbox:

~~~js
gantt.config.lightbox.sections = [
	{name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
	{name: "rollup", type: "checkbox", map_to: "rollup"},
	{name: "hide_bar", type: "checkbox", map_to: "hide_bar"},  /*!*/
	{name: "type", type: "typeselect", map_to: "type"},
	{name: "time", type: "duration", map_to: "auto"}
];

gantt.config.lightbox.milestone_sections = [
	{name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
	{name: "rollup", type: "checkbox", map_to: "rollup"},
	{name: "hide_bar", type: "checkbox", map_to: "hide_bar"},  /*!*/
	{name: "type", type: "typeselect", map_to: "type"},
	{name: "time", type: "duration", map_to: "auto"}
];

gantt.config.lightbox.project_sections = [
	{name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
	{name: "hide_bar", type: "checkbox", map_to: "hide_bar"},  /*!*/
	{name: "type", type: "typeselect", map_to: "type"},
	{name: "time", type: "duration", map_to: "auto"}
];

~~~

<img style="border: 1px #C4C4C5 solid;margin: 20px auto 20px 20px;display: block;box-shadow: #D8D8D8 0px 0px 7px 1px;" src="desktop/hide_bar.png">

{{sample 01_initialization/21_rollup_tasks.html}}

## API overview

There is an event that can be used to control the process of display of rollup tasks on their parent projects:

- api/gantt_onbeforerolluptaskdisplay_event.md

~~~js
// before the rollup task is displayed on its parent project 
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // any custom logic here
    return false;
});
~~~

## Styling separate rollup items

From v8.0, rollup items come into template functions with the *task.$rendered_at* property which contains the id of a row the rollup item is rendered at. Thus, to style specific rollup items based on the row they are displayed at, you may use the api/gantt_task_class_template.md template:

~~~js
gantt.templates.task_class = function(start, end, task) {
    if(task.$rendered_at) {
        if(gantt.calculateTaskLevel(gantt.getTask(task.$rendered_at)) === 1) {
            return "phase-level-rollup";
        }
    }
    return "";
};
~~~

@edition: pro