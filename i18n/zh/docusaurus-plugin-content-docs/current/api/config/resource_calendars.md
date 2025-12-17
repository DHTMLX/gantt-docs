---
sidebar_label: resource_calendars
title: resource_calendars config
description: "提供了一种定义工作日历的方法，可以将其链接到特定资源，如用户"
---

# resource_calendars
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 提供了一种定义工作日历的方法，可以将其链接到特定资源，如用户

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

// 将日历链接到特定任务
{"id":3, user:"1", "text":"Task #2", "start_date":"11-04-2013", 
    "duration":"4", "parent":"1", "progress": 0.6, "open": true}
~~~

**Default value:** \{\}

### Details

- **[resourceId: string | number]** - (*string | number | \{[resourceId: string | number]: string | number | undefined \} | undefined*) - 定义资源日历的映射关系


在7.0版本之前，dhtmlxGantt使用了稍有不同的**resource_calendars**格式。

上面展示的为用户分配工作日历的更新方法更简单且更易用，但之前的**resource_calendars**配置格式仍然被支持:

~~~js
// 定义一个工作日历
var johnCalendarId = gantt.addCalendar({
    worktime: {
        days: [0, 1, 1, 1, 1, 1, 0]
    }
}),

// 将日历链接到用户
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
- [工作时间计算](guides/working-time.md)

### Change log
- 在4.2版本中引入
- 在7.0版本中更新配置格式

