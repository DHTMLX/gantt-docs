---
sidebar_label: onTaskCreated
title: onTaskCreated event
description: "当用户通过点击 grid 中的 '+' 按钮添加新任务，或调用 createTask 方法时触发"
---

# onTaskCreated

### Description

@short: 当用户通过点击 grid 中的 '+' 按钮添加新任务，或调用 [createTask](api/method/createtask.md) 方法时触发

@signature: onTaskCreated: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - 新任务对象

### Returns
- ` result` - (boolean) - 返回 `false` 将阻止新任务的创建，返回 `true` 则允许默认流程继续执行

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
    task.projectId = 1;
    return true;
});
~~~

### Details

此事件在新任务显示之前触发，允许您**设置默认值**或**取消任务创建**。

此时，新任务已存在于数据存储中，可以通过 [getTask](api/method/gettask.md) 方法访问。

如果事件处理函数返回 `false`，任务将从数据存储中移除，且不会触发 [onAfterTaskDelete](api/event/onaftertaskdelete.md) 事件。

当通过 [createTask](api/method/createtask.md) 方法创建任务时，事件触发顺序如下:

1. [onTaskCreated](api/event/ontaskcreated.md)
2. [onBeforeLightbox](api/event/onbeforelightbox.md)
3. [onLightbox](api/event/onlightbox.md)
4. [onAfterLightbox](api/event/onafterlightbox.md)
5. [onAfterTaskAdd](api/event/onaftertaskadd.md)
6. [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related API
- [createTask](api/method/createtask.md)
- [columns](api/config/columns.md)

