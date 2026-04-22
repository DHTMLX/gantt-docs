---
sidebar_label: onTaskSelected
title: onTaskSelected event
description: "wird ausgelöst, wenn der Benutzer eine Aufgabe auswählt"
---

# onTaskSelected

### Description

@short: Wird ausgelöst, wenn der Benutzer eine Aufgabe auswählt

@signature: onTaskSelected: (id: string | number) =\> void;

### Parameter

- `id` - (erforderlich) *string,number* - die Aufgaben-ID

### Example

~~~jsx
gantt.attachEvent("onTaskSelected", function(id){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Details

Das Ereignis wird für jede Aufgabe im Bereich der Mehrfachauswahl ausgelöst.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)