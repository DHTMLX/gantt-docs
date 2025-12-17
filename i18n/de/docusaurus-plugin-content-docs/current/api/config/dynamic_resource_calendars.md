---
sidebar_label: dynamic_resource_calendars
title: dynamic_resource_calendars config
description: "ermöglicht das automatische Zusammenführen mehrerer Ressourcen-Kalender zu einem einzigen Kalender"
---

# dynamic_resource_calendars

### Description

@short: Ermöglicht das automatische Zusammenführen mehrerer Ressourcen-Kalender zu einem einzigen Kalender

@signature: dynamic_resource_calendars: boolean

### Example

~~~jsx
gantt.config.dynamic_resource_calendars = true;
~~~

### Related samples
- [Merge work Calendars of different resources](https://docs.dhtmlx.com/gantt/samples/09_worktime/10_merge_calendars.html)

### Details

:::note
 Dieses Feature ist nur in der PRO Edition enthalten. 
:::

### Related API
- [resource_calendars](api/config/resource_calendars.md)
- [addCalendar](api/method/addcalendar.md)

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md#mergingcalendars)

### Change log
- hinzugefügt in v7.0

