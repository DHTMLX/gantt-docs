---
sidebar_label: dynamic_resource_calendars
title: dynamic_resource_calendars 配置
description: "启用将多个资源日历自动合并为一个的功能"
---

# dynamic_resource_calendars

:::info
此功能仅在 PRO 版本中可用。
:::

### Description

@short: 启用将多个资源日历自动合并为一个

@signature: dynamic_resource_calendars: boolean

### Example

~~~jsx
gantt.config.dynamic_resource_calendars = true;
~~~

### Related samples
- [将不同资源的工作日历合并](https://docs.dhtmlx.com/gantt/samples/09_worktime/10_merge_calendars.html)

### Related API
- [resource_calendars](api/config/resource_calendars.md)
- [addCalendar](api/method/addcalendar.md)

### Related Guides
- [工作时间计算](guides/working-time.md#mergingcalendars)

### Change log
- 在 v7.0 中新增