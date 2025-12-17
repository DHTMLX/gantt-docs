---
sidebar_label: placeholder_task
title: placeholder_task config
description: "Fügt am Ende der Aufgabenliste eine leere Zeile hinzu, um das Bearbeiten von Aufgaben mit der Tastatur zu erleichtern"
---

# placeholder_task

### Description

@short: Fügt am Ende der Aufgabenliste eine leere Zeile hinzu, um das Bearbeiten von Aufgaben mit der Tastatur zu erleichtern

@signature: placeholder_task: any

### Example

~~~jsx
gantt.config.placeholder_task = true;

// oder
gantt.config.placeholder_task = {
   // setzt den Fokus auf die placeholder task nach dem Hinzufügen einer neuen Aufgabe
   focusOnCreate: true
};
~~~

**Default value:** false

### Related samples
- [Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)

### Details

- Am Ende der Aufgabenliste wird automatisch eine leere placeholder task hinzugefügt.
- Wenn die placeholder task über die UI bearbeitet wird und **gantt.updateTask()** aufgerufen wird, wird eine neue Aufgabe am Ende hinzugefügt.
- Eine placeholder task kann durch Überprüfung der Eigenschaft type identifiziert werden:

~~~js
if(task.type == gantt.config.types.placeholder){
   // mache etwas
}
~~~

- Gantt löst die Events [onTaskCreated](api/event/ontaskcreated.md) und [onAfterTaskAdd](api/event/onaftertaskadd.md) aus, wenn eine placeholder task hinzugefügt wird.
- Der [gantt.dataProcessor](guides/server-side.md) feuert das **onBeforeUpdate** Event für die placeholder task, sendet jedoch keine Backend-Anfragen.

### Related Guides
- ["Inline-Bearbeitung im Grid"](guides/inline-editing.md#inlineeditingmodes)

