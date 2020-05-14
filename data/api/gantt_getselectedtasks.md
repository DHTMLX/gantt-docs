getSelectedTasks
=============
@short:returns an array of the currently selected tasks
	

@params:


@returns:
- tasks 	array	an array of tasks' ids



@example:
gantt.getSelectedTasks();

@template:	api_method
@descr:
{{note This method is defined in the **multiselect.js** extension, so you need to activate the [multiselect](desktop/extensions_list.md#multitaskselection) plugin. Read the details in the desktop/multiselection.md article.}}


@relatedapi:
	api/gantt_batchupdate.md
	api/gantt_eachselectedtask.md
    api/gantt_getlastselectedtask.md
    api/gantt_multiselect_config.md
    api/gantt_multiselect_one_level_config.md
    api/gantt_isselectedtask.md
    api/gantt_toggletaskselection.md
@related:
	desktop/multiselection.md