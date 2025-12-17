---
sidebar_label: onTaskIdChange
title: onTaskIdChange event
description: "当任务的ID被更新时触发"
---

# onTaskIdChange

### Description

@short: 当任务的ID被更新时触发

@signature: onTaskIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 当前任务的ID
- `new_id` - (required) *string | number* - 更新后的任务ID

### Example

~~~jsx
gantt.attachEvent("onTaskIdChange", function(id,new_id){
    //这里可以写任何自定义逻辑
});
~~~

### Related API
- [changeTaskId](api/method/changetaskid.md)

