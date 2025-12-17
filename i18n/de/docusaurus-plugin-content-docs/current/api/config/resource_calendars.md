---
sidebar_label: resource_calendars
title: resource_calendars config
description: "bietet eine Möglichkeit, Arbeitskalender zu definieren, die mit bestimmten Ressourcen wie Benutzern verknüpft werden können"
---

# resource_calendars
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Bietet eine Möglichkeit, Arbeitskalender zu definieren, die mit bestimmten Ressourcen wie Benutzern verknüpft werden können

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

// Verknüpfung des Kalenders mit einer bestimmten Aufgabe
{"id":3, user:"1", "text":"Task #2", "start_date":"11-04-2013", 
    "duration":"4", "parent":"1", "progress": 0.6, "open": true}
~~~

**Default value:** \{\}

### Details


- **[resourceId: string | number]** - (*string | number | \{[resourceId: string | number]: string | number | undefined \} | undefined*) - definiert die Zuordnung für den resource_calendar


Vor Version 7.0 verwendete dhtmlxGantt ein leicht anderes Format für **resource_calendars**.

Der oben gezeigte, aktualisierte Ansatz zur Zuordnung eines Arbeitskalenders zu einem Benutzer ist einfacher und benutzerfreundlicher, aber das vorherige Konfigurationsformat für **resource_calendars** wird weiterhin unterstützt:

~~~js
// Definition eines Arbeitskalenders
var johnCalendarId = gantt.addCalendar({
    worktime: {
        days: [0, 1, 1, 1, 1, 1, 0]
    }
}),

// Verknüpfung des Kalenders mit einem Benutzer
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

### Change log
- eingeführt in Version 4.2
- Konfigurationsformat aktualisiert in Version 7.0

