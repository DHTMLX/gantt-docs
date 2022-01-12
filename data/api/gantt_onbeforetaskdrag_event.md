onBeforeTaskDrag
=============

@short: fires after the user has pressed the mouse button and started dragging, but before dhtmlxGantt starts the drag-and-drop operation


@params:

- id			string,number		the task id
- mode			string 				the drag-and-drop mode ("resize", "progress", "move", "ignore")
- e				Event				a native event object

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    //any custom logic here
	return true;
});

@template:	api_event
@descr:
The event fires when the user drags a task in the timeline area.

The event is blockable. Return *false* and the task will be backed to the initial position.
@relatedapi:
	api/gantt_drag_mode_config.md
	api/gantt_onaftertaskdrag_event.md
    api/gantt_onbeforetaskchanged_event.md
@relatedsample:
	08_api/01_dnd_events.html
@related:
	desktop/dnd.md