---
sidebar_label: onBeforeTaskUpdate
title: onBeforeTaskUpdate event
description: "Wird ausgelöst, kurz bevor eine Aufgabe vom Benutzer aktualisiert wird"
---

# onBeforeTaskUpdate

### Description

@short: Wird ausgelöst, kurz bevor eine Aufgabe vom Benutzer aktualisiert wird

@signature: onBeforeTaskUpdate: (id: string | number, new_task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe
- `new_task` - (required) *Task* - das aktualisierte Aufgabenobjekt

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskUpdate", function(id,new_task){
    // Hier kann benutzerdefinierte Logik hinzugefügt werden
});
~~~

### Details

Das **onBeforeTaskUpdate**-Event wird ausgelöst, nachdem das Aufgabenobjekt aktualisiert wurde, aber bevor alle Änderungen vollständig angewendet sind. Daher ist es nicht immer möglich, auf das Aufgabenobjekt in seinem Zustand vor der Aktualisierung zuzugreifen.

Um das Aufgabenobjekt vor der Anwendung der Änderungen zu erhalten, sollten Sie Event-Handler verwenden, die speziell mit Aufgabenänderungen verknüpft sind:

- [onLightboxSave](api/event/onlightboxsave.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- ["Inline Editors Erweiterung"](guides/inline-editors-ext.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onRowDragStart](api/event/onrowdragstart.md)

Wenn Änderungen über die API vorgenommen werden, können Sie auf das Aufgabenobjekt zugreifen, bevor der Modifikationscode ausgeführt wird. Das folgende Beispiel zeigt verschiedene Möglichkeiten, eine Aufgabe zu aktualisieren, z. B. durch Ändern der Termine:

:::note
Sample: [Updating a task](https://snippet.dhtmlx.com/9xy8wr2a) 
:::

Im Vergleich dieser Events sieht man, dass diejenigen, die kurz vor einer Aufgabenänderung ausgelöst werden, das alte Aufgabenobjekt bereitstellen, während **onBeforeTaskUpdate** das aktualisierte Aufgabenobjekt liefert.

### Related API
- [updateTask](api/method/updatetask.md)
- [onAfterTaskUpdate](api/event/onaftertaskupdate.md)

