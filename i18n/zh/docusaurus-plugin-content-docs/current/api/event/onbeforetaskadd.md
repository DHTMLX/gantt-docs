---
sidebar_label: onBeforeTaskAdd
title: onBeforeTaskAdd event
description: "在向甘特图添加新任务之前触发"
---

# onBeforeTaskAdd

### Description

@short: 在向甘特图添加新任务之前触发

@signature: onBeforeTaskAdd: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 任务 ID
- `task` - (required) *Task* - 任务对象

### Returns
- ` result` - (boolean) - 定义事件的默认操作是将被触发（<b>true</b>）还是取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

该事件是可阻塞的。返回 *false* 以取消添加该任务。

### Related API
- [addTask](api/method/addtask.md)