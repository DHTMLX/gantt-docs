---
sidebar_label: getTaskCalendar
title: getTaskCalendar method
description: "获取与特定任务关联的日历（任务级别设置的日历）"
---

# getTaskCalendar

### Description

@short: 获取与特定任务关联的日历（任务级别设置的日历）

@signature: getTaskCalendar: (task: any) =\> any

### Parameters

- `task` - (required) *string | number | object* -        任务的ID或任务对象本身

### Returns
- ` task_calendar` - (object) - 与任务关联的日历对象

### Example

~~~jsx
const task_calendar = gantt.getTaskCalendar({
    "id":2, 
    "calendar_id":"custom", 
    "text":"Task #1", 
    "start_date":"02-04-2013",
    "parent":"1", 
    "progress":0.5, 
    "open": true
});

gantt.getTaskCalendar(2);
~~~

### Related samples
- [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)

### Details

版本4.2中新增

上面示例中返回的对象对应于一个[calendar object](api/other/calendar.md)。当[work_time](api/config/work_time.md)选项关闭时，该方法默认返回一个配置为全天候24/7工作的日历。

### Related API
- [getCalendar](api/method/getcalendar.md)
- [getCalendars](api/method/getcalendars.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

