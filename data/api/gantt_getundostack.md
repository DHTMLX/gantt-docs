getUndoStack
=============

@short:
	 returns the stack of stored undo user actions

@params:


@returns:

- stack			array		an array of the undo user actions

@example:

var stack = gantt.getUndoStack();

@template:	api_method
@descr:

{{note This method is defined in the **undo.js** extension, so you need to enable the [undo](desktop/extensions_list.md#undo) plugin. Read the details in the desktop/undo_redo.md article.}}


The returned stack is an array of the undo user actions. Each user action contains a set of commands. A command is an object with the following attributes:
 
- **type** - (*string*) the type of a command: "add/remove/update"
- **entity** - (*string*) the type of the object which was changed: "task" or "link"
- **value** - (*object*) the changed task/link object 
- **oldValue** - (*object*) the task/link object before changes

Have a look at the example below:

<img src="api/get_undo_stack.png">

The **getUndoStack()** method returns a stack with 2 undo user actions. The first action contains 3 commands, while the second one has 1 command.

@relatedapi:
- api/gantt_getredostack.md
- api/gantt_undo.md
- api/gantt_clearundostack.md

@relatedsample:
02_extensions/14_undo.html

@related:
desktop/undo_redo.md#gettingthestackofstoredundoredocommands

@changelog:
added in version 4.0