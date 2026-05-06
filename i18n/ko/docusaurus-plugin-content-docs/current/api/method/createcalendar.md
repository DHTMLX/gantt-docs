---
sidebar_label: createCalendar
title: createCalendar method
description: "작동하는 캘린더를 생성합니다"
---

# createCalendar

### Description

@short: 작동하는 캘린더를 생성합니다

@signature: createCalendar: (parentCalendar?: Calendar) =\> Calendar

### Parameters

- `parentCalendar`	- (optional) *Calendar* - 기존의 캘린더로, 이를 기반으로 새로운 캘린더를 생성하는 데 사용됩니다		

### Returns
- `calendar` - (Calendar) - 캘린더 객체

### Example

~~~jsx
// 주 7일, 하루 24시간의 풀타임 캘린더를 생성
var calendar1 = gantt.createCalendar();

// 기존 캘린더를 기반으로 새 캘린더를 생성합니다(복사).
var calendar2 = gantt.createCalendar(parentCalendar);
~~~

### Details

버전 4.2에 추가되었습니다

캘린더가 생성되면, [addCalendar](api/method/addcalendar.md) 메서드를 사용하여 Gantt에 추가해야 합니다:

~~~js
gantt.addCalendar(calendar1);
~~~

### Related API
- [addCalendar](api/method/addcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#multipleworktimecalendars)

