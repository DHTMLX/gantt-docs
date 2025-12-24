---
title: "Undo Extension"
sidebar_label: "Undo Extension"
---

# Undo Extension


The *Undo* object has a set of methods that allow you to undo/redo the made changes. 


Read details about the Undo extension in the [Undo/Redo Functionality](guides/undo-redo.md) article.

## Methods


The following methods are available via the **gantt.ext.undo** object:

### Undo() / Redo() 

- <span class="submethod">**undo (): void**</span> - reverts the changes made in the gantt

~~~js
gantt.ext.undo.undo();
~~~

- <span class="submethod">**redo (): void**</span> - applies the reverted changes to the gantt once again

~~~js
gantt.ext.undo.redo();
~~~

### getUndoStack() / getRedoStack() 

- <span class="submethod">**getUndoStack (): UndoRedoAction[]**</span> - returns the stack of stored undo user actions

~~~js
var stack = gantt.ext.undo.getUndoStack();
~~~

- <span class="submethod">**getRedoStack (): UndoRedoAction[]**</span> - returns the stack of stored redo user actions

~~~js
var stack = gantt.ext.undo.getRedoStack();
~~~

The returned stack is an array of the undo user actions. Each user action contains a set of commands. A command is an object with the following attributes:
 
- **_type_** - (*string*) the type of a command: "add/remove/update"
- **_entity_** - (*string*) the type of the object which was changed: "task" or "link"
- **_value_** - (*object*) the changed task/link object 
- **_oldValue_** - (*object*) the task/link object before changes

### setUndoStack() / setRedoStack()

- <span class="submethod">**setUndoStack (stack): void**</span> - sets the stack of stored undo user actions
  - **_stack_** - (*UndoRedoAction[]*) - the undo stack


~~~js
gantt.ext.undo.setUndoStack(stack);
~~~

- <span class="submethod">**setRedoStack (stack): void**</span> - sets the stack of stored redo user actions
  - **_stack_** - (*UndoRedoAction[]*) - the redo stack

~~~js
gantt.ext.undo.setRedoStack(stack);
~~~

### clearUndoStack() / clearRedoStack()

- <span class="submethod">**clearUndoStack (): void**</span> - clears the stack of stored undo commands

~~~js
gantt.ext.undo.clearUndoStack();
~~~

- <span class="submethod">**clearRedoStack (): void**</span> - clears the stack of stored redo commands

~~~js
gantt.ext.undo.clearRedoStack();
~~~

### saveState()

- <span class="submethod">**saveState (id, entityType): boolean**</span> - saves the current state of a task/link before the changes are made
    - **_id_** - (*string | number*) - the id of a task/link,
    - **_type_** - (*string*) - the type of an entry for which the id is provided as the first argument. 

Supported values: "task", "link". 

~~~js
gantt.ext.undo.saveState(1, "task");
gantt.ext.undo.saveState(1, "link");
~~~

Read the details in the [Undoing/Redoing changes made from code](guides/undo-redo.md#undoingredoingchangesmadefromcode) article.
