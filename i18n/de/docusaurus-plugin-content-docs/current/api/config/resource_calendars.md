---
sidebar_label: resource_calendars
title: resource_calendars config
description: "definiert eine Reihe von Arbeitskalendern, die einer bestimmten Ressource, z. B. einem Benutzer, zugewiesen werden können"
---

# resource_calendars
:::info
Diese Funktionalität ist in der PRO-Edition verfügbar. 
:::
### Description

@short: Definiert eine Reihe von Arbeitskalendern, die einer bestimmten Ressource, z. B. einem Benutzer, zugewiesen werden können

@signature: resource_calendars: \{ [resourceId: string | number]: string | number | \{ [resourceId: string | number]: string | number | undefined \} | undefined \}

### Example

~~~jsx
gantt.config.resource_property = "user"
gantt.config.resource_calendars = {
      1 : gantt.addCalendar({
          worktime: {
             days: [0, 1, 1, 1, 1, 1, 0]
          }
     })
};

// assigning the calendar to a particular task
{"id":3, user:"1", "text":"Task #2", "start_date":"11-04-2013", 
    "duration":"4", "parent":"1", "progress": 0.6, "open": true}
~~~

**Default value:** \{\}

### Details

- **[resourceId: string | number]** - (*string | number | \{[resourceId: string | number]: string | number | undefined \} | undefined*) - Zuordnung des Ressourcenkalenders


Before version 7.0, dhtmlxGantt used a slightly different format of **resource_calendars**.

Die neue Art, einen Arbeitskalender einem Benutzer zuzuweisen, die oben beschrieben ist, ist einfacher und bequemer zu verwenden, aber die alte Konfiguration der **resource_calendars**-Eigenschaft funktioniert ebenfalls:

~~~js
// adding a working calendar
var johnCalendarId = gantt.addCalendar({
    worktime: {
        days: [0, 1, 1, 1, 1, 1, 0]
    }
}),

// binding the calendar to a user
gantt.config.resource_calendars = {
  "user":{
      1 : johnCalendarId
   }
};
~~~

### Related API
- [addCalendar](api/method/addcalendar.md)
- [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md)
- [getResourceCalendar](api/method/getresourcecalendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#assigningcalendartoresource)