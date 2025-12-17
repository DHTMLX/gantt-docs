---
sidebar_label: isTaskExists
title: isTaskExists method
description: "проверяет, существует ли задача с указанным ID"
---

# isTaskExists

### Description

@short: Проверяет, существует ли задача с указанным ID

@signature: isTaskExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* -    ID задачи

### Returns
- ` task` - (boolean) - <i>true</i>, если задача найдена, иначе <i>false</i>

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
