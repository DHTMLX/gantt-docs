---
sidebar_label: isTaskExists
title: isTaskExists method
description: "주어진 ID를 가진 태스크가 존재하는지 확인합니다."
---

# isTaskExists

### Description

@short: 주어진 ID를 가진 태스크가 존재하는지 확인합니다.

@signature: isTaskExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* -    태스크 ID

### Returns
- ` task` - (boolean) - <i>true</i> 태스크가 존재할 경우, 그렇지 않으면 <i>false</i>

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
