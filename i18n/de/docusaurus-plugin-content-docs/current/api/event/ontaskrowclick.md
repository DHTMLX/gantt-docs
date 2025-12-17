---
sidebar_label: onTaskRowClick
title: onTaskRowClick event
description: "Wird ausgelöst, wenn ein Benutzer auf eine Zeile in der Tabelle klickt"
---

# onTaskRowClick

### Description

@short: Wird ausgelöst, wenn ein Benutzer auf eine Zeile in der Tabelle klickt

@signature: onTaskRowClick: (id: string | number, row: HTMLElement) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe
- `row` - (required) *HTMLElement* - das HTML-Element, das die angeklickte Zeile repräsentiert

### Example

~~~jsx
gantt.attachEvent("onTaskRowClick", function(id,row){
    //beliebige benutzerdefinierte Logik hier
});
~~~
