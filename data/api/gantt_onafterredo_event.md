onAfterRedo
=============

@short:
	fires after the redo() method was called

@params:

- action		array			a user action as an array of command objects

@example:
gantt.attachEvent("onAfterRedo",function(action){
	// your code here
});

@template:	api_event
@descr:

{{note This event is defined in the **ext/dhtmlxgantt_undo.js** extension, so you need to include it on the page. Read the details in the desktop/undo_redo.md article.}}


The **action** parameter presents an array of command objects, each of which includes the following set of attributes:
 
- **type** - (*string*) the type of a command: "add/remove/update"
- **entity** - (*string*) the type of the object which was changed: "task" or "link"
- **value** - (*object*) the changed task/link object 
- **oldValue** - (*object*) the task/link object before changes

If no changes were applied, the **action** argument will be === null. It can happen when [gantt.redo()](api/gantt_redo.md) was called, but changes were canceled by api/gantt_onbeforeredo_event.md or the stack was empty.




@relatedapi:
- api/gantt_redo.md
- api/gantt_onbeforeredo_event.md

@relatedsample:
02_extensions/14_undo.html

@changelog:
- added in version 4.0
- the **action** argument is added in version 5.2