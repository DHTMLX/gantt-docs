---
sidebar_label: onTaskIdChange
title: onTaskIdChange 事件
description: "当任务的 id 被修改时触发"
---

# onTaskIdChange

### Description

@short: 当任务的 id 被修改时触发

@signature: onTaskIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 当前任务的 id
- `new_id` - (required) *string | number* - 新的任务的 id

### Example

~~~jsx
gantt.attachEvent("onTaskIdChange", function(id,new_id){
    // 在这里插入您的自定义逻辑 
});
~~~

### Related API
- [changeTaskId](api/method/changetaskid.md)