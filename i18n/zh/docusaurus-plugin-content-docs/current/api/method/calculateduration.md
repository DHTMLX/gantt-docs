---
sidebar_label: calculateDuration
title: calculateDuration method
description: "计算任务的时长"
---

# calculateDuration

### Description

@short: 计算任务的时长

@signature: calculateDuration: (config: Date | object, end?: Date) =\> number

### Parameters

- `config` - (required) *object | Date* -        既可以是描述时间跨度的[配置对象](#configurationobjectproperties)，也可以只是任务的开始日期
- `end_date` - (optional) *Date* - 可选，任务的结束日期。如果第一个参数只是<i>start_date</i>，则需要此参数。

### Returns
- ` duration` - (number) - 任务的时长，单位由[duration_unit](api/config/duration_unit.md)选项设置

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");

// 获取两个日期之间的工作时间时长
// （适用于有多个工作日历的任务）
gantt.calculateDuration({
    start_date: new Date(2013,02,15), 
    end_date: new Date(2013,02,25)
    /*,task: task*/
});

// 或者
gantt.calculateDuration(task);

// 或者
gantt.calculateDuration(new Date(2013,02,15), new Date(2013,02,25)); //->6
~~~

### Details

:::note

当启用 [work_time](api/config/work_time.md) 选项时，该方法基于工作时间计算任务的持续时间。
 
:::

- 如果未提供任务，则默认使用[全局工作时间日历](guides/working-time.md#multipleworktimecalendars)。<br>
- 此方法也可以直接用于[calendar 对象](api/other/calendar.md)。

## 配置对象属性

配置对象可能包含以下属性:

- **start_date** - (*Date*) 任务计划开始时间
- **end_date** - (*Date*) 任务计划结束时间
* **task** - (*object*)    可选，计算时长的任务对象

### Related API
- [calculateEndDate](api/method/calculateenddate.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

### Related Guides
- - [工作时间计算](guides/working-time.md)

