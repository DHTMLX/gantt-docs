---
sidebar_label: clearRedoStack
title: clearRedoStack method
description: "clears the stack of stored redo commands"
---

# clearRedoStack

### Description

@short: Clears the stack of stored redo commands

@signature: clearRedoStack: () =\> void

### Example

~~~jsx
gantt.clearRedoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
This method is defined in the **undo** extension, so you need to enable the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::

### Related API
- [clearUndoStack](api/method/clearundostack.md)
- [redo](api/method/redo.md)
- [getRedoStack](api/method/getredostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- added in version 5.2

