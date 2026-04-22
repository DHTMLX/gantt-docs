---
sidebar_label: updateTask
title: updateTask method
description: "更新指定的任务"
---

# updateTask

### Description

@short: 更新指定的任务

@signature: updateTask: (id: string | number, newState?: Task) =\> void

### Parameters

- `id` - (required) *string | number* - 任务的 ID
- `newState` - (optional) *Task* - 任务的新值

### Example

~~~jsx
const taskId = gantt.addTask({
    id: 10,
    text: "Task #10",
    start_date: "2027-04-02",
    duration: 8,
    parent: 1
});

gantt.getTask(taskId).text = "Task #13"; // 更改任务数据
gantt.updateTask(taskId); // 渲染更新后的任务
~~~

### Details

:::note
该方法会触发 [`onAfterTaskUpdate`](api/event/onaftertaskupdate.md) 事件。
:::

:::note
如果启用了 DataProcessor，该方法将触发 [DataProcessor](api/method/dataprocessor.md)。
:::

在修改任务对象后应调用此方法，以更新甘特图的状态、重新绘制相关 UI 元素，并将更改发送到后端。

调用此方法将触发 [`onAfterTaskUpdate`](api/event/onaftertaskupdate.md) 事件，可能会触发额外的重新计算。

如果您使用 [DataProcessor](api/method/dataprocessor.md)，调用此方法将向服务器发送一个 **更新** 请求。

如需进行不需要保存的可视变更，请改用 [`refreshTask()`](api/method/refreshtask.md) 方法。这样将重新绘制该任务，而不触发额外的计算。

~~~js {5}
gantt.templates.task_class = (startDate, endDate, task) => task.$active ? "active_task" : "";

gantt.attachEvent("onTaskClick", (taskId, event) => {
    gantt.getTask(taskId).$active = true;
    gantt.refreshTask(taskId);
});
~~~

你也可以通过将新的任务对象作为 updateTask() 方法的第二个参数来替换现有任务：

~~~js
const updatedTask = {
    id: 2,
    text: 'New task text',
    start_date: new Date(2025, 3, 2),
    end_date: new Date(2025, 3, 4),
    $source: [1],
    $target: [2]
};

gantt.updateTask(2, updatedTask);
~~~

:::note
Sample: [Updating task](https://snippet.dhtmlx.com/fnfpoiik)
 :::

### Related API
- [updateLink](api/method/updatelink.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [Server-Side Integration](guides/server-side.md)