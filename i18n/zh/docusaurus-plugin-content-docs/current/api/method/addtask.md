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
- `parent` - (optional) *string | number* - 父级的 id
- `task` - (optional) *number* - 将被添加到的任务位置（从 0 开始）

### Returns
- ` id` - (string, number) - 任务的 id

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

如果你将 *index* 参数设置为从 0 开始及以上的值，任务将被添加到分支中指定的位置。
否则，任务将添加到任务分支的末尾。

该方法会触发 [onBeforeTaskAdd](api/event/onbeforetaskadd.md) 和 [onAfterTaskAdd](api/event/onaftertaskadd.md) 事件。

注意，如果你不想在某些情况下保存任务，例如用户在灯箱中点击“取消”按钮，请使用 [createTask](api/method/createtask.md) 方法以及该方法所触发的 [onTaskCreated](api/event/ontaskcreated.md) 事件。

### Preventing from adding tasks to certain levels

阻止向某些级别添加任务的一个相当简单的方法，是通过 CSS 隐藏“Add”按钮。

首先，使用 [grid_row_class](api/template/grid_row_class.md) 模板为每个任务行分配一个 CSS 类：
~~~js
gantt.templates.grid_row_class = (start, end, task) => {
    if (task.$level > 1) {
        return "nested_task";
    }
    return "";
};
~~~

然后，为这些行隐藏 “Add” 按钮：

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

:::note
示例 [预定义的项目结构](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)
:::

### Related API
- [createTask](api/method/createtask.md)
- [addLink](api/method/addlink.md)
- [onAfterTaskAdd](api/event/onaftertaskadd.md)
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related Guides
- [任务的基本操作](guides/crud-task.md)