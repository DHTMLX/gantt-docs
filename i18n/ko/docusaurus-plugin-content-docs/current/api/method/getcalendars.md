---
sidebar_label: getCalendars
title: getCalendars method
description: "현재 Gantt에 추가된 모든 캘린더를 가져옵니다."
---

# getCalendars

### Description

@short: 현재 Gantt에 추가된 모든 캘린더를 가져옵니다.

@signature: getCalendars: () =\> any[]

### Returns
- ` calendars` - (array) - 모든 캘린더를 포함하는 배열입니다.

### Example

~~~jsx
var calendars = gantt.getCalendars();
~~~

### Details

버전 4.2에서 도입되었습니다.

### Related API
- [getCalendar](api/method/getcalendar.md)
- [getTaskCalendar](api/method/gettaskcalendar.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#multipleworktimecalendars)

