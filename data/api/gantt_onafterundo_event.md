onAfterUndo
=============

@short:
	fires after the undo() method was called

@params:
- action		array			an array of command objects

@example:
gantt.attachEvent("onAfterUndo",function(action){
	// your code here
});

@template:	api_event
@descr:
The **action** parameter presents an array of command objects, each of which includes the following set of attributes:
 
- **type** - (*string*) the type of a command: "add/remove/update"
- **entity** - (*string*) the type of the object which was changed: "task" or "link"
- **value** - (*object*) the changed task/link object 
- **oldValue** - (*object*) the task/link object before changes


If no changes were applied, the **action** argument will be === null. It can happen when [gantt.undo()](api/gantt_undo.md) was called, but changes were canceled by api/gantt_onbeforeundo_event.md or the stack was empty.

@relatedapi:
- api/gantt_undo.md
- api/gantt_onbeforeundo_event.md

@relatedsample:
02_extensions/14_undo.html

@changelog:
- added in version 4.0
- the **action** argument is added in version 5.2