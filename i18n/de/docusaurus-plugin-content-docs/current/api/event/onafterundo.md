---
sidebar_label: onAfterUndo
title: onAfterUndo Ereignis
description: "löst aus, nachdem die undo()-Methode aufgerufen wurde"
---

# onAfterUndo

### Description

@short: Löst aus, nachdem die undo()-Methode aufgerufen wurde

@signature: onAfterUndo: (action: any[]) =\> void;

### Parameters

- `action` - (erforderlich) *Array* - ein Array von Befehlsobjekten

### Example

~~~jsx
gantt.attachEvent("onAfterUndo",function(action){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Dieses Event ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md).
:::

Der **action**-Parameter ist ein Array von Befehlsobjekten, von denen jedes folgende Attribute enthält:
 
- **type** - (*string*) der Typ eines Befehls: "add/remove/update"
- **entity** - (*string*) der Typ des geänderten Objekts: "task" oder "link"
- **value** - (*object*) das geänderte Task-/Link-Objekt 
- **oldValue** - (*object*) das Task-/Link-Objekt vor den Änderungen


Wenn keine Änderungen angewendet wurden, wird das **action**-Argument === null sein. Das kann passieren, wenn [gantt.undo()](api/method/undo.md) aufgerufen wurde, Änderungen jedoch durch [onBeforeUndo](api/event/onbeforeundo.md) abgebrochen oder der Stapel leer war.

### Related API
- [undo](api/method/undo.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Change log
- Hinzugefügt in Version 4.0
- das **action**-Argument wurde in Version 5.2 hinzugefügt