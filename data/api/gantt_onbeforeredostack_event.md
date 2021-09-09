onBeforeRedoStack
=============

@short:
	 fires before an action is added into the redo stack

@params:
- action		array			a user action as an array of command objects


@returns:
- result     boolean       defines whether the default action of the event will be triggered (true) or canceled (false) 

@example:
gantt.attachEvent("onBeforeRedoStack", function(action){
    // your code here
    return true;
});


@template:	api_event
@descr:

{{note This event is defined in the **undo** extension, so you need to enable the [undo](desktop/extensions_list.md#undo) plugin. Read the details in the desktop/undo_redo.md article.}}


- The event is blockable, returning false will cancel further processing.
- If the event is blocked, the redo won't capture actions from event arguments.
- Event actions can be modified.

@relatedapi:
- api/gantt_onbeforeundostack_event.md
- api/gantt_onbeforeredo_event.md

@related:
desktop/undo_redo.md

@changelog:
added in version 5.2