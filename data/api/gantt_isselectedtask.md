isSelectedTask
=============
@short:checks whether the specified task is currently selected
	


@params:
- task	string,number	the task's id


@returns:
- value	boolean	'true' if the specified task is currently selected, otherwise - 'false'


@example:
gantt.templates.task_class = gantt.templates.grid_row_class = gantt.templates.task_row_class = function (start, end, task) {
	if (gantt.isSelectedTask(task.id))
		return "gantt_selected";
};

@template:	api_method
@descr:

@relatedsample:
	02_extensions/09_multiselection.html
@relatedapi:
	api/gantt_eachselectedtask.md
    api/gantt_getlastselectedtask.md
    api/gantt_getselectedtasks.md
    api/gantt_multiselect_config.md
    api/gantt_multiselect_one_level_config.md
    api/gantt_toggletaskselection.md
@related:
	desktop/multiselection.md
    