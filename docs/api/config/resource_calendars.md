---
sidebar_label: resource_calendars
title: resource_calendars config
description: "defines a set of working calendars that can be assigned to a specific resource, e.g. a user"
---

# resource_calendars
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Defines a set of working calendars that can be assigned to a specific resource, e.g. a user

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

- **[resourceId: string | number]** - (*string | number | \{[resourceId: string | number]: string | number | undefined \} | undefined*) - mapping of the resource calendar


Before version 7.0, dhtmlxGantt used a slightly different format of **resource_calendars**.

The new way of assigning a working calendar to a user described above is easier and more convenient to use but the old configuration of the **resource_calendars** property will also work:

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

