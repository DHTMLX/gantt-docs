---
sidebar_label: onBeforeUndo
title: onBeforeUndo event
description: "Wird ausgelöst, bevor die undo()-Methode aufgerufen wird"
---

# onBeforeUndo

### Description

@short: Wird ausgelöst, bevor die undo()-Methode aufgerufen wird

@signature: onBeforeUndo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - ein Array von Befehlsobjekten

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Ereignisses ausgelöst wird (true) oder abgebrochen wird (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeUndo", function(action){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Dieses Ereignis ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo)-Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md). 
:::


Das Ereignis kann blockiert werden. Die Rückgabe von *false* beendet die weitere Verarbeitung.

Der **action**-Parameter stellt ein Array von Befehlsobjekten dar, von denen jedes die folgende Gruppe von Eigenschaften enthält:
 
- **type** - (*string*) der Typ eines Befehls: "add/remove/update"
- **entity** - (*string*) der Typ des geänderten Objekts: "task" oder "link"
- **value** - (*object*) das geänderte Task-/Link-Objekt 
- **oldValue** - (*object*) das Task-/Link-Objekt vor den Änderungen

### Related API
- [undo](api/method/undo.md)
- [onAfterUndo](api/event/onafterundo.md)
- [onBeforeUndoStack](api/event/onbeforeundostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- Hinzugefügt in Version 4.0