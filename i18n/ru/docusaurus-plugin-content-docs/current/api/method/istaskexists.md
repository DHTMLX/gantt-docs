---
sidebar_label: isTaskExists
title: isTaskExists method
description: "проверяет, существует ли указанная задача"
---

# isTaskExists

### Description

@short: Проверяет, существует ли указанная задача

@signature: isTaskExists: (id: string | number) =\> boolean

### Parameters

- `id` - (обязателен) *string | number* - идентификатор задачи

### Returns
- ` task` - (булевый) - <i>true</i>, если такая задача существует. В противном случае, <i>false</i>

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