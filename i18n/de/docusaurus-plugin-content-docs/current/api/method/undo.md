---
sidebar_label: undo
title: undo method
description: "macht die im Gantt vorgenommenen Änderungen rückgängig"
---

# undo

### Description

@short: Stellt die im Gantt vorgenommenen Änderungen wieder her

@signature: undo: () =\> void

### Example

~~~jsx
gantt.undo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Diese Methode ist in der **undo** Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md).
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
- in Version 4.0 hinzugefügt