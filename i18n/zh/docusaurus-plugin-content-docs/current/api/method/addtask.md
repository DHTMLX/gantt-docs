---
sidebar_label: addTask
title: addTask method
description: "添加一个新任务"
---

# addTask

### Description

@short: 添加一个新任务

@signature: addTask: (task: NewTask, parent?: string | number, index?: number) =\> string | number

### Parameters

- `task` - (required) *NewTask* - 任务对象
- `parent` - (required) *string | number* -            可选，父任务的id
- `index` - (optional) *number* - 可选，任务插入的位置（0或更高）

### Returns
- ` id` - (string, number) - 任务的id

### Example

~~~jsx
const taskId = gantt.addTask({
    id: 10,
    text: "Task #5",
    start_date: "02-09-2025",
    duration: 28
}, "project_2", 1);
~~~

### Details

当你提供 *index* 参数且其值为0或更大时，任务将被插入到该分支的指定位置。 
如果不提供该参数，任务将默认添加到分支的末尾。

此方法会触发 [onBeforeTaskAdd](api/event/onbeforetaskadd.md) 和 [onAfterTaskAdd](api/event/onaftertaskadd.md) 事件。

请注意，如果你想避免保存任务--例如用户在 lightbox 中取消操作时--可以考虑使用 [createTask](api/method/createtask.md) 方法，该方法会触发 [onTaskCreated](api/event/ontaskcreated.md) 事件。

## 阻止在某些层级添加任务
阻止用户在某些任务下添加子任务的简单方法是通过 CSS 隐藏"Add"按钮。

1. 首先，使用 [grid_row_class](api/template/grid_row_class.md) 模板为每个任务行分配一个 CSS 类:
~~~js
gantt.templates.grid_row_class = (start, end, task) => {
    if (task.$level > 1) {
        return "nested_task";
    }
    return "";
};
~~~
2. 接着，隐藏这些行的"Add"按钮:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

:::note
Sample: [Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)
 
:::

### Related API
- [createTask](api/method/createtask.md)
- [addLink](api/method/addlink.md)
- [onAfterTaskAdd](api/event/onaftertaskadd.md)
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related Guides
- [任务的基本操作](guides/crud-task.md)

