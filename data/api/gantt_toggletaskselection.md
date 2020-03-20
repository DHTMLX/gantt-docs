toggleTaskSelection
=============
@short:selects the specified task if it was unselected and vice versa
	

@params:
- task		string/number		the task's id




@example:
gantt.toggleTaskSelection("t_1"); 
gantt.render();

@template:	api_method
@descr:

This method is defined in the **multiselect.js** extension, so you need to activate the [multiselect](desktop/extensions_list.md#multitaskselection) plugin. Read the details in the desktop/multiselection.md article.

@relatedapi:
	api/gantt_eachselectedtask.md
    api/gantt_getlastselectedtask.md
    api/gantt_getselectedtasks.md
    api/gantt_multiselect_config.md
    api/gantt_multiselect_one_level_config.md
    api/gantt_isselectedtask.md

@related:
	desktop/multiselection.md
    
