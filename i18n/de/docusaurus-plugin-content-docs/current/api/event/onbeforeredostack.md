---
sidebar_label: onBeforeRedoStack
title: onBeforeRedoStack event
description: "Wird ausgelöst, kurz bevor eine Aktion auf den Redo-Stack gelegt wird"
---

# onBeforeRedoStack

### Description

@short: Wird ausgelöst, kurz bevor eine Aktion auf den Redo-Stack gelegt wird

@signature: onBeforeRedoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - ein Array von Befehlsobjekten, die eine Benutzeraktion repräsentieren

### Returns
- ` result` - (boolean) - gibt an, ob das Standardverhalten des Events fortgesetzt werden soll (true) oder gestoppt wird (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeRedoStack", function(action){
    // Ihr Code hier
    return true;
});
~~~

### Details

:::note
 Dieses Event ist Teil der **undo**-Erweiterung, daher stellen Sie sicher, dass das [undo](guides/extensions-list.md#undo) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::


- Das Event kann durch Rückgabe von false blockiert werden, was die weitere Verarbeitung stoppt.
- Das Blockieren des Events verhindert, dass Redo Aktionen aufzeichnet, die in den Event-Argumenten übergeben werden.
- Sie können die Aktionen innerhalb des Events modifizieren.

### Related API
- [onBeforeUndoStack](api/event/onbeforeundostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Related Guides
- ["Undo/Redo-Funktionalität"](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 5.2

