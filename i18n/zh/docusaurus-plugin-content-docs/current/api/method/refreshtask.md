---
sidebar_label: refreshTask
title: refreshTask 方法
description: "刷新任务及其相关链接"
---

# refreshTask

### Description

@short: 刷新任务及其相关链接

@signature: refreshTask: (id: string | number, refresh_links?: boolean) =\> void

### Parameters

- `id` - (必填) *string | number* - 任务 ID

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

var task = gantt.getTask(10);

task.text = "Task #10"; /*!*/
gantt.refreshTask(10);       /*!*/
~~~

### Details

您可以在修改任务属性后使用此方法重新绘制任务。与 [updateTask](api/method/updatetask.md) 不同，此方法不会触发 [DataProcessor](guides/server-side.md)，也不会向服务器发送任何更新。

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)

### Related Guides
- [Basic Operations with Tasks](guides/crud-task.md)