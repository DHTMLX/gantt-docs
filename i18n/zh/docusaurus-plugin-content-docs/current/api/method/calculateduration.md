---
sidebar_label: calculateDuration
title: calculateDuration 方法
description: "计算任务的持续时间"
---

# calculateDuration

### Description

@short: 计算任务的持续时间

@signature: calculateDuration: (config: object, end_date: Date) =\> number

### Parameters

- `config` - (required) *object | Date* - 要么是时间段的 <a href="#configuration-object-properties">配置对象</a>，要么是任务的开始日期
- `end_date` - (optional) *Date* -  任务的结束日期。当第一个参数指定为 start_date 时，该参数为必填。

### Returns
- ` duration` - (number) - 任务的持续时间，单位由 [duration_unit](api/config/duration_unit.md) 选项指定

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

// or 
gantt.calculateDuration(task);

// or 
gantt.calculateDuration(new Date(2013,02,15), new Date(2013,02,25)); //->6
~~~ 

### Details

:::note
如果启用 [work_time](api/config/work_time.md) 选项，该方法将以工作时间计算任务的持续时间。 
:::

- 当未指定任务时，该方法将使用全局工作时间日历（[global work time calendar](guides/working-time.md#getting-calendars)）。
- 此外，该方法也可以直接用于一个 [日历对象](api/other/calendar.md)。

## 配置对象属性

配置对象可以包含以下属性：

- **start_date** - (*Date*) 任务计划开始的日期
- **end_date** - (*Date*) 任务计划完成的日期
* **task** - (*object*)    可选，需要计算持续时间的任务对象

### Related API
- [calculateEndDate](api/method/calculateenddate.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

### Related Guides
- [工作时间计算](guides/working-time.md)