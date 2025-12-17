---
sidebar_label: onBeforeUndoStack
title: onBeforeUndoStack event
description: "Löst unmittelbar aus, bevor eine Aktion auf den Undo-Stack gelegt wird."
---

# onBeforeUndoStack

### Description

@short: Löst unmittelbar aus, bevor eine Aktion auf den Undo-Stack gelegt wird.

@signature: onBeforeUndoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - ein Array von Befehlsobjekten, die eine Benutzeraktion repräsentieren

### Returns
- ` result` - (boolean) - bestimmt, ob das Standardverhalten des Events fortgesetzt werden soll (true) oder gestoppt wird (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeUndoStack",function(action){
    // Ihr Code hier
    return true;
});
~~~

### Details

:::note
 Dieses Event ist Teil der **undo**-Erweiterung, daher stellen Sie sicher, dass das [undo](guides/extensions-list.md#undo) Plugin aktiviert ist. Für weitere Informationen siehe den Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::


- Dieses Event kann blockiert werden; die Rückgabe von false stoppt die weitere Verarbeitung.
- Das Blockieren des Events verhindert, dass Undo Aktionen aus den Event-Argumenten erfasst.
- Sie können die Aktionen im Event modifizieren.

### Related API
- [onBeforeRedoStack](api/event/onbeforeredostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Related Guides
- ["Undo/Redo-Funktionalität"](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 5.2

