---
sidebar_label: onBeforeRedo
title: onBeforeRedo event
description: "fires before the redo() method is called"
---

# onBeforeRedo

### Description

@short: Fires before the redo() method is called

@signature: onBeforeRedo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - a user action as an array of command objects

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (true) or canceled (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeRedo",function(action){
    // your code here
    return true;
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
This event is defined in the **undo** extension, so you need to enable the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::


The event is blockable. Returning *false* will cancel further processing.

The **action** parameter presents an array of command objects, each of which contains the following set of attributes:
 
- **type** - (*string*) the type of a command: "add/remove/update"
- **entity** - (*string*) the type of the object which was changed: "task" or "link"
- **value** - (*object*) the changed task/link object 
- **oldValue** - (*object*) the task/link object before changes

### Related API
- - [redo](api/method/redo.md)
- - [onAfterRedo](api/event/onafterredo.md)
- - [onBeforeRedoStack](api/event/onbeforeredostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- added in version 4.0

