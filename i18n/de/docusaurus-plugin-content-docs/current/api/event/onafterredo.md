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

- `action` - (required) *array* - eine Benutzeraktion als Array von Befehlsobjekten

### Example

~~~jsx
gantt.attachEvent("onAfterRedo",function(action){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related samples
- [Undo/Redo-Änderungen in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Dieses Ereignis ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md).
:::

Der **action**-Parameter ist ein Array von Befehls-Objekten, von denen jedes die folgenden Attribute enthält:

- **type** - (*string*) der Typ eines Befehls: "add/remove/update"
- **entity** - (*string*) der Typ des Objekts, das geändert wurde: "task" oder "link"
- **value** - (*object*) das geänderte Task-/Link-Objekt
- **oldValue** - (*object*) das Task-/Link-Objekt vor den Änderungen

Falls keine Änderungen vorgenommen wurden, ist das **action**-Argument === null. Dies kann passieren, wenn [gantt.redo()](api/method/redo.md) aufgerufen wurde, die Änderungen jedoch durch [onBeforeRedo](api/event/onbeforeredo.md) abgebrochen oder der Stack leer war.

### Related API
- [redo](api/method/redo.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Change log
- in Version 4.0 hinzugefügt
- Der **action**-Parameter wurde in Version 5.2 hinzugefügt