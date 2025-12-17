---
sidebar_label: onBeforeUndo
title: onBeforeUndo event
description: "Löst aus kurz bevor die Methode undo() ausgeführt wird"
---

# onBeforeUndo

### Description

@short: Löst aus kurz bevor die Methode undo() ausgeführt wird

@signature: onBeforeUndo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - ein Array, das Kommando-Objekte enthält

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events fortgesetzt wird (true) oder gestoppt wird (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeUndo", function(action){
    // Ihr Code hier
    return true;
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Dieses Event ist Teil der **undo**-Erweiterung, daher stellen Sie sicher, dass das [undo](guides/extensions-list.md#undo) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::


Dieses Event kann blockiert werden. Die Rückgabe von *false* stoppt jegliche weitere Verarbeitung.

Der **action** Parameter ist ein Array von Kommando-Objekten, die jeweils folgende Attribute enthalten:
 
- **type** - (*string*) der Kommando-Typ: "add", "remove" oder "update"
- **entity** - (*string*) die Art des geänderten Objekts: "task" oder "link"
- **value** - (*object*) das Task- oder Link-Objekt nach der Änderung 
- **oldValue** - (*object*) das Task- oder Link-Objekt vor der Änderung

### Related API
- [undo](api/method/undo.md)
- [onAfterUndo](api/event/onafterundo.md)
- [onBeforeUndoStack](api/event/onbeforeundostack.md)

### Related Guides
- ["Undo/Redo-Funktionalität"](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 4.0

