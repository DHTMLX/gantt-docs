---
sidebar_label: onAfterTaskDelete
title: onAfterTaskDelete event
description: "在用户删除任务后触发"
---

# onAfterTaskDelete

### Description

@short: 在用户删除任务后触发

@signature: onAfterTaskDelete: (id: string | number, task: Task) => void;

### Parameters

- `id` - (required) *string | number* - 任务ID
- `task` - (required) *Task* - 任务对象

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDelete", function(id,task){
    // 在这里插入您的自定义逻辑
});
~~~

### Related API
- [deleteTask](api/method/deletetask.md)