---
title: "任务的基本操作"
sidebar_label: "任务的基本操作"
---

# 任务的基本操作

在本章中，您将学习如何对任务执行基本操作：创建或删除任务，以及动态更新任务属性。

## 添加新任务

要向 Gantt 图添加新任务，请使用 [`addTask()`](api/method/addtask.md) 方法：

~~~js
const taskId = gantt.addTask({
    id: 10,
    text: "Project #1",
    start_date: "2027-09-02",
    duration: 28
});
~~~

### 阻止向某些层级添加任务

一种简单的方法，可以阻止用户向某个特定层级的任务添加子任务，或基于其他条件，是通过 CSS 隐藏“添加”按钮。

您可以使用 [`grid_row_class`](api/template/grid_row_class.md) 模板，为每个任务行分配一个 CSS 类：

~~~js
gantt.templates.grid_row_class = (start, end, task) => {
    if (task.$level > 1) {
        return "nested_task";
    }
    return "";
};
~~~

并隐藏该行的“Add”按钮：

~~~css
.nested_task .gantt_add {
    display: none !important;
}
~~~

[预定义的项目结构](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## 更新任务的属性

要动态更新任务对象的某个属性，请使用 [`updateTask()`](api/method/updatetask.md) 方法：

~~~js {3-4}
const task = gantt.getTask(10); // -> { id: 10, text: "Task #10", start_date: "2027-09-02", ... }

task.text = "Task #10_1";
gantt.updateTask(10);
~~~

如果 Data Processor 启用，[`updateTask()`](api/method/updatetask.md) 方法将会把变更发送到服务器。

在任务更新之后，会触发 [`onAfterTaskUpdate`](api/event/onaftertaskupdate.md) 事件。它可能引发其他变更。例如，当启用自动排程时，Gantt 将自动对该任务及其所有后继任务进行排程。

如果你只想重新渲染变更，请改用 [`refreshTask()`](api/method/refreshtask.md) 方法，而不是 [`updateTask()`](api/method/updatetask.md)。

~~~js
const task = gantt.getTask(10); // -> { id: 10, text: "Task #10", start_date: "2027-09-02", ... }

task.text = "Task #10_1";
gantt.refreshTask(10);
~~~

## 重新绘制任务

要重新绘制甘特图中的所有任务，请使用 [`refreshData()`](api/method/refreshdata.md) 方法：

~~~js {4-6}
const firstTask = gantt.getTask(10); // -> { id: 10, text: "Task #10", start_date: "2027-09-02", ... }
const secondTask = gantt.getTask(11); // -> { id: 11, text: "Task #11", start_date: "2027-09-05", ... }

firstTask.text = "Task #10_1";
secondTask.text = "Task #11_1";
gantt.refreshData();
~~~

## 删除任务

要删除任务，请使用 [`deleteTask()`](api/method/deletetask.md) 方法：

~~~js
gantt.deleteTask(taskId);
~~~

## 嵌套任务的级联删除

存在一个 cascade_delete 配置，用于规范从 Gantt 删除任务的过程。默认值为 true，
这意味着删除某个任务时，Gantt 会为被删除任务的每个嵌套任务和链接向服务器发送请求。

如果你不需要向服务器发送多次请求，可以简单地禁用 cascade_delete 配置：

~~~js
gantt.config.cascade_delete = false;
~~~

此时，Gantt 只会向服务器发送一个请求来删除父任务，而其嵌套任务和链接将由服务器删除。

cascade_delete 选项会影响后端实现的方式。更多信息，请参阅 Server-side Integration 文章中的相关部分（guides/server-side.md#cascade-deletion）。


## 清除甘特图中的所有任务

要从甘特图清除所有任务，请调用 [`clearAll()`](api/method/clearall.md) 方法：

~~~js
gantt.clearAll();
~~~