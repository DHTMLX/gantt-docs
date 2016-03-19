onAfterTaskDrag
=============

@short: fires after the user has finished to drag and released the mouse button


@params:

- id			string/number			the task id
- mode			string 					the drag-and-drop mode ("resize", "progress", "move", "ignore")
- e				Event					a native event object

@example:
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
	//any custom logic here
});

@template:	api_event
@descr:
@relatedapi:
	api/gantt_drag_mode_config.md
	api/gantt_onbeforetaskdrag_event.md
    api/gantt_onbeforetaskchanged_event.md
