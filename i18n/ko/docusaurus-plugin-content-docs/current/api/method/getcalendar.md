---
sidebar_label: getCalendar
title: getCalendar 메서드
description: "ID로 근무 시간 캘린더를 가져옵니다"
---

# getCalendar

### Description

@short: ID로 근무 시간 캘린더를 가져옵니다

@signature: getCalendar: (calendarId?: string | number) => Calendar

### Parameters

-  `calendarId` -	(string | number) -	선택적, 전역 캘린더의 ID 또는 "global"

### Returns
- ` config` - (Calendar) - 캘린더 객체

### Example

~~~jsx
var calendar = gantt.getCalendar(calendarId);
~~~

### Details

위 예제의 반환 객체는 [calendar object](api/other/calendar.md)입니다.

기본 근무 시간은 다음과 같습니다:

- 근무일은 월요일부터 금요일까지입니다.
- 근무 시간은 08:00에서 17:00까지입니다.

### Related API
- [getCalendars](api/method/getcalendars.md)
- [getTaskCalendar](api/method/gettaskcalendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)

### Change log
- 버전 4.2에서 추가되었습니다.