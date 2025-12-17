---
sidebar_label: clearUndoStack
title: clearUndoStack method
description: "clears the stack of stored undo commands"
---

# clearUndoStack

### Description

@short: Clears the stack of stored undo commands

@signature: clearUndoStack: () =\> void

### Example

~~~jsx
gantt.clearUndoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
This method is defined in the **undo** extension, so you need to enable the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::

### Related API
- [clearRedoStack](api/method/clearredostack.md)
- [undo](api/method/undo.md)
- [getUndoStack](api/method/getundostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- added in version 5.2

