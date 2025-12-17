---
sidebar_label: onAfterUndo
title: onAfterUndo event
description: "fires after the undo() method was called"
---

# onAfterUndo

### Description

@short: Fires after the undo() method was called

@signature: onAfterUndo: (action: any[]) =\> void;

### Parameters

- `action` - (required) *array* - an array of command objects

### Example

~~~jsx
gantt.attachEvent("onAfterUndo",function(action){
    // your code here
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
This event is defined in the **undo** extension, so you need to enable the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::


The **action** parameter presents an array of command objects, each of which includes the following set of attributes:
 
- **type** - (*string*) the type of a command: "add/remove/update"
- **entity** - (*string*) the type of the object which was changed: "task" or "link"
- **value** - (*object*) the changed task/link object 
- **oldValue** - (*object*) the task/link object before changes


If no changes were applied, the **action** argument will be === null. It can happen when [gantt.undo()](api/method/undo.md) was called, but changes were canceled by [onBeforeUndo](api/event/onbeforeundo.md) or the stack was empty.

### Related API
- [undo](api/method/undo.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Change log
- added in version 4.0
- the **action** argument is added in version 5.2

