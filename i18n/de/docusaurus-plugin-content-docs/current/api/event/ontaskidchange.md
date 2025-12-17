---
sidebar_label: onTaskIdChange
title: onTaskIdChange event
description: "wird ausgelöst, wenn die ID einer Aufgabe aktualisiert wird"
---

# onTaskIdChange

### Description

@short: Wird ausgelöst, wenn die ID einer Aufgabe aktualisiert wird

@signature: onTaskIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - die aktuelle ID der Aufgabe
- `new_id` - (required) *string | number* - die aktualisierte ID der Aufgabe

### Example

~~~jsx
gantt.attachEvent("onTaskIdChange", function(id,new_id){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Related API
- [changeTaskId](api/method/changetaskid.md)

