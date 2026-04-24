---
sidebar_label: deleteCalendar
title: deleteCalendar method
description: "id로 태스크 캘린더를 삭제합니다"
---

# deleteCalendar

### Description

@short: id로 태스크 캘린더를 삭제합니다

@signature: deleteCalendar: (id: string | number) => void

### Parameters

- `id` - (required) *string | number* -        해당 캘린더의 ID

### Example

~~~jsx
// 캘린더 추가
gantt.addCalendar({
    id:"custom",
    worktime: {
        hours: [8, 17],
        days: [ 1, 1, 1, 1, 1, 1 ,1]
    }
});

// 캘린더 삭제
gantt.deleteCalendar("custom");
~~~

### Details

버전 4.2에서 추가되었습니다

### Related API
- [addCalendar](api/method/addcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#multipleworktimecalendars)

