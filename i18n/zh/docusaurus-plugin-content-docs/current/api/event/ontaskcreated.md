---
sidebar_label: onTaskCreated
title: onTaskCreated 事件
description: "当用户在网格(grid)中按下 '+' 按钮创建新任务，或调用 createTask 方法时触发"
---

# onTaskCreated

### Description

@short: 在网格(grid)中按下 '+' 按钮创建新任务，或调用 [createTask](api/method/createtask.md) 方法时触发

@signature: onTaskCreated: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - 新任务的对象

### Returns
- `result` - (boolean) - 返回 `false` 将取消新任务的创建，返回 `true` 将继续默认处理

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
    task.projectId = 1;
    return true;
});
~~~

### Details

事件在新任务显示之前触发，这使你能够设置默认值或取消创建任务。

在该事件触发时，新任务已经可以通过 [getTask](api/method/gettask.md) 方法在数据存储中获取。

如果事件处理程序返回 `false`，该任务将从数据存储中移除，并且不会触发 [onAfterTaskDelete](api/event/onaftertaskdelete.md) 事件。

使用 [createTask](api/method/createtask.md) 方法创建任务时触发的最终事件顺序为：

1. [onTaskCreated](api/event/ontaskcreated.md)
2. [onBeforeLightbox](api/event/onbeforelightbox.md)
3. [onLightbox](api/event/onlightbox.md)
4. [onAfterLightbox](api/event/onafterlightbox.md)
5. [onAfterTaskAdd](api/event/onaftertaskadd.md)
6. [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related API
- [createTask](api/method/createtask.md)
- [columns](api/config/columns.md)