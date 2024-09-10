getRedoStack
=============


@short:
	 returns the stack of stored redo user actions

@params:


@returns:

- stack		UndoRedoAction[]		an array of the redo user actions

@example:

var stack = gantt.getRedoStack();

@template:	api_method
@descr:

{{note This method is defined in the **undo** extension, so you need to enable the [undo](desktop/extensions_list.md#undo) plugin. Read the details in the desktop/undo_redo.md article.}}




The returned stack is an array of the redo user actions. Each user action contains a set of commands. A command is an object with the following attributes:
 
- **type** - (*string*) the type of a command: "add/remove/update"
- **entity** - (*string*) the type of the object which was changed: "task" or "link"
- **value** - (*object*) the changed task/link object 
- **oldValue** - (*object*) the task/link object before changes

Have a look at the example below:

<img src="api/get_redo_stack.png">

The **getRedoStack()** method returns a stack with 3 redo user actions. The first and second actions contain 1 command each, while the third one has 3 commands.
@relatedapi:
- api/gantt_getundostack.md
- api/gantt_redo.md
- api/gantt_clearredostack.md

@relatedsample:
02_extensions/14_undo.html

@related:
desktop/undo_redo.md#gettingthestackofstoredundoredocommands

@changelog:
added in version 4.0


