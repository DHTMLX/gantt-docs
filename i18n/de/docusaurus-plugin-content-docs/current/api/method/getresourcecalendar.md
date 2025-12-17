---
sidebar_label: getResourceCalendar
title: getResourceCalendar method
description: "ruft den Kalender ab, der einem bestimmten Resource zugewiesen ist"
---

# getResourceCalendar

### Description

@short: Ruft den Kalender ab, der einem bestimmten Resource zugewiesen ist

@signature: getResourceCalendar: (resource: any) =\> any

### Parameters

- `resource` - (required) *string | number | object* -        die ID der Resource oder das Resource-Objekt selbst

### Returns
- ` param` - (object) - das Kalenderobjekt, das mit der Resource verknüpft ist

### Example

~~~jsx
var calendar = gantt.getResourceCalendar(mikeCalendarId);
~~~

### Details

:::note
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::

### Related API
- [resource_calendars](api/config/resource_calendars.md)

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md#assigningcalendartoresource)

### Change log
- hinzugefügt in v7.0

