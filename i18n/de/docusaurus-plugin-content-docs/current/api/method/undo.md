---
sidebar_label: undo
title: undo method
description: "macht die im Gantt vorgenommenen Änderungen rückgängig"
---

# undo

### Description

@short: Macht die im Gantt vorgenommenen Änderungen rückgängig

@signature: undo: () =\> void

### Example

~~~jsx
gantt.undo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Diese Methode ist Teil der **undo**-Erweiterung, daher stellen Sie sicher, dass das [undo](guides/extensions-list.md#undo) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::

### Related API
- [redo](api/method/redo.md)
- [getUndoStack](api/method/getundostack.md)
- [clearUndoStack](api/method/clearundostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)
- [onAfterUndo](api/event/onafterundo.md)

### Related Guides
- ["Undo/Redo-Funktionalität"](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 4.0

