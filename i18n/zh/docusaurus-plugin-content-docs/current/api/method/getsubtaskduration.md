---
sidebar_label: getSubtaskDuration
title: getSubtaskDuration method
description: "计算嵌套在项目或其他任务中的所有子任务的总持续时间。"
---

# getSubtaskDuration

### Description

@short: 计算嵌套在项目或其他任务中的所有子任务的总持续时间。

@signature: getSubtaskDuration: (task_id?: string | number) =\> number

### Parameters

- `task_id` - (optional) *string | number* -       任务的ID；如果省略，则默认使用 [root_id](api/config/root_id.md) 中的值

### Returns
- ` duration` - (number) - 嵌套任务的总持续时间

### Example

~~~jsx
const formatter = gantt.ext.formatters.durationFormatter();
//整个项目的持续时间
let duration = gantt.getSubtaskDuration();
    
console.log(formatter.format(duration));

//子项目的持续时间
duration = gantt.getSubtaskDates(1);
    
console.log(formatter.format(duration));
~~~

### Details

此方法计算嵌套在项目或其他任务内部的所有任务的总持续时间。

请注意，属于[项目类型](api/config/types.md)的任务不计入此总持续时间。

返回的值以配置中定义的[持续时间单位](api/config/duration_unit.md)表示。

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)
- [getTaskBy](api/method/gettaskby.md)

### Related Guides
- [格式化器扩展](guides/formatters-ext.md)

