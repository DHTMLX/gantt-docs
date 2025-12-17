---
sidebar_label: addCalendar
title: addCalendar method
description: "在甘特图中插入一个日历"
---

# addCalendar

### Description

@short: 在甘特图中插入一个日历

@signature: addCalendar: (calendar: CalendarConfig) =\> string

### Parameters

- `calendar` - (required) *CalendarConfig* - 一个包含日历配置的对象

### Returns
- ` calendarId` - (string) - 日历的标识符

### Example

~~~jsx
// 添加一个已有的日历
var calendarId = gantt.addCalendar(calendar);

// 使用新的配置添加一个日历
var calendarId = gantt.addCalendar({
    id:"custom", // 可选
    worktime: {
        hours: ["8:00-17:00"],
        days: [ 1, 1, 1, 1, 1, 1 ,1]
    }
});

var calendar = gantt.getCalendar(calendarId);
~~~

### Related samples
- [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)
- [Resource level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/07_resource_calendars.html)
- [Different worktimes for different time periods](https://docs.dhtmlx.com/gantt/samples/09_worktime/12_calendar_ranges.html)

### Details

日历配置对象可以包含以下属性:

- **id?** - (*string | number*) - 可选，日历的标识符
- **worktime?** - (*object*) - 定义工作日和工作时间。可以包含:
    - **_hours?_** - (*string[] | number[] | boolean*) - 可选，指定全局工作时间的数组，定义任务的开始和结束时间
    - **_days?_** - (*WorkDaysTuple*) - 可选，包含7个元素的数组，表示一周中的每天（0 - 周日，6 - 周六），1/true 表示工作日，0/false 表示非工作日
    - **_customWeeks?_** - (*object*) - 可选，定义不同时间段的不同工作时间规则的对象。由键值对组成，键为时间段名称，值为描述该时间段属性的对象。
        - **_[timespan: string]_** - (*object*) - 具有该时间段工作时间设置的对象。键作为时间段名称。
            - **_from_** - (*Date*) - 时间段的起始日期
            - **_to_** - (*Date*) - 时间段的结束日期
            - **_hours?_** - (*Array&lt;string | number&gt;*) - 可选，工作时间区间数组，格式为"开始-结束"对。false 表示休息日，true（默认）表示使用默认时间（["8:00-17:00"]）
            - **_days?_** - (*WorkDaysTuple | boolean*) - 可选，包含7个元素的数组，表示一周中的每天（0 - 周日，6 - 周六），1/true 表示工作日，0/false 表示非工作日。


## 为特定日期设置自定义工作时间

除了指定星期几的数字外，还可以为该天设置自定义工作时间。<br>
例如:

~~~js
var calendar = {
    id:"calendar1", // 可选
    worktime: {
        hours: ["8:00-17:00"],
        days: [ 0, 1, 1, 1, ["12:00-17:00"], 1, 0]
    }
}
~~~

这里，["12:00-17:00"] 表示周四的工作时间为中午12点到下午5点。


## 为不同时间段定义工作时间

你可以使用 **customWeeks** 属性为不同时间段指定不同的工作时间规则:

~~~js
// 使用新配置添加日历
gantt.addCalendar({
    id:"default", // 可选
    worktime: {
        hours: ["8:00-17:00"],
        days: [ 1, 1, 1, 1, 1, 1 ,1],
        customWeeks: {
            winter: {
                from: new Date(2020, 11, 1),// 2020年12月1日
                to: new Date(2021, 2, 1),// 2021年3月1日 00:00
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [ 1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});
~~~

### Related API
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

### Change log
- **customWeeks** 属性于 v7.1 引入；
- 于版本 4.2 添加

