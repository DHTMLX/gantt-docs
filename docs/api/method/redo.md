---
sidebar_label: redo
title: redo method
description: "applies the reverted changes to the gantt once again"
---

# redo

### Description

@short: Applies the reverted changes to the gantt once again

@signature: redo: () =\> void

### Example

~~~jsx
gantt.redo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
This method is defined in the **undo** extension, so you need to enable the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::

### Related API
- [undo](api/method/undo.md)
- [getRedoStack](api/method/getredostack.md)
- [clearRedoStack](api/method/clearredostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)
- [onAfterRedo](api/event/onafterredo.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- added in version 4.0

