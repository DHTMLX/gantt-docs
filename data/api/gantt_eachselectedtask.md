eachSelectedTask
=============

@short:iterates over all selected tasks in the Gantt chart
	

@params:
- code 	function	a function that will iterate over tasks. Takes a task id as a parameter



@example:
gantt.batchUpdate(function () {
	gantt.eachSelectedTask(function(task_id){
    	if(gantt.isTaskExists(task_id))
        	gantt.deleteTask(task_id);
    });
});
            
@template:	api_method
@descr:

{{note This method is defined in the **multiselect.js** extension, so you need to activate the [multiselect](desktop/extensions_list.md#multitaskselection) plugin. Read the details in the desktop/multiselection.md article.}}

@relatedsample:	
	02_extensions/09_multiselection.html
@related:
	desktop/multiselection.md
@relatedapi:
	api/gantt_eachtask.md
    api/gantt_getlastselectedtask.md
    api/gantt_getlastselectedtask.md
    api/gantt_multiselect_config.md
    api/gantt_multiselect_one_level_config.md
    api/gantt_isselectedtask.md
    api/gantt_toggletaskselection.md
    api/gantt_batchupdate.md
