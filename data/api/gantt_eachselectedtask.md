eachSelectedTask
=============

@short:iterates over all selected tasks in the Gantt chart
	

@params:
- code 	function	a function that will iterate over tasks. Takes a task object as a parameter



@example:
gantt.batchUpdate(function () {
	gantt.eachSelectedTask(function(task_id){
    	if(gantt.isTaskExists(task_id))
        	gantt.deleteTask(task_id);
    });
});
            
@template:	api_method
@descr:

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
