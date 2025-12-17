---
sidebar_label: onTaskDblClick
title: onTaskDblClick event
description: "Wird ausgelöst, wenn eine Aufgabe doppelt angeklickt wird"
---

# onTaskDblClick

### Description

@short: Wird ausgelöst, wenn eine Aufgabe doppelt angeklickt wird

@signature: onTaskDblClick: (id: string, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - die ID der Aufgabe, die doppelt angeklickt wurde
- `e` - (optional) *Event* - das native Event-Objekt

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events ausgeführt werden soll (<b>true</b>) oder verhindert wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskDblClick", function(id,e){
    // Hier kann benutzerdefinierte Logik hinzugefügt werden
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Wenn false zurückgegeben wird, wird das Standardverhalten - das Öffnen der Aufgabendetails - verhindert.

### Related API
- [onTaskClick](api/event/ontaskclick.md)

