---
sidebar_label: onBeforeRedo
title: onBeforeRedo event
description: "wird unmittelbar vor dem Ausführen der redo() Methode ausgelöst"
---

# onBeforeRedo

### Description

@short: Wird unmittelbar vor dem Ausführen der redo() Methode ausgelöst

@signature: onBeforeRedo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - ein Array, das eine Benutzeraktion darstellt, bestehend aus Kommando-Objekten

### Returns
- ` result` - (boolean) - bestimmt, ob das Standardverhalten des Events fortgesetzt wird (true) oder gestoppt wird (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeRedo",function(action){
    // Ihr Code hier
    return true;
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Dieses Event stammt aus der **undo** Erweiterung, daher stellen Sie sicher, dass das [undo](guides/extensions-list.md#undo) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::


Dieses Event kann blockiert werden. Ein Rückgabewert von *false* verhindert weitere Aktionen.

Der **action** Parameter ist ein Array von Kommando-Objekten, die jeweils folgende Attribute enthalten:
 
- **type** - (*string*) der Kommando-Typ: "add", "remove" oder "update"
- **entity** - (*string*) die Art des geänderten Objekts: "task" oder "link"
- **value** - (*object*) das Task- oder Link-Objekt nach der Änderung 
- **oldValue** - (*object*) das Task- oder Link-Objekt vor der Änderung

### Related API
- [redo](api/method/redo.md)
- [onAfterRedo](api/event/onafterredo.md)
- [onBeforeRedoStack](api/event/onbeforeredostack.md)

### Related Guides
- ["Undo/Redo-Funktionalität"](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 4.0

