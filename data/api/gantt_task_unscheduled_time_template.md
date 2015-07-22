task_unscheduled_time
=============

@short:
	specifies the dates of unscheduled tasks

@type:

@params:
- task		object			the task object	


@example:
gantt.templates.task_unscheduled_time = function(task){
   return "";
};

@template:	api_template
@descr:
by default, returns an empty string 

@related:
desktop/crud_task.md#addingunscheduledtasks

@relatedsample:
01_initialization/19_tasks_without_dates.html

@relatedapi:
api/gantt_show_unscheduled_config.md