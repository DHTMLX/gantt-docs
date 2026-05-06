---
sidebar_label: getResourceCalendar
title: getResourceCalendar Methode
description: "gibt einen Kalender zurück, dem die Ressource zugewiesen ist"
---

# getResourceCalendar

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Gibt einen Kalender zurück, dem die Ressource zugewiesen ist

@signature: getResourceCalendar: (resource: string | number | object) =\> any

### Parameters

- `resource` - (erforderlich) *string | number | object* -        die ID oder das Objekt der Ressource

### Returns
- ` param` - (object) - das Kalender-Objekt

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
- hinzugefügt in v7.0