---
sidebar_label: deleteTask
title: deleteTask method
description: "删除指定的任务"
---

# deleteTask

### Description

@short: 删除指定的任务

@signature: deleteTask: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    要删除的任务的ID

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2013",
    duration:28
});

gantt.deleteTask(10); /*!*/
~~~

### Details

此方法会触发 [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) 和 [onAfterTaskDelete](api/event/onaftertaskdelete.md) 事件。

### Related API
- [addTask](api/method/addtask.md)
- [deleteLink](api/method/deletelink.md)

### Related Guides
- [任务的基本操作](guides/crud-task.md)

