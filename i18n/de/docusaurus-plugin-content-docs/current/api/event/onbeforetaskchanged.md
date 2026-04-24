---
sidebar_label: onBeforeTaskChanged
title: onBeforeTaskChanged event
description: "löst das Ereignis aus, nachdem der Benutzer das Ziehen beendet und die Maustaste losgelassen hat, bevor die Änderungen angewendet werden"
---

# onBeforeTaskChanged

### Description

@short: Wird ausgelöst, nachdem der Benutzer das Ziehen beendet und die Maustaste losgelassen hat, bevor die Änderungen angewendet werden

@signature: onBeforeTaskChanged: (id: string | number, mode: string, task: Task) =\> boolean;

### Parameters

- `id` - (erforderlich) *string | number* - die Task-ID
- `mode` - (erforderlich) *string* - der Drag-and-Drop-Modus ("resize", "progress", "move", "ignore")
- `task` - (erforderlich) *Task* - eine Kopie des Task-Objekts im ursprünglichen Zustand (vor Drag-and-Drop)

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, task){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

- Das Ereignis wird ausgelöst, wenn der Benutzer eine Aufgabe im Timeline-Bereich zieht.
- Das Ereignis ist blockierbar. Geben Sie *false* zurück, um die Drag-Operation abzubrechen.
- Das Ereignis wird vor dem [onAfterTaskDrag](api/event/onaftertaskdrag.md) Event ausgelöst.

Das **task**-Argument enthält das ursprüngliche (nicht modifizierte) Task-Objekt, während dasselbe Datenobjekt, das über die Methode **gantt.getTask(id)** verfügbar ist, bereits modifiziert ist.
Dieses Objekt kann verwendet werden, um die genauen Änderungen zu prüfen, die durch Drag-and-Drop im Vergleich zum Anfangszustand der Aufgabe vorgenommen wurden – z. B. ob die Dauer zugenommen oder abgenommen hat, ob das Startdatum nach vorne oder zurück verschoben wurde, usw.
Wenn *false* von der Methode zurückgegeben wird, wird das Task-Objekt in gantt auf die Werte des ursprünglichen Task-Objekts zurückgesetzt.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)