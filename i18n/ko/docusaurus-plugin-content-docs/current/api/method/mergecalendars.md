---
sidebar_label: mergeCalendars
title: mergeCalendars method
description: "여러 작업 캘린더를 하나의 캘린더로 결합합니다."
---

# mergeCalendars

### Description

@short: 여러 작업 캘린더를 하나의 캘린더로 결합합니다.

@signature: mergeCalendars: (calendars: Calendar[] | Calendar, calendar2?: Calendar) =\> void

### Parameters

- `calendars` - (required) *Calendar[] | Calendar* -       캘린더 객체 배열 또는 단일 캘린더 객체
- `calendar2` - (optional) *Calendar* - 선택 사항, 두 번째 캘린더 객체

### Example

~~~jsx
const johnCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["0:00-24:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});
const mikeCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["8:00-12:00", "13:00-17:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});

// 병합할 캘린더 배열 제공
const joinedCalendar = gantt.mergeCalendars([
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
]);
~~~

### Details

여러 캘린더 객체를 별도의 인수로 **mergeCalendars** 메서드에 전달할 수도 있습니다:

~~~js
// 캘린더를 별도의 인수로 제공
const joinedCalendar = gantt.mergeCalendars(
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
);
~~~

## 캘린더 병합 작동 방식

캘린더가 병합될 때, 결과 캘린더의 작업일은 모든 병합된 캘린더에서 해당 일이 작업일인지 논리 AND (&&) 연산으로 확인하여 결정됩니다:

~~~html
// 캘린더 1 + 캘린더 2 = 병합된 캘린더;

// 경우 1: 
// 작업일 (1/true) + 작업일 (1/true) = 작업일 (1/true);

// 경우 2: 
// 작업일 (1/true) + 비작업일 (0/false) = 비작업일 (0/false);

// 경우 3: 
// 비작업일 (0/false) + 비작업일 (0/false) = 비작업일 (0/false);
~~~

예를 들어, 두 캘린더가 있다고 가정하면:

- 첫 번째 캘린더는 월요일과 수요일이 작업일입니다:

~~~js
const calendar1Id = gantt.addCalendar({
    id: "calendar1",
    worktime: {
        days: [ 0, 1, 0, 1, 0, 0, 0 ]
    }
});
~~~

- 두 번째 캘린더는 월요일, 화요일, 목요일이 작업일입니다:

~~~js
const calendar2Id = gantt.addCalendar({
    id: "calendar2",
    worktime: {
        days: [ 0, 1, 1, 0, 1, 0, 0 ]
    }
});
~~~

이 캘린더들을 병합하면:

~~~js
const joinedCalendar = gantt.mergeCalendars([
    gantt.getCalendar(calendar1Id),
    gantt.getCalendar(calendar2Id)
]);
~~~

월요일만 작업일인 캘린더가 생성됩니다:

~~~html
// days: [ 0, 1, 0, 1, 0, 0, 0 ]

// +

// days: [ 0, 1, 1, 0, 1, 0, 0 ]

// =

// days: [ 0, 1, 0, 0, 0, 0, 0 ]
~~~

**관련 샘플:** [Gantt. Merge work calendars (via mergeCalendars() method)](https://snippet.dhtmlx.com/56vubu7a)

:::note
병합 로직은 [customWeeks](api/method/addcalendar.md)를 고려하지 않습니다. 
:::

### Related API
- [calendar](api/other/calendar.md)
- [getCalendar](api/method/getcalendar.md)
- [getResourceCalendar](api/method/getresourcecalendar.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#assigningcalendartoresource)

### Change log
- v7.0에 추가됨

