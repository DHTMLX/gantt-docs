---
sidebar_label: calculateEndDate
title: calculateEndDate 方法
description: "计算任务的结束日期"
---

# calculateEndDate

### Description

@short: 计算任务的结束日期

@signature: calculateEndDate: (config: object, duration: number) =\> Date

### Parameters

- `config` - (required) *object | Date* - 作为一个时间跨度的配置对象(<a href="#configuration-object-properties">configuration object</a>), 或任务的开始日期
- `duration` - (optional) *number* - 任务的持续时间。当第一个参数被指定为 start_date 时，该参数为必填

### Returns
- ` end_date` - (Date) - 任务计划完成的日期

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");
 
// 使用全局工作时间设置计算结束日期
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48});
// 或者
gantt.calculateEndDate(new Date(2013,02,15), 48);

// 为特定任务日历计算结束日期
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48, task:task});
// 或者，简短形式：
// 将使用当前分配给任务的日历、task.start_date 和 task.duration
gantt.calculateEndDate(task);
~~~

### Details

:::note
如果启用了 [work_time](api/config/work_time.md) 选项，该方法会将持续时间视为工作时间。 
:::  

- 如果未提供任务对象，方法默认使用[全局工作时间日历](guides/working-time.md#multipleworktimecalendars)。
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

配置对象可以包含以下属性：

- **start_date** - (*Date*) 任务开始日期
- **duration** - (*number*) 任务的持续时间
* **unit** - (*string*) 可选，持续时间的时间单位："minute", "hour", "day", "week", "month", "year"
* **task** - (*object*) 可选，要计算持续时间的任务对象

### Related API
- [calculateDuration](api/method/calculateduration.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)