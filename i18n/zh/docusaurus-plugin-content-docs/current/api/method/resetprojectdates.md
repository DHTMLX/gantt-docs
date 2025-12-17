---
sidebar_label: resetProjectDates
title: resetProjectDates method
description: "根据子任务的日期重新计算项目任务的持续时间"
---

# resetProjectDates
:::info
 此功能仅在PRO版本中可用。
:::
### Description

@short: 根据子任务的日期重新计算项目任务的持续时间

@signature: resetProjectDates: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - 任务对象

### Example

~~~jsx
gantt.resetProjectDates(gantt.getTask(3));
~~~

### Details

此方法根据子任务的日期更新给定任务对象的**start_date**、**end_date**和**duration**属性。

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)

