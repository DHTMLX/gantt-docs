---
sidebar_label: onBeforeTaskSelected
title: onBeforeTaskSelected event
description: "Wird unmittelbar ausgelöst, bevor eine Aufgabe ausgewählt wird"
---

# onBeforeTaskSelected

### Description

@short: Wird unmittelbar ausgelöst, bevor eine Aufgabe ausgewählt wird

@signature: onBeforeTaskSelected: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskSelected", function(id){
    //Hier kann benutzerdefinierte Logik hinzugefügt werden
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Die Rückgabe von *false* verhindert, dass die Standardaktion ausgeführt wird.

### Related API
- [onTaskSelected](api/event/ontaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)

