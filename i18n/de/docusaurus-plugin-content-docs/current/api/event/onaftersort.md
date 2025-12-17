---
sidebar_label: onAfterSort
title: onAfterSort event
description: "wird ausgelöst, sobald die Aufgaben im Grid sortiert wurden"
---

# onAfterSort

### Description

@short: Wird ausgelöst, sobald die Aufgaben im Grid sortiert wurden

@signature: onAfterSort: (field: string | GanttCallback, desc?: boolean, parent?: string | number) =\> void;

### Parameters

- `field` - (required) *string | function* - der für die Sortierung verwendete Spaltenname oder eine benutzerdefinierte Sortierfunktion

### Example

~~~jsx
gantt.attachEvent("onAfterSort",function(field, direction, parent){
    // your code here
});
~~~

### Related API
- [sort](api/method/sort.md)
- [sort](api/config/sort.md)

