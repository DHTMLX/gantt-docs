---
sidebar_label: onAfterUndo
title: onAfterUndo event
description: "Löst unmittelbar nach der Ausführung der Methode undo() aus"
---

# onAfterUndo

### Description

@short: Löst unmittelbar nach der Ausführung der Methode undo() aus

@signature: onAfterUndo: (action: any[]) =\> void;

### Parameters

- `action` - (required) *array* - ein Array, das Kommandoobjekte enthält

### Example

~~~jsx
gantt.attachEvent("onAfterUndo",function(action){
    // Ihr Code hier
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Dieses Event ist Teil der **undo**-Erweiterung, stellen Sie daher sicher, dass das [undo](guides/extensions-list.md#undo) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::


Der **action** Parameter ist ein Array von Kommandoobjekten, die jeweils folgende Eigenschaften besitzen:
 
- **type** - (*string*) beschreibt den Kommando-Typ: "add", "remove" oder "update"
- **entity** - (*string*) gibt den Objekttyp an, der geändert wurde: "task" oder "link"
- **value** - (*object*) das Task- oder Link-Objekt nach der Änderung 
- **oldValue** - (*object*) das Task- oder Link-Objekt vor der Änderung


Wenn keine Änderungen vorgenommen wurden, ist der **action** Parameter === null. Dies kann passieren, wenn [gantt.undo()](api/method/undo.md) aufgerufen wurde, die Aktion jedoch durch [onBeforeUndo](api/event/onbeforeundo.md) abgebrochen wurde oder wenn der Undo-Stack leer war.

### Related API
- [undo](api/method/undo.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Change log
- hinzugefügt in Version 4.0
- der **action** Parameter wurde in Version 5.2 eingeführt

