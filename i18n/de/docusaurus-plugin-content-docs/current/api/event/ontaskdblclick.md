---
sidebar_label: onTaskDblClick
title: onTaskDblClick-Ereignis
description: "Wird ausgelöst, wenn der Benutzer eine Aufgabe doppelt anklickt"
---

# onTaskDblClick

### Description

@short: Wird ausgelöst, wenn der Benutzer eine Aufgabe doppelt anklickt

@signature: onTaskDblClick: (id: string, e?: Event) =\> boolean;

### Parameters

- `id` - (erforderlich) *string* - die ID der doppelt geklickten Aufgabe

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskDblClick", function(id,e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

Das Ereignis ist blockierbar. Die Rückgabe von false wird den Standard-Handler abbrechen (das Öffnen der Aufgabendetails)

### Related API
- [onTaskClick](api/event/ontaskclick.md)