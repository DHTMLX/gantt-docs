---
sidebar_label: getWorkHours
title: getWorkHours 方法
description: "返回指定日期的工作时间"
---

# getWorkHours

### Description

@short: 返回指定日期的工作时间

@signature: getWorkHours: (date: Date) =\> any[]

### Parameters

- `date` - (required) *Date* - 要检查的日期

### Returns
- ` hours` - (array) - 该日期的工作时段

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