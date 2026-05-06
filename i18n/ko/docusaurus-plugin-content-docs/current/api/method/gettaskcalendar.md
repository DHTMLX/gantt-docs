---
sidebar_label: getTaskCalendar
title: getTaskCalendar method
description: "지정된 작업에 할당된 달력(작업 수준의 달력)을 가져옵니다"
---

# getTaskCalendar

### Description

@short: 지정된 작업에 할당된 달력(작업 수준의 달력)을 가져옵니다

@signature: getTaskCalendar: (task: *string | number | object) =\> any

### Parameters

- `task` - (required) *string | number | object* -        작업의 ID 또는 객체

### Returns
- ` task_calendar` - (object) - 작업의 달력 객체

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

버전 4.2에서 추가됨

위 예제에 대한 반환 객체는 [달력 객체](api/other/calendar.md)입니다. [work_time](api/config/work_time.md) 옵션이 비활성화되면, 이 메서드는 24/7 근무 시간이 활성화된 달력을 반환합니다.

### Related API
- [getCalendar](api/method/getcalendar.md)
- [getCalendars](api/method/getcalendars.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)