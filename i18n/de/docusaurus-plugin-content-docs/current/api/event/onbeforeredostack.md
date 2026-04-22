---
sidebar_label: onBeforeRedoStack
title: onBeforeRedoStack event
description: "Wird ausgelöst, bevor eine Aktion dem Redo-Stack hinzugefügt wird"
---

# onBeforeRedoStack

### Description

@short: Wird ausgelöst, bevor eine Aktion dem Redo-Stack hinzugefügt wird

@signature: onBeforeRedoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (erforderlich) *UndoRedoAction* - eine Benutzeraktion als Array von Befehlsobjekten

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (true) oder abgebrochen wird (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeRedoStack", function(action){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

:::note
Dieses Ereignis ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md).
:::

- Das Event kann blockiert werden; die Rückgabe von false bricht die weitere Verarbeitung ab.
- Falls das Event blockiert wird, wird das redo keine Aktionen aus den Event-Argumenten erfassen.
- Die Aktionen des Events können geändert werden.

### Related API
- [onBeforeUndoStack](api/event/onbeforeundostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- in Version 5.2 hinzugefügt