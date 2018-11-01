Reordering Tasks
=====================

dhtmlxGantt provides 2 ways to reorder tasks in the grid:

1. Drag-and-drop.
2. Sorting (see [details](desktop/sorting.md)).

The ways are alternative. By default, both modes are disabled. 

To enable drag-n-drop reordering, use the api/gantt_order_branch_config.md option: 

~~~js
gantt.config.order_branch = true;
gantt.init("gantt_here");
~~~

{{sample	07_grid/02_branch_ordering.html}}
 
 
Improving performance for large datasets
------------------
 
If your Gantt contains lots of tasks, the default mode of branch reordering may slow down the performance.
To speed it up, you can make use of the "marker" mode. 

~~~js
gantt.config.order_branch = "marker";
~~~

{{sample 07_grid/14_branch_ordering_highlight.html}}

In this mode only the name of the task is reordered (on holding the left mouse key) and Gantt is re-rendered only when a task is dropped in the target position (on releasing the key).
Unlike the default mode, changing of the task position doesn't involve firing of the onBeforeTaskMove/onAfterTaskMove events.

To prevent dropping of a task in a particular position, use the onBeforeRowDragMove event instead (works only in the "marker" mode).
 
 
Drag-n-drop within the whole Gantt structure
--------------------------------------------

The api/gantt_order_branch_config.md option allows dragging tasks within the same Tree level.

It's also possible to enable the mode in which tasks can be reordered within the whole Gantt. It means that a task can replace another task of any Tree level.
To use this type of tasks reordering, use the api/gantt_order_branch_free_config.md option:

~~~js
// reordering tasks within the whole gantt
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
~~~
 
{{sample
07_grid/08_drag_between_levels.html
}} 

Denying dropping to specific positions
------------------------------------------------

To deny dropping tasks to specific positions, use the api/gantt_onbeforetaskmove_event.md or api/gantt_onbeforerowdragend_event.md event:

~~~js
//prevent moving to another sub-branch:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});

//or
gantt.attachEvent("onBeforeRowDragEnd", function(id, target) {
	var task = gantt.getTask(id);
    if(task.parent != target.parent)
        return false;
    return true;
});

~~~


Highlighting available drop places while drag-&-drop
------------------------------------------------------------

To highlight available target places during dragging (for example, it's not possible to drag the root node under another root and you want visually inform the user about this), 
use the api/gantt_onrowdragstart_event.md and api/gantt_onrowdragend_event.md events: 

~~~js
gantt.config.order_branch = true;// order tasks only inside a branch
gantt.init("gantt_here");
gantt.parse(demo_tasks);

var drag_id = null;
gantt.attachEvent("onRowDragStart", function(id, target, e) {
	drag_id = id;
    return true;
});
gantt.attachEvent("onRowDragEnd", function(id, target) {
	drag_id = null;
    gantt.render();
});

gantt.templates.grid_row_class = function(start, end, task){
	if(drag_id && task.id != drag_id){
    	if(task.$level != gantt.getTask(drag_id).$level)
        	return "cant-drop";
		}
	return "";
};
~~~

@todo:
check order_branch="marker"
