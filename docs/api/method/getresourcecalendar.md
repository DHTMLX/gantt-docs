---
sidebar_label: getResourceCalendar
title: getResourceCalendar method
description: "returns a calendar which the resource is assigned to"
---

# getResourceCalendar

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Returns a calendar which the resource is assigned to

@signature: getResourceCalendar: (resource: string | number | object) =\> any

### Parameters

- `resource` - (required) *string | number | object* -        the id or object of the resource

### Returns
- ` param` - (object) - the calendar object

### Example

~~~jsx
var calendar = gantt.getResourceCalendar(mikeCalendarId);
~~~

### Details

### Related API
- [resource_calendars](api/config/resource_calendars.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#assigningcalendartoresource)

### Change log
- added in v7.0

