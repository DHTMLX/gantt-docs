---
sidebar_label: getWorkHours
title: getWorkHours method
description: "returns the working hours of the specified date"
---

# getWorkHours

### Description

@short: Returns the working hours of the specified date

@signature: getWorkHours: (date: Date) =\> any[]

### Parameters

- `date` - (required) *Date* - a date to check

### Returns
- ` hours` - (array) - a working period of the date

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

