---
sidebar_label: deleteCalendar
title: deleteCalendar 方法
description: "通过其 ID 删除任务日历"
---

# deleteCalendar

### Description

@short: 通过其 ID 删除任务日历

@signature: deleteCalendar: (id: string | number) =\> void

### Parameters

- `id` - (必填) *string | number* - 日历的 ID

### Example

~~~jsx
// 添加日历
gantt.addCalendar({
    id:"custom",
    worktime: {
        hours: [8, 17],
        days: [ 1, 1, 1, 1, 1, 1 ,1]
    }
});

// 删除日历
gantt.deleteCalendar("custom");
~~~

### Details

在版本 4.2 中新增

### Related API
- [addCalendar](api/method/addcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#multipleworktimecalendars)