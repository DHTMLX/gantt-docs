onBeforeRedo
=============

@short:
	fires before the redo() method is called

@params:

- action		array			a user action as an array of command objects


@returns:

- result     boolean       defines whether the default action of the event will be triggered (true) or canceled (false) 

@example:
gantt.attachEvent("onBeforeRedo",function(action){
	// your code here
    return true;
});

@template:	api_event
@descr:

{{note This event is defined in the **ext/dhtmlxgantt_undo.js** extension, so you need to include it on the page. Read the details in the desktop/undo_redo.md article.}}


The event is blockable. Returning *false* will cancel further processing.

The **action** parameter presents an array of command objects, each of which contains the following set of attributes:
 
- **type** - (*string*) the type of a command: "add/remove/update"
- **entity** - (*string*) the type of the object which was changed: "task" or "link"
- **value** - (*object*) the changed task/link object 
- **oldValue** - (*object*) the task/link object before changes

@relatedapi:
- api/gantt_redo.md
- api/gantt_onafterredo_event.md
- api/gantt_onbeforeredostack_event.md

@relatedsample:
02_extensions/14_undo.html

@changelog:
added in version 4.0

@related:
desktop/undo_redo.md