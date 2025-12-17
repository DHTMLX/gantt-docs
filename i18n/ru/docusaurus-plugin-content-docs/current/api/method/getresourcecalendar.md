---
sidebar_label: getResourceCalendar
title: getResourceCalendar method
description: "получает календарь, назначенный конкретному ресурсу"
---

# getResourceCalendar
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Получает календарь, назначенный конкретному ресурсу

@signature: getResourceCalendar: (resource: any) =\> any

### Parameters

- `resource` - (required) *string | number | object* -        id ресурса или сам объект ресурса

### Returns
- ` param` - (object) - объект календаря, связанный с ресурсом

### Example

~~~jsx
var calendar = gantt.getResourceCalendar(mikeCalendarId);
~~~

### Related API
- [resource_calendars](api/config/resource_calendars.md)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md#assigningcalendartoresource)

### Change log
- добавлено в v7.0

