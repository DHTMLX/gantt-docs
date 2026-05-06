---
sidebar_label: getTaskCalendar
title: getTaskCalendar method
description: "为指定任务分配的日历（任务级日历）"
---

# getTaskCalendar

### Description

@short: 获取分配给指定任务的日历（任务级日历）

@signature: getTaskCalendar: (task: *string | number | object) =\> any

### Parameters

- `task` - (required) *string | number | object* -        任务的 ID 或对象

### Returns
- ` task_calendar` - (object) - 该任务日历对象

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
- [任务级日历](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)

### Details

版本4.2中新增

上述示例返回的对象是一个 [日历对象](api/other/calendar.md)。如果 [work_time](api/config/work_time.md) 选项被禁用，该方法将返回启用 24/7 工作时间的日历对象。

### Related API
- [getCalendar](api/method/getcalendar.md)
- [getCalendars](api/method/getcalendars.md)

### Related Guides
- [工作时间计算](guides/working-time.md)