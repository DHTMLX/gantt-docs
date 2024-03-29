order_branch
=============

@short:activates the 'branch' mode that allows vertically reordering tasks within the same tree level
	
@values:true,false,"marker"    
@default:false
@type:string,boolean 
@example:
gantt.config.order_branch = true;

gantt.init("gantt_here");

@template:	api_config
@descr:
This option allows reordering tasks, while saving their tree level position. For example, a subtask will never become the parent task.

###Increasing performance

If your Gantt contains lots of tasks, the default mode of branch reordering may slow down the performance.
To speed it up, you can make use of the **"marker"** mode. 

~~~js
gantt.config.order_branch = "marker";
~~~

{{sample 07_grid/14_branch_ordering_highlight.html}}

In this mode only the name of the task is reordered (on holding the left mouse key) and Gantt is re-rendered only when a task is dropped in the target position (on releasing the key).
Unlike the default mode, changing of the task position doesn't involve firing of the onBeforeTaskMove/onAfterTaskMove events.

To prevent dropping of a task in a particular position, use the api/gantt_onbeforerowdragmove_event.md event instead (works only in the "marker" mode).

@relatedsample:
	07_grid/02_branch_ordering.html
    
@related:
	desktop/reordering_tasks.md
    
@relatedapi:
api/gantt_order_branch_free_config.md
api/gantt_onaftertaskmove_event.md
api/gantt_onbeforetaskmove_event.md
api/gantt_onbeforerowdragmove_event.md

