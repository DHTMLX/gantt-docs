---
sidebar_label: dynamic_resource_calendars
title: dynamic_resource_calendars config
description: "позволяет автоматически объединять несколько календарей ресурсов в один"
---

# dynamic_resource_calendars
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Позволяет автоматически объединять несколько календарей ресурсов в один

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
- [Расчёт рабочего времени](guides/working-time.md#mergingcalendars)

### Change log
- добавлено в версии 7.0

