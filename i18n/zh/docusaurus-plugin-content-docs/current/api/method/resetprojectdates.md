---
sidebar_label: resetProjectDates
title: resetProjectDates 方法
description: "重新根据子任务的日期重新计算项目任务的持续时间"
---

# resetProjectDates

:::info
此功能仅在 PRO 版中提供。
:::

### Description

@short: 根据子任务的日期重新计算项目任务的持续时间

@signature: resetProjectDates: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - 该任务的对象

### Example

~~~jsx
gantt.resetProjectDates(gantt.getTask(3));
~~~

### Details

该方法修改提供对象的 **start_date**、**end_date** 和 **duration** 属性。

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)