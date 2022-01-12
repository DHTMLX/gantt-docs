onBeforeTaskMove
=============
@short:fires before a task is moved to a new vertical position
	


@params: 
- id			string,number			the id of the task to move
- parent		string,number			the parent id
- tindex		number					the index of the position in the parent branch that the task will be moved to 

@example:
//prevent moving to another sub-branch:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
	var task = gantt.getTask(id);
	if(task.parent != parent)
		return false;
	return true;
});

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 


@relatedapi: 
	api/gantt_movetask.md
	api/gantt_onaftertaskmove_event.md
@template:	api_event
@descr:
The event is blockable. Return *false* to cancel moving of the task.

Note, the event fires in 2 cases:

1. While calling the method api/gantt_movetask.md 
2. While the option api/gantt_order_branch_config.md is enabled in the default mode (*gantt.config.order_branch = true;*) and a user drags tasks 