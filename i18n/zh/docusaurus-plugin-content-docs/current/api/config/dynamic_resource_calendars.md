---
sidebar_label: dynamic_resource_calendars
title: dynamic_resource_calendars config
description: "允许自动将多个资源日历合并为一个日历"
---

# dynamic_resource_calendars
:::info
 此功能仅包含在PRO版本中。 
:::
### Description

@short: 允许自动将多个资源日历合并为一个日历

@signature: dynamic_resource_calendars: boolean

### Example

~~~jsx
gantt.config.dynamic_resource_calendars = true;
~~~

### Related samples
- [Merge work Calendars of different resources](https://docs.dhtmlx.com/gantt/samples/09_worktime/10_merge_calendars.html)


### Related API
- [resource_calendars](api/config/resource_calendars.md)
- [addCalendar](api/method/addcalendar.md)

### Related Guides
- [工作时间计算](guides/working-time.md#mergingcalendars)

### Change log
- 在v7.0版本中添加

