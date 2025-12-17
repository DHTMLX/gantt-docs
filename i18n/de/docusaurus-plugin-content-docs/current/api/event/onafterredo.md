---
sidebar_label: onAfterRedo
title: onAfterRedo event
description: "wird unmittelbar nach der Ausführung der Methode redo() ausgelöst"
---

# onAfterRedo

### Description

@short: Wird unmittelbar nach der Ausführung der Methode redo() ausgelöst

@signature: onAfterRedo: (action: any[]) =\> void;

### Parameters

- `action` - (required) *array* - ein Array von Befehlsobjekten, die eine Benutzeraktion repräsentieren

### Example

~~~jsx
gantt.attachEvent("onAfterRedo",function(action){
    // Ihr Code hier
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Dieses Event ist Teil der **undo**-Erweiterung. Stellen Sie daher sicher, dass das [undo](guides/extensions-list.md#undo) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::


Der **action**-Parameter enthält ein Array von Befehlsobjekten mit folgenden Attributen:
 
- **type** - (*string*) gibt den Befehlstyp an: "add", "remove" oder "update"
- **entity** - (*string*) gibt die Art des geänderten Objekts an: "task" oder "link"
- **value** - (*object*) das Task- oder Link-Objekt nach der Änderung
- **oldValue** - (*object*) das Task- oder Link-Objekt vor der Änderung

Wenn keine Änderungen angewendet wurden, ist der **action**-Parameter === null. Dies kann auftreten, wenn [gantt.redo()](api/method/redo.md) aufgerufen wurde, die Änderungen jedoch durch [onBeforeRedo](api/event/onbeforeredo.md) verhindert wurden oder wenn der Redo-Stack leer war.

### Related API
- [redo](api/method/redo.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Change log
- eingeführt in Version 4.0
- der **action**-Parameter wurde in Version 5.2 hinzugefügt

