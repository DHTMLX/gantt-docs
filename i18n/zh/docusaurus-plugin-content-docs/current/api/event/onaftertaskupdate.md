---
sidebar_label: onAfterTaskUpdate
title: onAfterTaskUpdate event
description: "在用户更新任务后立即触发"
---

# onAfterTaskUpdate

### Description

@short: 在用户更新任务后立即触发

@signature: onAfterTaskUpdate: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务ID
- `task` - (required) *Task* - 任务对象

### Example

~~~jsx
gantt.attachEvent("onAfterTaskUpdate", function(id,task){
    //在这里编写自定义逻辑
});
~~~

### Related API
- [updateTask](api/method/updatetask.md)
- [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md)

