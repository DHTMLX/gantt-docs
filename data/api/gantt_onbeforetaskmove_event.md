onBeforeTaskMove
=============
@short:fires before a task is moved to a new position
	


@params: 
- sid		string, number		the id of the task to move
- parent	string, number	the parent id. If specified, the <b>tindex</b> will  refer to the  index in the <br> <b>'parent'</b> branch
- tindex	number		the index of the position that the task will be moved to <br> (the index in the whole tree)

@example:
//prevent moving to another sub-branch:
gantt.attachEvent("onBeforeTaskMove", function(sid, parent, tindex){
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
The event is blockable. Return *false* to cancel adding of the task.

Note, the event fires in 2 cases:

1. While calling the method api/gantt_movetask.md 
2. While the option api/gantt_order_branch_config.md is enabled and a user drags tasks 