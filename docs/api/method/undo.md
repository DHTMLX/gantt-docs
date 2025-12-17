---
sidebar_label: undo
title: undo method
description: "reverts the changes made in the gantt"
---

# undo

### Description

@short: Reverts the changes made in the gantt

@signature: undo: () =\> void

### Example

~~~jsx
gantt.undo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
This method is defined in the **undo** extension, so you need to activate the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::

### Related API
- [redo](api/method/redo.md)
- [getUndoStack](api/method/getundostack.md)
- [clearUndoStack](api/method/clearundostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)
- [onAfterUndo](api/event/onafterundo.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- added in version 4.0

