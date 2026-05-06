---
sidebar_label: clearUndoStack
title: clearUndoStack method
description: "löscht den Stapel der gespeicherten Undo-Befehle"
---

# clearUndoStack

### Description

@short: Löscht den Stapel der gespeicherten Undo-Befehle

@signature: clearUndoStack: () =\> void

### Example

~~~jsx
gantt.clearUndoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Diese Methode ist in der **undo** Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md).
:::

### Related API
- [clearRedoStack](api/method/clearredostack.md)
- [undo](api/method/undo.md)
- [getUndoStack](api/method/getundostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 5.2