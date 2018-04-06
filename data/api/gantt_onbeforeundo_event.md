onBeforeUndo
=============

@short:
	fires before the api/gantt_undo.md method is called

@params:

@returns:

- result     boolean       defines whether the default action of the event will be triggered (true) or canceled (false) 

@example:
gantt.attachEvent("onBeforeUndo",function(){
	// your code here
    return true;
});

@template:	api_event
@descr:
the event is blockable, returning *false* will cancel further processing
@relatedapi:
- api/gantt_undo.md
- api/gantt_onafterundo_event.md

@relatedsample:
02_extensions/14_undo.html

@changelog:
added in version 4.0

@related:
desktop/undo_redo.md