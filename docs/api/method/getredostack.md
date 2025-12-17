---
sidebar_label: getRedoStack
title: getRedoStack method
description: "returns the stack of stored redo user actions"
---

# getRedoStack

### Description

@short: Returns the stack of stored redo user actions

@signature: getRedoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - an array of the redo user actions

### Example

~~~jsx
var stack = gantt.getRedoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
This method is defined in the **undo** extension, so you need to enable the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::


The returned stack is an array of the redo user actions. Each user action contains a set of commands. A command is an object with the following attributes:
 
- **type** - (*string*) the type of a command: "add/remove/update"
- **entity** - (*string*) the type of the object which was changed: "task" or "link"
- **value** - (*object*) the changed task/link object 
- **oldValue** - (*object*) the task/link object before changes

Have a look at the example below:

The **getRedoStack()** method returns a stack with 3 redo user actions. The first and second actions contain 1 command each, while the third one has 3 commands.

### Related API
- [getUndoStack](api/method/getundostack.md)
- [redo](api/method/redo.md)
- [clearRedoStack](api/method/clearredostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- added in version 4.0

