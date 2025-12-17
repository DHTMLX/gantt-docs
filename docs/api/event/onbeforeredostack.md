---
sidebar_label: onBeforeRedoStack
title: onBeforeRedoStack event
description: "fires before an action is added into the redo stack"
---

# onBeforeRedoStack

### Description

@short: Fires before an action is added into the redo stack

@signature: onBeforeRedoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - a user action as an array of command objects

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (true) or canceled (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeRedoStack", function(action){
    // your code here
    return true;
});
~~~

### Details

:::note
This event is defined in the **undo** extension, so you need to enable the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::


- The event is blockable, returning false will cancel further processing.
- If the event is blocked, the redo won't capture actions from event arguments.
- Event actions can be modified.

### Related API
- [onBeforeUndoStack](api/event/onbeforeundostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- added in version 5.2

