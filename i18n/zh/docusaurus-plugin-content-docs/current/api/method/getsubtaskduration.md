---
sidebar_label: getSubtaskDuration
title: getSubtaskDuration 方法
description: "计算嵌套在项目或其他任务中的任务的总持续时间。"
---

# getSubtaskDuration

### Description

@short: 计算嵌套在项目或其他任务中的任务的总持续时间。

@signature: getSubtaskDuration: (task_id?: string | number) =\> number

### Parameters

- `task_id` - (optional) *string | number* - 任务的 id，若未指定，将使用 [root_id](api/config/root_id.md)

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

计算嵌套在项目或其他任务中的任务的总持续时间。

属于 [项目类型](api/config/types.md) 的任务不会计入总持续时间。

返回值基于配置中的 [持续单位](api/config/duration_unit.md) 单位进行计算。

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)
- [getTaskBy](api/method/gettaskby.md)

### Related Guides
- [格式化器扩展](guides/formatters-ext.md#durationformatter)