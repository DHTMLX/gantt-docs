---
sidebar_label: onAfterTaskAdd
title: onAfterTaskAdd event
description: "在任务添加到甘特图后立即触发"
---

# onAfterTaskAdd

### Description

@short: 在任务添加到甘特图后立即触发

@signature: onAfterTaskAdd: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务的ID
- `task` - (required) *Task* - 任务对象

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAdd", function(id,task){
    // 在这里编写自定义逻辑
});
~~~

### Related API
- [addTask](api/method/addtask.md)

