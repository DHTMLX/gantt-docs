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
        - **_day?_** - (*string | number*) - 可选，周几编号 [0（星期日）- 6（星期六）]。注意一次只能设置一天
        - **_date?_** - (*Date*) - 可选，指定某个日期作为工作日或非工作日
        - **_hours?_** - (*string[] | number[] | boolean*) - 可选，表示工作时间的"开始-结束"对数组。设置为 'false' 表示休息日，'true'（默认）应用默认时间（["8:00-17:00"]）
        - **_customWeeks?_** - (*object*) - 可选，定义不同时间段工作时间规则的对象。包含键值对，键为时间段名称，值为带属性的对象:
            - **_[timespan: string]_** - (*object*) - 带有工作时间设置的时间段，键名作为时间段名称
                - **_from_** - (*Date*) - 时间段开始日期
                - **_to_** - (*Date*) - 时间段结束日期
                - **_hours?_** - (*string[] | number[]*) - 可选，表示工作时间的"开始-结束"对数组。'false' 表示休息日，'true'（默认）应用默认时间（["8:00-17:00"]）
                - **_days?_** - (*WorkDaysTuple | boolean*) - 可选，长度为7的数组，表示一周的每天（0 - 星期日，6 - 星期六），1/true 表示工作日，0/false 表示非工作日。

~~~js
calendar.setWorkTime({ hours:["9:00-18:00"] });
~~~

- **unsetWorkTime (config): void** - 从甘特图中移除工作时间设置
    - **_config_** - (*object*) - 描述时间范围的[配置对象](api/method/unsetworktime.md):
        - **_day?_** - (*string | number*) - 可选，周几编号 [0（星期日）- 6（星期六）]。一次只能设置一天
        - **_date?_** - (*Date*) - 可选，指定某个日期作为工作日或非工作日
        - **_hours?_** - (*string[] | number[] | boolean*) - 可选，表示工作时间的"开始-结束"对数组。'false' 表示休息日，'true'（默认）应用默认时间（["8:00-17:00"]）

~~~js
calendar.unsetWorkTime({ hours:["9:00-18:00"] });
~~~

- **isWorkTime (config, time_unit): boolean** - 判断指定日期是否为工作时间
    - **_config_** - (*Date | object*) - 要检查的日期或描述时间范围的[配置对象](api/method/isworktime.md):
        - **_date_** - (*Date*) - 要检查的日期
        - **_unit?_** - (*string*) - 可选，时间单位:"minute", "hour", "day", "week", "month", "year"
        - **_task?_** - (*Task*) - 可选，需考虑其持续时间的任务对象
    - **_time_unit?_** - (*string*) - 可选，时间单位:"minute", "hour", "day", "week", "month", "year"。如果第一个参数是对象，则不必提供<br><br>

~~~js
var calendar = gantt.getTaskCalendar(task);
if (calendar.isWorkTime({date: date})){
    alert("worktime of task" + task.text);
}
~~~

- **getClosestWorkTime (config): Date** - 查找最近的工作时间
    - **_config_** - (*Date | object*) - [配置对象](api/method/getclosestworktime.md):
        - **_date_** - (*Date*) - 要查找最近工作时间的日期
        - **_dir?_** - (*string*) - 可选，搜索方向:"future" 或 "past"
        - **_unit?_** - (*string*) - 可选，搜索使用的时间单位
        - **_task?_** - (*Task*) - 可选，使用其 calendar 的任务对象

~~~js
calendar.getClosestWorkTime({
    date:new Date(2013,0,1), 
    dir:"future", 
    unit:"hour"
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
var end_date = calendar.calculateEndDate({start_date:date, duration:duration});
~~~

- **calculateDuration (config, end): number** - 计算任务的持续时间
    - **_config_** - (*Date | object*) - 任务开始日期或描述时间范围的[配置对象](api/method/calculateduration.md):
        - **_start_date_** - (*Date*) - 任务开始日期
        - **_end_date_** - (*Date*) - 任务结束日期
        - **_task?_** - (*Task*) - 可选，要计算持续时间的任务对象
    - **_end?_**    - (*Date*) - 任务结束日期。如果第一个参数是对象，则不需要<br>

~~~js
calendar.calculateDuration(new Date(2013,02,15), new Date(2013,02,25));
~~~

## 属性

- **id** - (*string | number*) - 任务日历的标识符

### Related API
- [addCalendar](api/method/addcalendar.md)
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

