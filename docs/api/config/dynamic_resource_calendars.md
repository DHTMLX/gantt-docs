---
sidebar_label: dynamic_resource_calendars
title: dynamic_resource_calendars config
description: "enables automatic merging of multiple resource calendars into one"
---

# dynamic_resource_calendars

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Enables automatic merging of multiple resource calendars into one

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
- added in v7.0

