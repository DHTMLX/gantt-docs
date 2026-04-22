---
sidebar_label: getSubtaskDates
title: getSubtaskDates 方法
description: "计算嵌套在项目或其他任务中的任务的起始日期和结束日期的组合值"
---

# getSubtaskDates

### Description

@short: 计算嵌套在项目或其他任务中的任务的起始日期和结束日期的组合值

@signature: getSubtaskDates: (task_id?: string | number) =\> any

### Parameters

- `task_id` -	(optional) *string | number* - 任务的 ID；如未指定，将使用 [root_id](api/config/root_id.md)

### Returns
- ` dates` - (object) - 一个对象，包含 <b>start_date</b> 和 <b>end_date</b> 属性

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

该方法返回一个对象，包含最早子任务的起始日期和最近子任务的结束日期。

返回对象的格式如下：

~~~js
{
  start_date: Date|null,
  end_date: Date|null
}
~~~

如果甘特图有任何已安排的任务，则这两个属性将具有日期值。如果甘特图为空或仅包含未安排的任务，则这两个属性的值为 `null`。

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getTaskBy](api/method/gettaskby.md)