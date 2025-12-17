---
sidebar_label: deleteCalendar
title: deleteCalendar method
description: "아이디를 사용하여 작업 캘린더를 삭제합니다."
---

# deleteCalendar

### Description

@short: 아이디를 사용하여 작업 캘린더를 삭제합니다.

@signature: deleteCalendar: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -        캘린더의 아이디

### Example

~~~jsx
// 캘린더 추가하기
gantt.addCalendar({
    id:"custom",
    worktime: {
        hours: [8, 17],
        days: [ 1, 1, 1, 1, 1, 1 ,1]
    }
});

// 캘린더 삭제하기
gantt.deleteCalendar("custom");
~~~

### Details

버전 4.2에서 도입됨

### Related API
- [addCalendar](api/method/addcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#multipleworktimecalendars)

