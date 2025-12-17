---
sidebar_label: onBeforeTaskDelete
title: onBeforeTaskDelete event
description: "在用户删除任务之前触发"
---

# onBeforeTaskDelete

### Description

@short: 在用户删除任务之前触发

@signature: onBeforeTaskDelete: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 任务ID
- `task` - (required) *Task* - 任务对象

### Returns
- ` result` - (boolean) - 决定默认事件动作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDelete", function(id,task){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

此事件可以被阻止。返回false将防止任务被删除。

### Related API
- [deleteTask](api/method/deletetask.md)

