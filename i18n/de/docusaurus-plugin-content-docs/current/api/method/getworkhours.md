---
sidebar_label: getWorkHours
title: getWorkHours method
description: "liefert die Arbeitsstunden des angegebenen Datums"
---

# getWorkHours

### Description

@short: Liefert die Arbeitsstunden des angegebenen Datums

@signature: getWorkHours: (date: Date) =\> any[]

### Parameters

- `date` - (required) *Date* - ein Datum, das überprüft wird

### Returns
- ` hours` - (Array) - ein Arbeitszeitraum des Datums

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");

gantt.getWorkHours(new Date(2013,03,30))// -> [8, 17] /*!*/
~~~ 

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)