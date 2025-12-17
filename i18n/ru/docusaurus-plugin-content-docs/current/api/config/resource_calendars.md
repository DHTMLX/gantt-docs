---
sidebar_label: resource_calendars
title: resource_calendars config
description: "обеспечивает возможность определения рабочих календарей, которые могут быть связаны с конкретными ресурсами, такими как пользователи"
---

# resource_calendars
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Обеспечивает возможность определения рабочих календарей, которые могут быть связаны с конкретными ресурсами, такими как пользователи

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

// связывание календаря с конкретной задачей
{"id":3, user:"1", "text":"Task #2", "start_date":"11-04-2013", 
    "duration":"4", "parent":"1", "progress": 0.6, "open": true}
~~~

**Default value:** \{\}

### Details


- **[resourceId: string | number]** - (*string | number | \{[resourceId: string | number]: string | number | undefined \} | undefined*) - определяет сопоставление для resource_calendars


До версии 7.0 dhtmlxGantt использовал немного другой формат для **resource_calendars**.

Обновленный способ назначения рабочего календаря пользователю, показанный выше, проще и удобнее, но предыдущий формат конфигурации для **resource_calendars** по-прежнему поддерживается:

~~~js
// определение рабочего календаря
var johnCalendarId = gantt.addCalendar({
    worktime: {
        days: [0, 1, 1, 1, 1, 1, 0]
    }
}),

// связывание календаря с пользователем
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
- [Расчёт рабочего времени](guides/working-time.md#assigningcalendartoresource)

### Change log
- введено в версии 4.2
- формат конфигурации обновлен в версии 7.0

