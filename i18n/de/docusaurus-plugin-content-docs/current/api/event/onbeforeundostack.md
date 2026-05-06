---
sidebar_label: onBeforeUndoStack
title: onBeforeUndoStack event
description: "löst aus, bevor eine Aktion dem Undo-Stack hinzugefügt wird"
---

# onBeforeUndoStack

### Description

@short: Löst aus, bevor eine Aktion dem Undo-Stack hinzugefügt wird

@signature: onBeforeUndoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - eine Benutzeraktion als Array von Befehlsobjekten

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Ereignisses ausgelöst wird (true) oder abgebrochen wird (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeUndoStack",function(action){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

:::note
Dieses Ereignis ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md). 
:::

- Das Ereignis ist blockierbar; wenn false zurückgegeben wird, wird die weitere Verarbeitung abgebrochen.
- Wenn das Ereignis blockiert wird, erfasst der Undo keine Aktionen aus den Ereignisargumenten.
- Ereignisaktionen können geändert werden.

### Related API
- [onBeforeRedoStack](api/event/onbeforeredostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- Hinzugefügt in Version 5.2