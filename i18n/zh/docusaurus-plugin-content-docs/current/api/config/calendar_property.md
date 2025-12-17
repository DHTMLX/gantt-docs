---
sidebar_label: calendar_property
title: calendar_property config
description: "设置用于将日历关联到任务或任务组的属性名称"
---

# calendar_property

### Description

@short: 设置用于将日历关联到任务或任务组的属性名称

@signature: calendar_property: string

### Example

~~~jsx
gantt.config.calendar_property = "property_name";
~~~

### Details

在版本4.2中引入

默认情况下，此选项设置为 "calendar_id"。

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
- [工作时间计算](guides/working-time.md#unsettingtheworkingtime)

