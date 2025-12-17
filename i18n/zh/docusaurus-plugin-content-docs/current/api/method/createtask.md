---
sidebar_label: createTask
title: createTask method
description: "添加一个新任务并打开lightbox以确认"
---

# createTask

### Description

@short: 添加一个新任务并打开lightbox以确认

@signature: createTask: (task?: NewTask, parent?: string | number, index?: number) =\> string | number

### Parameters

- `task` - (optional) *NewTask* - 可选，任务对象
- `parent` - (optional) *string | number* -            可选，父任务的ID
- `index` - (optional) *number* - 可选，任务将被添加到的位置（0或更大）

### Returns
- ` id` - (string, number) - 任务的ID

### Example

~~~jsx
var taskId = gantt.createTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2", 2);
~~~

### Details

当你提供 *index* 参数且其值为0或更高时，任务将被插入到该分支的指定位置。
如果未指定 *index*，任务将被添加到该分支的末尾。

该方法会触发 [onTaskCreated](api/event/ontaskcreated.md) 事件。请注意，该事件发生在新任务实际添加到数据集之前，
这意味着你可以完全取消保存任务--例如，当用户在lightbox中点击"取消"按钮时。

使用 createTask() 创建任务时，事件的执行顺序如下:

1. [onTaskCreated](api/event/ontaskcreated.md)
2. [onBeforeLightbox](api/event/onbeforelightbox.md)
3. [onLightbox](api/event/onlightbox.md)
4. [onAfterLightbox](api/event/onafterlightbox.md)
5. [onAfterTaskAdd](api/event/onaftertaskadd.md)
6. [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related API
- [onTaskCreated](api/event/ontaskcreated.md)
- [addTask](api/method/addtask.md)

### Related Guides
- [任务的基本操作](guides/crud-task.md)

