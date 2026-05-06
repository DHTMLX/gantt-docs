---
sidebar_label: getWorkHours
title: getWorkHours method
description: "возвращает рабочие часы указанной даты"
---

# getWorkHours

### Description

@short: Возвращает рабочие часы указанной даты

@signature: getWorkHours: (date: Date) =\> any[]

### Parameters

- `date` - (required) *Date* - дата, которую нужно проверить

### Returns
- ` hours` - (array) - рабочий период даты

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
- [Расчет рабочего времени](guides/working-time.md)