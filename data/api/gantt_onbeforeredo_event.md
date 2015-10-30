onBeforeRedo
=============

@short:
	fires before the api/gantt_redo.md method is called

@params:

@returns:

- result     boolean       defines whether the default action of the event will be triggered (true) or canceled (false) 

@example:
gantt.attachEvent("onBeforeRedo",function(){
	// your code here
});

@template:	api_event
@descr:
the event is blockable, returning *false* will cancel further processing
@relatedapi:
- api/gantt_redo.md
- api/gantt_onafterredo_event.md

@relatedsample:
02_extensions/14_undo.html