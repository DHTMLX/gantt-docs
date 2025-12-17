---
sidebar_label: mergeCalendars
title: mergeCalendars method
description: "将多个工作日历合并为一个日历"
---

# mergeCalendars

### Description

@short: 将多个工作日历合并为一个日历

@signature: mergeCalendars: (calendars: Calendar[] | Calendar, calendar2?: Calendar) =\> void

### Parameters

- `calendars` - (required) *Calendar[]* - | Calendar       可以是日历对象数组，也可以是单个日历对象
- `calendar2` - (optional) *Calendar* - 可选，第二个日历对象

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

// 提供一个日历数组进行合并
const joinedCalendar = gantt.mergeCalendars([
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
]);
~~~

### Details

你也可以将多个日历对象作为独立参数传递给 **mergeCalendars** 方法:

~~~js
// 以独立参数形式提供日历
const joinedCalendar = gantt.mergeCalendars(
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
);
~~~

## 日历合并的工作原理

合并日历时，合并后日历的工作日通过检查所有被合并日历中对应日期是否均为工作日来确定（使用逻辑与（&&）操作）:

~~~html
// 日历1 + 日历2 = 合并后的日历;

// 情况1：
// 工作日 (1/true) + 工作日 (1/true) = 工作日 (1/true);

// 情况2：
// 工作日 (1/true) + 非工作日 (0/false) = 非工作日 (0/false);

// 情况3：
// 非工作日 (0/false) + 非工作日 (0/false) = 非工作日 (0/false);
~~~

例如，给定两个日历:

- 第一个日历在周一和周三为工作日:

~~~js
const calendar1Id = gantt.addCalendar({
    id: "calendar1",
    worktime: {
        days: [ 0, 1, 0, 1, 0, 0, 0 ]
    }
});
~~~

- 第二个日历在周一、周二和周四为工作日:

~~~js
const calendar2Id = gantt.addCalendar({
    id: "calendar2",
    worktime: {
        days: [ 0, 1, 1, 0, 1, 0, 0 ]
    }
});
~~~

合并这两个日历:

~~~js
const joinedCalendar = gantt.mergeCalendars([
    gantt.getCalendar(calendar1Id),
    gantt.getCalendar(calendar2Id)
]);
~~~

结果是一个只有周一为工作日的日历:

~~~html
// days: [ 0, 1, 0, 1, 0, 0, 0 ]

// +

// days: [ 0, 1, 1, 0, 1, 0, 0 ]

// =

// days: [ 0, 1, 0, 0, 0, 0, 0 ]
~~~

**相关示例:** [Gantt. Merge work calendars (via mergeCalendars() method)](https://snippet.dhtmlx.com/56vubu7a)

:::note
 合并逻辑不考虑 [customWeeks](api/method/addcalendar.md)。 
:::

### Related API
- [calendar](api/other/calendar.md)
- [getCalendar](api/method/getcalendar.md)
- [getResourceCalendar](api/method/getresourcecalendar.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

### Change log
- v7.0 新增

