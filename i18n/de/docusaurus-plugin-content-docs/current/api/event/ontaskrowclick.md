---
sidebar_label: onTaskRowClick
title: onTaskRowClick-Ereignis
description: "wird ausgelöst, wenn der Benutzer auf eine Zeile in der Tabelle klickt"
---

# onTaskRowClick

### Description

@short: Wird ausgelöst, wenn der Benutzer auf eine Zeile in der Tabelle klickt

@signature: onTaskRowClick: (id: string | number, row: HTMLElement) =\> void;

### Parameters

- `id` - (erforderlich) *string | number* - die Aufgaben-ID
- `row` - (erforderlich) *HTMLElement* - ein HTML-Element der angeklickten Zeile

### Example

~~~jsx
gantt.attachEvent("onTaskRowClick", function(id,row){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~