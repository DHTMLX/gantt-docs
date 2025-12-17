---
sidebar_label: calendar_property
title: calendar_property config
description: "legt den Namen der Eigenschaft fest, die verwendet wird, um einen Kalender mit einer Aufgabe oder einer Gruppe von Aufgaben zu verknüpfen"
---

# calendar_property

### Description

@short: Legt den Namen der Eigenschaft fest, die verwendet wird, um einen Kalender mit einer Aufgabe oder einer Gruppe von Aufgaben zu verknüpfen

@signature: calendar_property: string

### Example

~~~jsx
gantt.config.calendar_property = "property_name";
~~~

### Details

eingeführt in Version 4.2

Standardmäßig ist diese Option auf "calendar_id" gesetzt.

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
- ["Arbeitszeitberechnung"](guides/working-time.md#unsettingtheworkingtime)

