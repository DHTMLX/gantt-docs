Adding Milestones
================================
Milestones are tasks with zero duration that are used to mark out important dates of the project, some key events or goals.
You may use milestones, for example, to highlight dates of review meetings or dates of expected completion for project's phases. <br>

Programmatically, a milestone is one of [predefined types of tasks](desktop/task_types.md). But it's handled as [a regular task](desktop/task_types.md), i.e. it trigger the same events and templates. 

<img style="border: 1px #C4C4C5 solid;margin: 20px auto 20px auto;display: block;box-shadow: #D8D8D8 0px 0px 7px 1px;" src="desktop/type_milestone.png">
{{sample
01_initialization/16_projects_and_milestones.html
}}

<br>

**Generally, to provide a possibility to  add milestones to a chart:**

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
var tasks = {
    data:[
    	{id:1, text:"Project #1",    type:gantt.config.types.project,    open:true}, 
        {id:2, text:"Task #1",       start_date:"12-04-2013", duration:3, parent:1},
        {id:3, text:"Alpha release", type:gantt.config.types.milestone,   parent:1, /*!*/
            start_date:"14-04-2013"}],                                              /*!*/
    links:[]
};
~~~


@edition: pro