onBeforeTaskChanged
=============

@short: fires after the user has finished dragging and released the mouse button but before the changes are applied


@params:

- id	string,number	the task id
- mode	string 			the drag-and-drop mode ("resize", "progress", "move", "ignore")
- task  object			the task object

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, task){
    //any custom logic here
	return true;
});

@template:	api_event
@descr:

- The event fires when the user drags a task in the timeline area.
- The event is blockable. Return *false* to cancel the drag operation.
- The event fires before the api/gantt_onaftertaskdrag_event.md event.

@relatedapi:
	api/gantt_drag_mode_config.md
	api/gantt_onaftertaskdrag_event.md

