---
sidebar_label: updateTask
title: updateTask метод
description: "обновляет указанную задачу"
---

# updateTask

### Description

@short: Обновляет указанную задачу

@signature: updateTask: (id: string | number, newState?: Task) => void

### Parameters

- `id` - (обязательный) *string | number* - идентификатор задачи
- `newState` - (необязательный) *Task* - новые значения задачи

### Example

~~~jsx
const taskId = gantt.addTask({
    id: 10,
    text: "Task #10",
    start_date: "2027-04-02",
    duration: 8,
    parent: 1
});

gantt.getTask(taskId).text = "Task #13"; // changes task data
gantt.updateTask(taskId); // renders the updated task
~~~

### Details

:::note
The method invokes the [`onAfterTaskUpdate`](api/event/onaftertaskupdate.md) event.
:::

:::note
The method triggers the [DataProcessor](api/method/dataprocessor.md) if the dataProcessor is enabled.
:::

This method should be called after modifying the task object to update the Gantt's state, repaint related UI elements, and send the changes to the backend.

Calling this method will fire the [`onAfterTaskUpdate`](api/event/onaftertaskupdate.md) event, which may trigger additional recalculations.

If you're using the [DataProcessor](api/method/dataprocessor.md), invoking this method will prompt an **update** request to the server.

For making visual changes that don't require saving, **use the [`refreshTask()`](api/method/refreshtask.md) method instead**. This will repaint the task without invoking extra calculations.

~~~js {5}
gantt.templates.task_class = (startDate, endDate, task) => task.$active ? "active_task" : "";

gantt.attachEvent("onTaskClick", (taskId, event) => {
    gantt.getTask(taskId).$active = true;
    gantt.refreshTask(taskId);
});
~~~

You can also replace the existing task with new values by setting a new task object as the second parameter of the `updateTask()` method:

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
Sample: [Обновление задачи](https://snippet.dhtmlx.com/fnfpoiik)
:::

### Related API
- [updateLink](api/method/updatelink.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [Server-Side Integration](guides/server-side.md)