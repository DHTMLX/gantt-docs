onBeforeRowDragEnd
=============

@short:fires before the user drops a row in  the grid
	

@params:
- sid		string, number		the id of the task to move
- parent	string, number	the parent id. If specified, the <b>tindex</b> will  refer to the  index in the <br> <b>'parent'</b> branch
- tindex	number		the index of the position that the task will be moved to <br> (the index in the whole tree)

@example:
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){
	var task = gantt.getTask(id);
	if(task.parent != parent)
		return false;
	return true;
});
@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@template:	api_event
@descr:
The event is blockable. Return *false* to cancel adding of the task.

@relatedapi:
	api/gantt_onrowdragend_event.md
	api/gantt_onrowdragstart_event.md
@relatedsample:
	07_grid/02_branch_ordering.html
@related:
	desktop/reodering_tasks.md
    
    
