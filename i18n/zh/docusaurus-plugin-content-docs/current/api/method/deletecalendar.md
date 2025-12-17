---
sidebar_label: deleteCalendar
title: deleteCalendar method
description: "使用日历的 id 删除任务日历"
---

# deleteCalendar

### Description

@short: 使用日历的 id 删除任务日历

@signature: deleteCalendar: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -        日历的 id

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

版本 4.2 引入

### Related API
- [addCalendar](api/method/addcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

