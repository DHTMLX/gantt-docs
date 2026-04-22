---
sidebar_label: onBeforeRedo
title: onBeforeRedo-Ereignis
description: "wird ausgelöst, bevor die redo()-Methode aufgerufen wird"
---

# onBeforeRedo

### Description

@short: Wird ausgelöst, bevor die redo()()-Methode aufgerufen wird

@signature: onBeforeRedo: (action: any[]) =\> boolean;

### Parameters

- `action` - (erforderlich) *array* - eine Benutzeraktion als Array von Befehlsobjekten

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Ereignisses ausgelöst wird (true) oder abgebrochen wird (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeRedo",function(action){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Dieser Event ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md).
:::

Das Event ist blockierbar. Die Rückgabe von *false* wird die weitere Verarbeitung abbrechen.

Der **action**-Parameter präsentiert ein Array von Befehlsobjekten, von denen jedes die folgende Attributmenge enthält:
 
- **type** - (*string*) der Typ eines Befehls: "add/remove/update"
- **entity** - (*string*) der Typ des geänderten Objekts: "task" oder "link"
- **value** - (*object*) das geänderte Task-/Link-Objekt 
- **oldValue** - (*object*) das Task-/Link-Objekt vor den Änderungen

### Related API
- - [redo](api/method/redo.md)
- - [onAfterRedo](api/event/onafterredo.md)
- - [onBeforeRedoStack](api/event/onbeforeredostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 4.0