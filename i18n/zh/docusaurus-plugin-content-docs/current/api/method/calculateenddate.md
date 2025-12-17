---
sidebar_label: calculateEndDate
title: calculateEndDate method
description: "计算任务的结束日期"
---

# calculateEndDate

### Description

@short: 计算任务的结束日期

@signature: calculateEndDate: (config: Date | object, duration?: number) =\> Date,

### Parameters

- `config` - (required) *object | Date* -        可以是描述时间跨度的[配置对象](#configurationobjectproperties)，也可以仅仅是任务的开始日期
- `duration` - (optional) *number* - 可选，任务的持续时间。当第一个参数只是一个<i>start_date</i>时需要提供此参数

### Returns
- ` end_date` - (Date) - 任务预计完成的日期

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");
 
// 根据全局工作时间设置计算结束日期
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48});
// 或者
gantt.calculateEndDate(new Date(2013,02,15), 48);

// 获取特定任务日历的结束日期
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48, task:task});
// 或者，快捷方式：
// 这会使用分配给任务的日历，以及任务自身的start_date和duration
gantt.calculateEndDate(task);
~~~

### Details

:::note

当启用 [work_time](api/config/work_time.md) 选项时，该方法将duration视为工作时间。 
 
:::

- 如果未提供任务对象，方法默认使用[全局工作时间日历](guides/working-time.md#multipleworktimecalendars)。<br>
- 该方法也可以直接应用于[日历对象](api/other/calendar.md)。


你也可以通过以下方式使用 **calculateEndDate** 计算开始日期:

~~~js
// 计算开始日期：
task.start_date = gantt.calculateEndDate({
    start_date: task.end_date,
    duration: -task.duration
});
~~~

## 配置对象属性

配置对象可以包含以下属性:

- **start_date** - (*Date*) 任务计划开始的日期
- **duration** - (*number*) 任务的持续时间
* **unit** - (*string*) 可选，duration的时间单位:"minute", "hour", "day", "week", "month", "year"
* **task** - (*object*) 可选，需要计算持续时间的任务对象

### Related API
- [calculateDuration](api/method/calculateduration.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

