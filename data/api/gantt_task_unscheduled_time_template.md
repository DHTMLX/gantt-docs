task_unscheduled_time
=============

@short:
	specifies the dates of unscheduled tasks

@type:

@params:
- task		Task			the task object	


@example:
gantt.templates.task_unscheduled_time = function(task){
   return "";
};

@template:	api_template
@descr:
By default, returns an empty string.

If a task is [unscheduled](desktop/unscheduled_tasks.md), i.e. has the `unscheduled:true` property in its configuraion object, all its dates will be rendered with empty rows. 
Check the example below:

{{editor	https://snippet.dhtmlx.com/t6skfgjx		Rendering dates in unscheduled tasks}}

In case you need to show some dates for an unscheduled task, you can do it with the help of the api/gantt_date_grid_template.md template.

@related:
desktop/crud_task.md#addingunscheduledtasks

@relatedsample:
01_initialization/19_tasks_without_dates.html

@relatedapi:
api/gantt_show_unscheduled_config.md