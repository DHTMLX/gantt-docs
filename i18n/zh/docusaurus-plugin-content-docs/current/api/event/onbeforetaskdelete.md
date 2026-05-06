---
sidebar_label: onBeforeTaskDelete
title: onBeforeTaskDelete 事件
description: "在用户删除任务之前触发"
---

# onBeforeTaskDelete

### Description

@short: 在用户删除任务之前触发

@signature: onBeforeTaskDelete: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (必填) *string | number* - 任务 id
- `task` - (必填) *Task* - 任务对象

### Returns
- `result` - (boolean) - 定义事件的默认行为是否会被触发（<b>true</b>）还是被取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDelete", function(id,task){
    //在此处执行任意自定义逻辑
    return true;
});
~~~

### Details

该事件是可阻塞的。返回 false 以取消删除该任务。

### Related API
- [deleteTask](api/method/deletetask.md)