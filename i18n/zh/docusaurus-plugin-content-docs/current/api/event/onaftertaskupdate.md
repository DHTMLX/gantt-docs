---
sidebar_label: onAfterTaskUpdate
title: onAfterTaskUpdate 事件
description: "在用户更新任务后触发"
---

# onAfterTaskUpdate

### Description

@short: 在用户更新任务后触发

@signature: onAfterTaskUpdate: (id: string | number, task: Task) => void;

### Parameters

- `id` - (required) *string | number* - 任务 ID
- `task` - (required) *Task* - 任务对象

### Example

~~~jsx
gantt.attachEvent("onAfterTaskUpdate", function(id,task){
    // 在这里插入您的自定义逻辑
});
~~~

### Related API
- [updateTask](api/method/updatetask.md)
- [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md)