---
sidebar_label: getWorkHours
title: getWorkHours method
description: "지정한 날짜의 근무 시간을 제공합니다."
---

# getWorkHours

### Description

@short: 지정한 날짜의 근무 시간을 제공합니다.

@signature: getWorkHours: (date: Date) =\> any[]

### Parameters

- `date` - (required) *Date* - 확인할 날짜

### Returns
- ` hours` - (array) - 해당 날짜의 근무 시간

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
- [작업 시간 계산](guides/working-time.md)

