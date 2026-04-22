---
sidebar_label: placeholder_task
title: placeholder_task config
description: "fügt eine leere Zeile am Ende der Aufgabenliste hinzu, um die Bearbeitung von Aufgaben über die Tastatur zu erleichtern"
---

# placeholder_task

### Description

@short: Fügt am Ende der Aufgabenliste eine leere Zeile hinzu, um die Bearbeitung von Aufgaben über die Tastatur zu erleichtern

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

**Standardwert:** false

### Related samples
- [Inline-Bearbeitung - Tastatur-Navigationsmodus](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)

### Details

- Eine Platzhalter-Aufgabe wird automatisch am Ende der Aufgabenliste hinzugefügt.
- Sobald sie über die UI bearbeitet wird und der Aufruf gantt.updateTask() empfangen wird, wird am Ende der Liste eine neue Aufgabe hinzugefügt.
- Eine Platzhalter-Aufgabe kann anhand ihres Typswerts erkannt werden:

~~~js
if(task.type == gantt.config.types.placeholder){
   // mache etwas
}
~~~

- Gantt feuert die [onTaskCreated](api/event/ontaskcreated.md) und [onAfterTaskAdd](api/event/onaftertaskadd.md) Ereignisse, wenn der Platzhalter eingefügt wird.
- [gantt.dataProcessor](guides/server-side.md) wird das **onBeforeUpdate**-Ereignis für das Platzhalter-Item auslösen, produziert aber keine Backend-Anfragen.

### Related Guides
- [Inline-Bearbeitung im Grid](guides/inline-editing.md#inline-editing-modes)