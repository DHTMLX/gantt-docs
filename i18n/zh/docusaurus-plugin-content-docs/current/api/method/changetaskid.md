---
sidebar_label: changeTaskId
title: changeTaskId 方法
description: "更改任务的 ID"
---

# changeTaskId

### Description

@short: 更改任务的 ID

@signature: changeTaskId: (id: string | number, new_id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    当前任务的 ID
- `new_id` - (required) *string | number* -    新任务的 ID

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.changeTaskId(10, 15); //将任务的 id 从 '10' 更新为 '15' /*!*/
~~~

### Details

该方法会触发 [onTaskIdChange](api/event/ontaskidchange.md) 事件。

### Related API
- [onTaskIdChange](api/event/ontaskidchange.md)
- [changeLinkId](api/method/changelinkid.md)