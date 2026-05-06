---
sidebar_label: dynamic_resource_calendars
title: dynamic_resource_calendars config
description: "ermöglicht die automatische Zusammenführung mehrerer Ressourcenkalender zu einem einzigen Kalender"
---

# dynamic_resource_calendars

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Ermöglicht die automatische Zusammenführung mehrerer Ressourcenkalender zu einem Kalender

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
- [Work Time Calculation](guides/working-time.md#mergingcalendars)

### Change log
- hinzugefügt in v7.0