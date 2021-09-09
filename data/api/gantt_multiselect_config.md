multiselect
=============
@short:enables/disables multi-task selection in the Gantt chart
	

@type: boolean
@default:true
@example:
gantt.config.multiselect = false; //disables multi-task selection
gantt.init('gantt_here');

@template:	api_config
@descr:

{{note This option is defined in the **multiselect** extension, so you need to activate the [multiselect](desktop/extensions_list.md#multitaskselection) plugin. Read the details in the desktop/multiselection.md article.}}



@relatedapi:
	api/gantt_eachselectedtask.md
    api/gantt_getlastselectedtask.md
    api/gantt_getselectedtasks.md
    api/gantt_multiselect_one_level_config.md
    api/gantt_isselectedtask.md
    api/gantt_toggletaskselection.md
@related:
	desktop/multiselection.md