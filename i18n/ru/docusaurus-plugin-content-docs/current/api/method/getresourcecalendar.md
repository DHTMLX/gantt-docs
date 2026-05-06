---
sidebar_label: getResourceCalendar
title: getResourceCalendar метод
description: "возвращает календарь, к которому привязан ресурс"
---

# getResourceCalendar

:::info
Эта функциональность доступна только в версии PRO.
:::

### Description

@short: Возвращает календарь, к которому привязан ресурс

@signature: getResourceCalendar: (resource: string | number | object) => any

### Parameters

- `resource` - (required) *string | number | object* -        идентификатор или объект ресурса

### Returns
- ` param` - (object) - объект календаря

### Example

~~~jsx
var calendar = gantt.getResourceCalendar(mikeCalendarId);
~~~

### Details

### Related API
- [resource_calendars](api/config/resource_calendars.md)

### Related Guides
- [Расчет рабочего времени](guides/working-time.md#assigningcalendartoresource)

### Change log
- добавлено в версии 7.0