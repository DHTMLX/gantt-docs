---
sidebar_label: clearRedoStack
title: clearRedoStack Methode
description: "löscht den Stapel der gespeicherten Redo-Befehle"
---

# clearRedoStack

### Description

@short: Löscht den Stapel der gespeicherten Redo-Befehle

@signature: clearRedoStack: () => void

### Example

~~~jsx
gantt.clearRedoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Diese Methode ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im [Undo/Redo Functionality](guides/undo-redo.md) Artikel.
:::

### Related API
- [clearUndoStack](api/method/clearundostack.md)
- [redo](api/method/redo.md)
- [getRedoStack](api/method/getredostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- in Version 5.2 hinzugefügt