onTaskDrag
=============
@short:fires when the user drags a task
	

@params:
- id			string,number		the task id
- mode			string				the drag mode ("resize", "progress", "move", "ignore")
- task			object				the current (dragged) task object
- original 		object				the original(initial) task object
- e				Event				a native event object


@example:
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    //any custom logic here
});

@template:	api_event
@descr:
The event:

- Fires each time the user makes a drag movement with the mouse in the timeline area: moves, resizes a task or changes the task's progress.
- The type of a drag movement is passed as the 2nd argument - **mode**.
- All available values of the drag movement's type are stored in the api/gantt_drag_mode_config.md property.


Shortly, all happens in the following order:

1. The user makes a move.
2. dhtmlxGantt recalculates the task's  date according to the new position.
3. dhtmlxGantt fires the api/gantt_ontaskdrag_event.md event.
4. dhtmlxGantt re-renders the task in the Gantt chart.

@relatedsample:
	08_api/05_limit_drag_dates.html
	08_api/02_constraints.html
@related:
	desktop/dnd.md#denyingdraggingtasksoutofspecificdates
	desktop/how_to.md#howtohaveaninfinitescrollinthetimeline
@relatedapi:
	api/gantt_onbeforetaskdrag_event.md
    api/gantt_onaftertaskdrag_event.md
    api/gantt_drag_mode_config.md
	