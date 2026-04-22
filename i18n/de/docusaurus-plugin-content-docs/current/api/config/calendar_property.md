---
sidebar_label: calendar_property
title: calendar_property config
description: "ändert den Namen der Eigenschaft, die die Bindung eines Kalenders an eine Aufgabe bzw. eine Gruppe von Aufgaben beeinflusst"
---

# calendar_property

### Description

@short: Ändert den Namen der Eigenschaft, die die Bindung eines Kalenders an eine Aufgabe bzw. eine Gruppe von Aufgaben beeinflusst

@signature: calendar_property: string

### Example

~~~jsx
gantt.config.calendar_property = "property_name";
~~~

### Details

Neu hinzugefügt in Version 4.2

Der Standardwert der Option ist "calendar_id".

~~~js
{
    "id":2, 
    "calendar_id":"custom", 
    "text":"Task #1", 
    "start_date":"02-04-2013", 
    "duration":"8", 
    "parent":"1", 
    "progress":0.5, 
    "open": true
}
~~~

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [isWorkTime](api/method/isworktime.md)

### Related Guides
- [Berechnung der Arbeitszeit](guides/working-time.md)