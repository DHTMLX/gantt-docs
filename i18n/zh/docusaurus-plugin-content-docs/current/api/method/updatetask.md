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

- `id` - (required) *string | number* - 任务ID
- `newState` - (optional) *Task* - 可选，任务的新值

### Example

~~~jsx
var taskId = gantt.addTask({
    id:10,
    text:"Task #10",
    start_date:"02-04-2013",
    duration:8,
    parent:1
});

gantt.getTask(taskId).text = "Task #13"; // 修改任务数据
gantt.updateTask(taskId); // 应用更改并刷新任务
~~~

### Details

:::note
 该方法会触发 [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 事件。 
:::

:::note
 如果启用了 dataProcessor，该方法也会激活它。 
:::

该方法应在修改任务对象后调用。它会更新甘特图的内部状态，刷新相关的 UI 部分，并将更新的信息发送到后端。

调用时，会触发 [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 事件，从而可以启动进一步的重新计算。

如果您正在使用 [DataProcessor](guides/server-side.md)，调用此方法将向服务器发送**更新**请求。

对于只需视觉更新而无需保存的情况，**请使用 [refreshTask](api/method/refreshtask.md) 方法**。该方法会刷新任务的显示，但不会触发额外的计算。

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


另外，您也可以通过向 **updateTask** 方法传递新的任务对象作为第二个参数来更新任务:

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
Sample: [Updating task](https://snippet.dhtmlx.com/fnfpoiik)
:::

### Related API
- [updateLink](api/method/updatelink.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [服务器端集成](guides/server-side.md#updatingdataontheserver)

