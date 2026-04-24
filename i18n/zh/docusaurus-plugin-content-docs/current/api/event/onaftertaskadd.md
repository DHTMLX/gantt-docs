---
sidebar_label: onAfterTaskAdd
title: onAfterTaskAdd event
description: "在用户向甘特图中添加任务后触发"
---

# onAfterTaskAdd

### Description

@short: 在用户向甘特图中添加任务后触发

@signature: onAfterTaskAdd: (id: string | number, task: Task) => void;

### Parameters

- `id` - (required) *string | number* - 任务 ID
- `task` - (required) *Task* - 任务对象

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAdd", function(id,task){
    // 在这里插入您的自定义逻辑
});
~~~

### Related API
- [addTask](api/method/addtask.md)