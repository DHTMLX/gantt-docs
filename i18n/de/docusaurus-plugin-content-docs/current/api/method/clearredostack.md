---
sidebar_label: clearRedoStack
title: clearRedoStack method
description: "setzt den Stack zurück, der die Redo-Befehle enthält"
---

# clearRedoStack

### Description

@short: Setzt den Stack zurück, der die Redo-Befehle enthält

@signature: clearRedoStack: () =\> void

### Example

~~~jsx
gantt.clearRedoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Diese Methode ist Teil der **undo**-Erweiterung, daher stellen Sie sicher, dass das [undo](guides/extensions-list.md#undo) Plugin zuerst aktiviert ist. Weitere Details finden Sie im Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::

### Related API
- [clearUndoStack](api/method/clearundostack.md)
- [redo](api/method/redo.md)
- [getRedoStack](api/method/getredostack.md)

### Related Guides
- ["Undo/Redo-Funktionalität"](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 5.2

