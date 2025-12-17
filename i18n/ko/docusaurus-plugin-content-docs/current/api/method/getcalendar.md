---
sidebar_label: getCalendar
title: getCalendar method
description: "아이디로 작업 시간 캘린더를 조회합니다"
---

# getCalendar

### Description

@short: 아이디로 작업 시간 캘린더를 조회합니다

@signature: getCalendar: (calendarId?: string | number) =\> Calendar

### Parameters

- `calendarId` - (optional) *string | number* -        선택 사항, 글로벌 캘린더의 아이디 또는 "global"

### Returns
- ` config` - (Calendar) - 캘린더 객체

### Example

~~~jsx
var calendar = gantt.getCalendar(calendarId);
~~~

### Details

위 예제에서 반환된 객체는 [캘린더 객체](api/other/calendar.md)입니다.

기본 작업 시간은 다음과 같이 설정되어 있습니다:

- 작업일은 월요일부터 금요일까지입니다.
- 근무 시간은 08:00부터 17:00까지입니다.

### Related API
- [getCalendars](api/method/getcalendars.md)
- [getTaskCalendar](api/method/gettaskcalendar.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#multipleworktimecalendars)

### Change log
- 4.2 버전에 추가됨

