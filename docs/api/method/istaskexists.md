---
sidebar_label: isTaskExists
title: isTaskExists method
description: "checks whether the specified task exists"
---

# isTaskExists

### Description

@short: Checks whether the specified task exists

@signature: isTaskExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* -    the task id

### Returns
- ` task` - (boolean) - <i>true</i>, if such a task exists. Otherwise, <i>false</i>

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
