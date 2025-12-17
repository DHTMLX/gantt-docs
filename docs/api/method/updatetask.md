---
sidebar_label: updateTask
title: updateTask method
description: "updates the specified task"
---

# updateTask

### Description

@short: Updates the specified task

@signature: updateTask: (id: string | number, newState?: Task) =\> void

### Parameters

- `id` - (required) *string | number* - the task id
- `newState` - (optional) *Task* - the new values of the task

### Example

~~~jsx
var taskId = gantt.addTask({
    id:10,
    text:"Task #10",
    start_date:"02-04-2013",
    duration:8,
    parent:1
});

gantt.getTask(taskId).text = "Task #13"; //changes task's data
gantt.updateTask(taskId); //renders the updated task
~~~

### Details

:::note
The method invokes the [onAfterTaskUpdate](api/event/onaftertaskupdate.md) event. 
:::

:::note
The method triggers the [DataProcessor](guides/server-side.md) if the dataProcessor is enabled. 
:::

This method should be called after modifying the task object to update the Gantt's state, repaint related UI elements, and send the changes to the backend.

Calling this method will fire the [onAfterTaskUpdate](api/event/onaftertaskupdate.md) event, which may trigger additional recalculations.

If you're using the [DataProcessor](guides/server-side.md), invoking this method will prompt an **update** request to the server.

For making visual changes that don't require saving, **use the [refreshTask](api/method/refreshtask.md) method instead**. This will repaint the task without invoking extra calculations.

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.$active) {
        return "active_task";
    }
};

gantt.attachEvent("onTaskClick", function(id,e){
    gantt.getTask(id).$active = true;
    gantt.refreshTask(id); /*!*/
});
~~~


You can also replace the existing task with new values via setting a new task object as the second parameter of the **updateTask** method: 

~~~js
var task = {
    id: 2, text: 'New task text', 
    start_date: new Date(2025,03,02), 
    end_date: new Date(2025,03,04), 
    $source: [1], 
    $target: [2]
}
gantt.updateTask(2,task);
~~~

:::note
sample: [Updating task ](https://snippet.dhtmlx.com/fnfpoiik)
:::

### Related API
- [updateLink](api/method/updatelink.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [Server-Side Integration](guides/server-side.md)

