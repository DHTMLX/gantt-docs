---
sidebar_label: refreshTask
title: refreshTask method
description: "refreshes the task and its related links"
---

# refreshTask

### Description

@short: Refreshes the task and its related links

@signature: refreshTask: (id: string | number, refresh_links?: boolean) =\> void

### Parameters

- `id` - (required) *string | number* -            the task id

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

You can use this method to repaint a task after changing its properties. Unlike [updateTask](api/method/updatetask.md), this method does not trigger the [DataProcessor](guides/server-side.md), and no updates will be sent to the server.

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)

### Related Guides
- [Basic Operations with Tasks](guides/crud-task.md)

