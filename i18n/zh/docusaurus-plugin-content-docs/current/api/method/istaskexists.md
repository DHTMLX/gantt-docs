---
sidebar_label: isTaskExists
title: isTaskExists 方法
description: "检查是否存在指定的任务"
---

# isTaskExists

### Description

@short: 检查指定任务是否存在

@signature: isTaskExists: (id: string | number) =\> boolean

### Parameters

- `id` - （必填） *string | number* - 任务 ID

### Returns
- ` task` - (boolean) - <i>true</i>，如果存在此类任务。否则，<i>false</i>

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.isTaskExists(10); // ->true
~~~