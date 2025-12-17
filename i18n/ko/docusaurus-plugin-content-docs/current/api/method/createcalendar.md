---
sidebar_label: createCalendar
title: createCalendar method
description: "기능성 캘린더를 설정합니다"
---

# createCalendar

### Description

@short: 기능성 캘린더를 설정합니다

@signature: createCalendar: (parentCalendar?: Calendar) =\> Calendar

### Parameters

- `parentCalendar` - (optional) *Calendar* - (선택 사항) 새 캘린더를 기반으로 할 기존 캘린더

### Returns
- ` calendar` - (Calendar) - 생성된 Calendar 객체

### Example

~~~jsx
// 전체 시간 캘린더 설정 (주 7일 근무, 하루 24시간)
var calendar1 = gantt.createCalendar();

// 기존 캘린더를 복사하여 새 캘린더 생성
var calendar2 = gantt.createCalendar(parentCalendar);
~~~

### Details

버전 4.2에 추가됨

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

