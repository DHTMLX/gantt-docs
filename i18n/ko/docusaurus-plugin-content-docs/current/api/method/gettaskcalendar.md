---
sidebar_label: getTaskCalendar
title: getTaskCalendar method
description: "특정 작업에 연결된 캘린더(작업 수준에서 설정된 캘린더)를 가져옵니다."
---

# getTaskCalendar

### Description

@short: 특정 작업에 연결된 캘린더(작업 수준에서 설정된 캘린더)를 가져옵니다.

@signature: getTaskCalendar: (task: string | number | object) =\> any

### Parameters

- `task` - (required) *string | number | object* -        작업의 ID 또는 작업 객체 자체

### Returns
- ` task_calendar` - (object) - 작업과 연관된 캘린더 객체

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

위 예제에서 반환된 객체는 [calendar object](api/other/calendar.md)에 해당합니다. [work_time](api/config/work_time.md) 옵션이 비활성화된 경우, 이 메서드는 기본적으로 24시간 7일 작동하는 캘린더를 반환합니다.

### Related API
- [getCalendar](api/method/getcalendar.md)
- [getCalendars](api/method/getcalendars.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#multipleworktimecalendars)

