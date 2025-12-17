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

- `id` - (required) *string | number* - 任务的ID
- `task` - (required) *Task* - 任务对象

### Returns
- ` result` - (boolean) - 决定事件的默认操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    //这里可以添加自定义逻辑
    return true;
});
~~~

### Details

此事件可以被阻止。返回 *false* 将阻止任务被添加。

### Related API
- [addTask](api/method/addtask.md)

