---
sidebar_label: getUndoStack
title: getUndoStack method
description: "returns the stack of stored undo user actions"
---

# getUndoStack

### Description

@short: Returns the stack of stored undo user actions

@signature: getUndoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - an array of the undo user actions

### Example

~~~jsx
var stack = gantt.getUndoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
This method is defined in the **undo** extension, so you need to enable the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::


The returned stack is an array of the undo user actions. Each user action contains a set of commands. A command is an object with the following attributes:
 
- **type** - (*string*) the type of a command: "add/remove/update"
- **entity** - (*string*) the type of the object which was changed: "task" or "link"
- **value** - (*object*) the changed task/link object 
- **oldValue** - (*object*) the task/link object before changes

Have a look at the example below:
![get_undo_stack](/img/get_undo_stack.png)


The **getUndoStack()** method returns a stack with 2 undo user actions. The first action contains 3 commands, while the second one has 1 command.

### Related API
- [getRedoStack](api/method/getredostack.md)
- [undo](api/method/undo.md)
- [clearUndoStack](api/method/clearundostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- added in version 4.0

