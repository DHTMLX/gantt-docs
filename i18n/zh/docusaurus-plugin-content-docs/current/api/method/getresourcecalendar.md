---
sidebar_label: getResourceCalendar
title: getResourceCalendar method
description: "获取分配给特定资源的日历"
---

# getResourceCalendar
:::info
 该功能仅包含在PRO版本中。 
:::
### Description

@short: 获取分配给特定资源的日历

@signature: getResourceCalendar: (resource: any) =\> any

### Parameters

- `resource` - (required) *string | number | object* -        资源的ID或资源对象本身

### Returns
- ` param` - (object) - 与资源关联的日历对象

### Example

~~~jsx
var calendar = gantt.getResourceCalendar(mikeCalendarId);
~~~


### Related API
- [resource_calendars](api/config/resource_calendars.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

### Change log
- v7.0版本新增

