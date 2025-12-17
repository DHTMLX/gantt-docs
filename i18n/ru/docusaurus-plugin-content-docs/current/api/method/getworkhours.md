---
sidebar_label: getWorkHours
title: getWorkHours method
description: "предоставляет рабочие часы для указанной даты"
---

# getWorkHours

### Description

@short: Предоставляет рабочие часы для указанной даты

@signature: getWorkHours: (date: Date) =\> any[]

### Parameters

- `date` - (required) *Date* - дата для проверки

### Returns
- ` hours` - (array) - рабочие часы для этой даты

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
- [Расчёт рабочего времени](guides/working-time.md)

