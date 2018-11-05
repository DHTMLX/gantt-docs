onBeforeRowDragEnd
=============

@short:
 fires when a user drops a row in the grid
	

@params:
- sid			string,number			the id of the task to move
- parent		string,number			the parent id. If specified, the <b>tindex</b> will  refer to the  index in the <br> <b>'parent'</b> branch
- tindex		number					the index of the position that the task will be moved from <br> (the index in the whole tree)

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
- When event is fired the task is already moved to a new position, but the changes still can be reverted.
- The event is blockable. Return *false* operation and move task to it's original location
- Original position (parent and index) are available from handler arguments
- Target position can be retrieved from a task object as [task.parent](desktop/task_tree_operations.md#parentofatask) and [gantt.getGlobalTaskIndex(taskId)](api/gantt_getglobaltaskindex.md)

@relatedapi:
	api/gantt_onrowdragend_event.md
	api/gantt_onrowdragstart_event.md
@relatedsample:
	07_grid/02_branch_ordering.html
@related:
	desktop/reordering_tasks.md
    
    
