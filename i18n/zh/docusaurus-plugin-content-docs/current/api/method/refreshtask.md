---
sidebar_label: refreshTask
title: refreshTask method
description: "更新任务及其相关的链接"
---

# refreshTask

### Description

@short: 更新任务及其相关的链接

@signature: refreshTask: (id: string | number, refresh_links?: boolean) =\> void

### Parameters

- `id` - (required) *string | number* -           任务的 ID
- `refresh_links` - (optional) *boolean* - 可选，决定是否更新任务的相关链接，默认值为 <em>true</em>

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

此方法用于在修改任务属性后重新绘制该任务。与 [updateTask](api/method/updatetask.md) 不同的是，它不会触发 [DataProcessor](guides/server-side.md)，因此不会向服务器发送任何更新。

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)

### Related Guides
- [任务的基本操作](guides/crud-task.md)

