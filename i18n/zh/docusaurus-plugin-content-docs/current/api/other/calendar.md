---
sidebar_label: calendar
title: calendar config
description: "工作日历对象的接口"
---

# calendar

### Description

@short: 工作日历对象的接口

@signature: calendar: Calendar


### Details

有关工作日历的更多详细信息，请参阅 [工作时间计算](guides/working-time.md#multipleworktimecalendars) 文章。

**calendar** 对象包含以下方法和属性:

## 方法

- **setWorkTime (config): boolean** - 定义甘特图的工作时间
    - **_config_** - (*object*) - 描述时间范围的[配置对象](api/method/setworktime.md):
        - **_day?_** - (*string | number*) - 可选，表示一周中的某一天，取值为 [0（周日）- 6（周六）]。注意，每次只能设置一个周几
        - **_date?_** - (*Date*) - 可选，指定日期，设为工作日或休息日
        - **_hours?_** - (*string[] | number[] | boolean*) - 可选，以 'from'-'to' 形式的工作时段数组。'false' 值表示休息日，'true'（默认值）应用默认时段（["8:00-17:00"]）
        - **_customWeeks?_** - (*object*) - 可选，包含不同时间段工作时间规则的对象。该对象可包含一组 key:value 对，其中 key 为时间段的名称，value 为包含属性列表的对象。
            - **_[timespan: string]_** - (*object*) - 具有工作时间设置的时间段对象。该对象的名称将用作时间段的名称
                - **_from_** - (*Date*) - 时间段开始的日期
                - **_to_** - (*Date*) - 时间段结束的日期
                - **_hours?_** - (*string[] | number[]*) - 可选，以 'from'-'to' 形式的工作时段数组。'false' 值表示休息日，'true'（默认值）应用默认时段（["8:00-17:00"]）
                - **_days?_** - (*WorkDaysTuple | boolean*) - 可选，表示一周的 7 天，从 0（周日）到 6（周六），其中 1/true 表示工作日，0/false 表示非工作日。

  
~~~js
calendar.setWorkTime({ hours:["9:00-18:00"] });
calendar.setWorkTime({ hours:["9:00-18:00"] });
calendar.setWorkTime({ day: 5, hours: ["9:00-18:00"] });
calendar.setWorkTime({ day: 5, hours: false });
calendar.setWorkTime({ date: new Date(2025, 5, 6), hours: ["9:00-18:00"] });
calendar.setWorkTime({ date: new Date(2025, 5, 6), hours: false });
calendar.setWorkTime({ hours: false });
calendar.setWorkTime({
  customWeeks: {
    winter: {
      from: new Date(2025, 11, 1),
      to: new Date(2026, 2, 1),
      hours: ["8:00-13:00", "14:00-16:00"],
      days: [1, 1, 1, 1, 1, 0, 0]
    },
    summer: {
      from: new Date(2026, 5, 1),
      to: new Date(2026, 7, 1),
      hours: ["10:00-13:00", "14:00-16:00"],
      days: [1, 1, 0, 1, 1, 0, 0]
    }
  }
});
calendar.setWorkTime({
  customWeeks: {
    winter: {
      from: new Date(2025, 11, 1),
      to: new Date(2026, 2, 1),
      hours: ["8:00-13:00", "14:00-16:00"],
      days: [1, ["8:00-13:00"], 1, 1, ["14:00-16:00"], 0, 0]
    },
    summer: {
      from: new Date(2026, 5, 1),
      to: new Date(2026, 7, 1),
      hours: ["10:00-13:00", "14:00-16:00"],
      days: false
    }
  }
});
~~~

- **unsetWorkTime (config): void** - 取消甘特圖中的工作時間設置
    - **_config_** - (*object*) - 描述时间范围的[配置对象](api/method/unsetworktime.md):
        - **_day?_** - (*string | number*) - 可选，表示一周中的某一天，取值为 [0（周日）- 6（周六）]。注意，每次只能设置一个周几
        - **_date?_** - (*Date*) - 可选，指定日期，设为工作日或休息日
        - **_hours?_** - (*string[] | number[] | boolean*) - 可选，以 'from'-'to' 形式的工作时段数组。
'false' 值表示取消工作时段，'true'（默认值）应用默认时段 (["8:00-17:00"])


~~~js
calendar.unsetWorkTime({ hours: ["9:00-18:00"] });
calendar.unsetWorkTime({ day: "5", hours: ["9:00-18:00"] });
calendar.unsetWorkTime({ day: 5, hours: false });
calendar.unsetWorkTime({ date: new Date(2025, 5, 6), hours: true });
~~~ 

- **isWorkTime (config, time_unit): boolean** - 判断指定日期是否为工作时间
    - **_config_** - (*Date | object*) - 要检查的日期或描述时间范围的[配置对象](api/method/isworktime.md):
        - **_date_** - (*Date*) - 要检查的日期
        - **_unit?_** - (*string*) - 可选，时间单位:"minute", "hour", "day", "week", "month", "year"
        - **_task?_** - (*Task*) - 可选，需考虑其持续时间的任务对象
    - **_time_unit?_** - (*string*) - 可选，时间单位:"minute", "hour", "day", "week", "month", "year"。如果第一个参数是对象，则不必提供<br><br>

~~~js
const calendar = gantt.getTaskCalendar(task);
if (calendar.isWorkTime({date: date})){
    alert("worktime of task" + task.text);
}

calendar.isWorkTime(new Date(2025, 5, 6));
calendar.isWorkTime(new Date(2025, 5, 6), "hour");
calendar.isWorkTime({ date: new Date(2025, 5, 6), unit: "hour" });
~~~

- **getClosestWorkTime (config): Date** - 查找最近的工作时间
    - **_config_** - (*Date | object*) - [配置对象](api/method/getclosestworktime.md):
        - **_date_** - (*Date*) - 要查找最近工作时间的日期
        - **_dir?_** - (*string*) - 可选，搜索方向:"future" 或 "past"
        - **_unit?_** - (*string*) - 可选，搜索使用的时间单位
        - **_task?_** - (*Task*) - 可选，使用其 calendar 的任务对象

~~~js
calendar.getClosestWorkTime(new Date(2025, 5, 6));
calendar.getClosestWorkTime({ 
    date: new Date(2025, 5, 6), 
    unit: "hour",
    dir: "past" 
});
~~~

- **calculateEndDate (config, duration, unit): Date** - 计算任务的结束日期
    - **_config_** - (*Date | object*) - 任务的开始日期或描述时间范围的[配置对象](api/method/calculateenddate.md):
        - **_start_date_** - (*Date*) - 任务开始日期
        - **_duration_** - (*number*) - 任务持续时间
        - **_unit?_** - (*string*) - 可选，持续时间的时间单位:"minute", "hour", "day", "week", "month", "year"
        - **_task?_** - (*Task*) - 可选，要计算持续时间的任务对象
    - **_duration?_** - (*number*) - 可选，任务持续时间。如果第一个参数是对象，则不需要
    - **_unit?_** - (*string*) - 可选，持续时间的时间单位。如果第一个参数是对象，则不需要<br>

~~~js
calendar.calculateEndDate(new Date(2025, 5, 6), 2, "hour");
calendar.calculateEndDate({ 
    start_date: new Date(2025, 5, 6), 
    duration: 2, 
    unit: "hour" 
});
~~~

- **calculateDuration (config, end): number** - 计算任务的持续时间
    - **_config_** - (*Date | object*) - 任务开始日期或描述时间范围的[配置对象](api/method/calculateduration.md):
        - **_start_date_** - (*Date*) - 任务开始日期
        - **_end_date_** - (*Date*) - 任务结束日期
        - **_task?_** - (*Task*) - 可选，要计算持续时间的任务对象
    - **_end?_**    - (*Date*) - 任务结束日期。如果第一个参数是对象，则不需要<br>

~~~js
calendar.calculateDuration(new Date(2025, 5, 6), new Date(2025, 5, 17));
calendar.calculateDuration({ 
    start_date: new Date(2025, 5, 6), 
    end_date: new Date(2025, 5, 17) 
});
~~~


### Properties

- **id** - (*string | number*) - 任务日历的标识符

### Related API
- [addCalendar](api/method/addcalendar.md)
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#assigningcalendartotask)