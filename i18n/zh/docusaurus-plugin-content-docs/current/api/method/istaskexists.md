---
sidebar_label: isTaskExists
title: isTaskExists method
description: "验证是否存在具有指定 ID 的任务"
---

# isTaskExists

### Description

@short: 验证是否存在具有指定 ID 的任务

@signature: isTaskExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* -    任务 ID

### Returns
- ` task` - (boolean) - <i>true</i> 如果找到任务，否则为 <i>false</i>

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
