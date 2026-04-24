---
sidebar_label: onBeforeTaskUpdate
title: onBeforeTaskUpdate event
description: "Wird ausgelöst, bevor der Benutzer eine Aufgabe aktualisiert"
---

# onBeforeTaskUpdate

### Description

@short: Wird ausgelöst, bevor der Benutzer eine Aufgabe aktualisiert

@signature: onBeforeTaskUpdate: (id: string | number, new_task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe
- `new_task` - (required) *Task* - das neue (aktualisierte) Task-Objekt

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskUpdate", function(id,new_task){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Details

Beim Verwenden des **onBeforeTaskUpdate**-Events ist es nicht immer möglich, das Task-Objekt zu erhalten, bevor die Aufgabe vollständig aktualisiert wird. Das Event wird ausgelöst, nachdem das Task-Objekt aktualisiert wurde, aber bevor alle Änderungen angewendet wurden.
Um das Task-Objekt vor den Änderungen zu erhalten, müssen Sie die Event-Handler verwenden, die direkt mit den Änderungen der Aufgabe zusammenhängen:

- [onLightboxSave](api/event/onlightboxsave.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [Inline Editors Extension](guides/inline-editors-ext.md#events)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onRowDragStart](api/event/onrowdragstart.md)

Wenn die Änderungen über die API vorgenommen werden, erhalten Sie möglicherweise das Task-Objekt, bevor der Code, der die Aufgabe ändert, ausgeführt wird. Sehen Sie sich das Beispiel an, in dem Sie eine Aufgabe auf verschiedene Weise ändern können (zum Beispiel Änderungen am Datum der Aufgabe):

:::note
Beispiel: [Aktualisierung einer Aufgabe](https://snippet.dhtmlx.com/9xy8wr2a)
:::

Nach dem Vergleich werden Sie feststellen, dass die Events, die unmittelbar vor der Änderung der Aufgabe ausgelöst werden, das alte Task-Objekt zurückgeben, während das **onBeforeTaskUpdate**-Ereignis ein neues Task-Objekt der Aufgabe zurückgibt.

### Related API
- [updateTask](api/method/updatetask.md)
- [onAfterTaskUpdate](api/event/onaftertaskupdate.md)