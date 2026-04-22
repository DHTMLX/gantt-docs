---
sidebar_label: addCalendar
title: addCalendar method
description: "向 Gantt 添加日历"
---

# addCalendar

### Description

@short: 向 Gantt 中添加日历

@signature: addCalendar: (calendar: CalendarConfig) =\> string

### Parameters

- `calendar` - (required) *CalendarConfig* - 一个带有日历配置信息的对象

### Returns
- `calendarId` - (string) - 日历的 ID

### Example

~~~jsx
// 添加一个已有的日历
const calendarId = gantt.addCalendar(calendar);

// 使用新的配置添加一个日历
const calendarId = gantt.addCalendar({
    id: "custom", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});

// 新增一個具有新配置的日曆（ `days` 屬性設定為物件）
const calendarId = gantt.addCalendar({
    id: "global", // 日曆 ID 為可選參數
    worktime: {
      hours: ["8:00-12:00", "13:00-17:00"], // 全球工作日工時
      days: {
        weekdays: [0, 1, 1, 1, 1, 1, 0],
        dates: {
          "2025-04-06": true,  // 為特定日期覆蓋工作時間
          "2025-04-08": false,
          "2025-04-09":  ["9:00-15:00"]
        }
      },
      customWeeks: {
        lastMonthOfTheYear: {
          from: new Date(2025, 11, 1),
          to: new Date(2026, 0, 1),
          hours: ["9:00-13:00"],
          days: {
            weekdays: [0, 1, 1, 1, 1, 0, 0],
            dates: {
              "2025-12-08": true,
              "2025-12-09":  false,
              "2025-12-10":  ["9:00-15:00"]
            }
          }
        }
      }
    }
});

const calendar = gantt.getCalendar(calendarId);
~~~

### Related samples
- [任务级日历](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)
- [资源级日历](https://docs.dhtmlx.com/gantt/samples/09_worktime/07_resource_calendars.html)
- [不同时间段的工作时间](https://docs.dhtmlx.com/gantt/samples/09_worktime/12_calendar_ranges.html)

### Details

日历配置对象可以包含以下属性:

- **id?** - (*string | number*) - 可选，日历的 ID
- **worktime?** - (*object*) - 设置按天和小时的工作时间的对象。它可以包括：
- **_hours?_** - (*string[] | number[] | boolean*) - 可选，一个包含全局工作时段的数组，用于设定任务的起始和结束时刻
- **_days?_** - (*WorkDaysTuple* | *object*) - 可选，它可以是：
    -  既可以是一个包含一周七天的数组（从 0 - 星期日，到 6 - 星期六），其中 1/true 代表工作日，0/false 代表非工作日
    -  也可以是一个包含工作日和日期的对象。它可以包括：
        -  **_weekdays?_** - (*WorkDaysTuple*) 可选，表示一周七天的数组（从 0 - 星期日，到 6 - 星期六），其中 1/true 代表工作日，0/false 代表非工作日
        -  **_dates?_** - (*object*) 可选，包含指定日期的工作时间设置的对象。该对象可以包含若干键值对，其格式为：
            - 键（key）是以字符串形式表示的日期
            - 值（value）可以是以 'from'-'to' 对表示的工作时间数组，或布尔值（'false' 表示休息日，'true' 表示应用默认工时（["8:00-17:00"]））
- **_customWeeks?_** - (*object*) - 可选，是一个包含不同时段工作时间规则的对象。对象中可以包含一组键值对，键是时间段的名称，值是包含属性列表的对象。
    - **_[timespan: string]_** - (*object*) - 具有工作时间设置的时间段对象。该对象的名称被用作时间段的名称
        - **_from_** - (*Date*) - 计划开始时间的日期
        - **_to_** - (*Date*) - 计划结束时间的日期
        - **_hours?_** - (*Array&lt;string | number&gt;*) - 可选，以 'from'-'to' 对表示的工作时段数组。'false' 值表示休息日，'true'（默认值）应用默认工时（["8:00-17:00"]）
        - **_days?_** - (*WorkDaysTuple* | *object*) - 可选，可以是：
            -  既可以是一个包含一周七天的数组（从 0 - 星期日，到 6 - 星期六），其中 1/true 代表工作日，0/false 代表非工作日
            -  也可以是一个包含工作日和日期的对象。它可以包括：
                -  **_weekdays?_** - (*WorkDaysTuple*) 可选，表示一周七天的数组（从 0 - 星期日，到 6 - 星期六），其中 1/true 代表工作日，0/false 代表非工作日
                -  **_dates?_** - (*object*) 可选，包含指定日期的工作时间设置的对象。该对象可以包含若干键值对，其格式为：
                    - 键是以字符串形式表示的日期
                    - 值可以是以 'from'-'to' 对表示的工作时间数组，或布尔值（'false' 表示休息日，'true' 表示应用默认工时（["8:00-17:00"]））


### Setting individual working hours for a day

除了星期幾的日期，您還可以為這一天設定自訂工作時間。例如：

~~~js
const calendar = {
    id: "calendar1", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [0, 1, 1, 1, ["12:00-17:00"], 1, 0]
    }
}
~~~

这里，["12:00-17:00"] 表示周四的工作时间为中午12点到下午5点。

### Setting worktime for different time intervals

## 为不同时间段定义工作时间

你可以使用 **customWeeks** 属性为不同时间段指定不同的工作时间规则:

~~~js
gantt.addCalendar({
    id: "global", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1],
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // December 1st, 2025
                to: new Date(2026, 2, 1), // March 1st, 00:00, 2026
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});
~~~

### Setting worktime for certain dates

您也可以透過在 **_days_** 物件的 **_dates_** 屬性中設定工作時間來指定特定日期的工作時間（包括 **worktime** 屬性和 **customWeeks** 屬性）。例如：

~~~js
const calendar = {
    id: "calendar1", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: { 
        	dates: { 
          		"2025-04-09":  ["9:00-15:00"] 
        	} 
    	},
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // December 1st, 2025
                to: new Date(2026, 2, 1), // March 1st, 00:00, 2026
                hours: ["9:00-13:00", "14:00-16:00"],
                days: { 
                    dates: { 
                        "2026-01-02":  ["9:00-15:00"] 
                    } 
                }
            }
        }
    }
}
~~~

### Related API
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#multipleworktimecalendars)

### Change log
- 将 **_days_** 属性指定为带有 weekdays 和 dates 的 *object* 的能力在 v9.1 中新增
- 在 v7.1 中新增 **customWeeks** 属性；
- 于版本 4.2 新增