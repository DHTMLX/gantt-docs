---
sidebar_label: isTaskExists
title: isTaskExists 메서드
description: "지정된 작업이 존재하는지 확인합니다"
---

# isTaskExists

### Description

@short: 지정된 작업이 존재하는지 확인합니다

@signature: isTaskExists: (id: string | number) =\> boolean

### Parameters

- `id` - (필수) *string | number* -    작업 아이디

### Returns
- ` task` - (boolean) - <i>true</i>, 해당 작업이 존재하면. 그렇지 않으면, <i>false</i>

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