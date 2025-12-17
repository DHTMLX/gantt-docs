---
sidebar_label: getSubtaskDates
title: getSubtaskDates method
description: "计算嵌套在项目或其他任务中的子任务的合并开始/结束日期"
---

# getSubtaskDates

### Description

@short: 计算嵌套在项目或其他任务中的子任务的合并开始/结束日期

@signature: getSubtaskDates: (task_id?: string | number) =\> any

### Parameters

- `task_id` - (optional) *string | number* -        任务的ID，如果未指定，则使用 [root_id](api/config/root_id.md) 中的默认值

### Returns
- ` dates` - (object) - 一个包含 <b>start_date</b> 和 <b>end_date</b> 属性的对象

### Example

~~~jsx
// 整个项目的持续时间
let dates = gantt.getSubtaskDates();
const dateToStr = gantt.templates.task_date;
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);

// 子项目的持续时间
dates = gantt.getSubtaskDates(1);
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);
~~~

### Details

此方法返回一个对象，显示最早子任务的开始日期和最晚子任务的结束日期。

返回的对象格式如下:

~~~js
{
  start_date: Date|null,
  end_date: Date|null
}
~~~

当甘特图中包含已计划的任务时，这两个属性都会包含日期值。如果甘特图为空或只包含未计划的任务，则这两个属性均为 `null`。

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getTaskBy](api/method/gettaskby.md)

