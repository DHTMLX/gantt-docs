---
sidebar_label: onAfterTaskDelete
title: onAfterTaskDelete event
description: "在用户删除任务后立即触发"
---

# onAfterTaskDelete

### Description

@short: 在用户删除任务后立即触发

@signature: onAfterTaskDelete: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务的ID
- `task` - (required) *Task* - 任务对象

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDelete", function(id,task){
    // 可以在这里添加自定义逻辑
});
~~~

### Related API
- [deleteTask](api/method/deletetask.md)

