---
sidebar_label: getWorkHours
title: getWorkHours method
description: "bietet die Arbeitszeiten für das angegebene Datum"
---

# getWorkHours

### Description

@short: Bietet die Arbeitszeiten für das angegebene Datum

@signature: getWorkHours: (date: Date) =\> any[]

### Parameters

- `date` - (required) *Date* - das zu überprüfende Datum

### Returns
- ` hours` - (array) - die Arbeitszeiten für dieses Datum

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
- ["Arbeitszeitberechnung"](guides/working-time.md)

