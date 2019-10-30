Undo Extension
=================

The *Undo* object have a set of methods that allow to undo/redo the made changes. <br>
Read details about the Undo extension in the desktop/undo_redo.md article.

Methods
----------

The following methods are available via the **gantt.ext.undo** object:

###Undo() / Redo() 

- **undo()** - reverts the changes made in the gantt

~~~js
gantt.ext.undo.undo();
~~~

- **redo()** - applies the reverted changes to the gantt once again

~~~js
gantt.ext.undo.redo();
~~~

###getUndoStack() / getRedoStack() 

- **getUndoStack()** - returns the stack of stored undo user actions

~~~js
var stack = gantt.ext.undo.getUndoStack();
~~~

- **getRedoStack()** - returns the stack of stored redo user actions

~~~js
var stack = gantt.ext.undo.getRedoStack();
~~~

The returned stack is an array of the undo user actions. Each user action contains a set of commands. A command is an object with the following attributes:
 
- **type** - (*string*) the type of a command: "add/remove/update"
- **entity** - (*string*) the type of the object which was changed: "task" or "link"
- **value** - (*object*) the changed task/link object 
- **oldValue** - (*object*) the task/link object before changes

###clearUndoStack() / clearRedoStack()

- **clearUndoStack()** - clears the stack of stored undo commands

~~~js
gantt.ext.undo.clearUndoStack();
~~~

- **clearRedoStack()** - clears the stack of stored redo commands

~~~js
gantt.ext.undo.clearRedoStack();
~~~

###saveState()

- **saveState()** - saves the current state of a task before the changes are made

~~~js
gantt.ext.undo.saveState();
~~~