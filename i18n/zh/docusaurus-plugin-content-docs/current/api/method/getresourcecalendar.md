--- 
sidebar_label: getResourceCalendar
title: getResourceCalendar 方法
description: "返回分配给资源的日历"
---

# getResourceCalendar

:::info
此功能仅在 PRO 版本中可用。 
:::

### Description

@short: 返回分配给资源的日历

@signature: getResourceCalendar: (resource: string | number | object) =\> any

### Parameters

- `resource` - (required) *string | number | object* -        资源的 ID 或对象

### Returns
- ` param` - (object) - 日历对象

### Example

~~~jsx
var calendar = gantt.getResourceCalendar(mikeCalendarId);
~~~

### Related API
- [resource_calendars](api/config/resource_calendars.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#assigningcalendartoresource)

### Change log
- 在 v7.0 中新增