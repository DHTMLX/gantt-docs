---
sidebar_label: onBeforeTaskChanged
title: onBeforeTaskChanged event
description: "Wird ausgelöst, nachdem der Benutzer das Draggen beendet und die Maustaste losgelassen hat, jedoch bevor Änderungen angewendet werden"
---

# onBeforeTaskChanged

### Description

@short: Wird ausgelöst, nachdem der Benutzer das Draggen beendet und die Maustaste losgelassen hat, jedoch bevor Änderungen angewendet werden

@signature: onBeforeTaskChanged: (id: string | number, mode: string, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe
- `mode` - (required) *string* - der Drag-and-Drop-Modus ("resize", "progress", "move", "ignore")
- `task` - (required) *Task* - eine Kopie des Aufgabenobjekts im ursprünglichen Zustand (vor dem Drag-and-Drop)

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskChanged", function(id, mode, task){
    // benutzerdefinierte Logik kann hier hinzugefügt werden
    return true;
});
~~~

### Details

- Dieses Event tritt auf, wenn eine Aufgabe innerhalb des Timeline-Bereichs gezogen wird.
- Es kann durch Rückgabe von *false* blockiert werden, wodurch der Drag-Vorgang abgebrochen wird.
- Es wird vor dem [onAfterTaskDrag](api/event/onaftertaskdrag.md) Event ausgelöst.

Der **task** Parameter repräsentiert das ursprüngliche (unveränderte) Aufgabenobjekt, während die über **gantt.getTask(id)** abgerufenen Aufgabendaten den aktualisierten Zustand widerspiegeln.
Dies ermöglicht einen Vergleich, um zu erkennen, was sich während des Drag-and-Drop geändert hat - beispielsweise ob die Dauer verlängert oder verkürzt wurde oder ob sich das Startdatum nach vorne oder hinten verschoben hat.<br>
Die Rückgabe von *false* in diesem Event führt dazu, dass die Aufgabe im Gantt auf die ursprünglichen Werte zurückgesetzt wird.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)

