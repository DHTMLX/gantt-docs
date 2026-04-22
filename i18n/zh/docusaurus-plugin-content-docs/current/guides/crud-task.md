---
title: "任务的基本操作"
sidebar_label: "任务的基本操作"
---

# 任务的基本操作

在本章中，您将学习如何对任务执行基本操作：创建或删除任务，动态更新任务的属性。

## 新增一个任务

要向甘特图中添加新任务，请使用 [addTask] 方法：

~~~js
var taskId = gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2020",
    duration:28
});
~~~

### 防止在某些级别添加任务

一种简单的方法是在某个级别的任务上阻止用户添加子任务（或基于某些其他条件），方法是通过 CSS 隐藏 'Add' 按钮。

您可以使用 [grid_row_class] 模板为每个任务行分配一个 CSS 类：

~~~js
gantt.templates.grid_row_class = function( start, end, task ){
    if ( task.$level > 1 ){
        return "nested_task"
    }
    return "";
};
~~~

并对这样的行隐藏 'Add' 按钮：

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

[预定义项目结构](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)

## 更新一个任务的属性

要动态更新任务对象的某个属性，请使用 [updateTask] 方法：

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1";/*!*/ 
gantt.updateTask(10); /*!*/
~~~

如果 Data Processor 启用， [updateTask()](api/method/updatetask.md) 方法将把更改发送到服务器。

在任务更新后，将触发 [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 事件。它可能引发其他更改，例如当启用自动调度时，Gantt 将自动调度该任务及其所有后继任务。

如果您只需要重新渲染更改，请使用 [refreshTask()](api/method/refreshtask.md) 方法，而不是 [updateTask()](api/method/updatetask.md)。

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1"; 
gantt.refreshTask(10);
~~~

## 重新绘制任务

要重新绘制甘特图中的所有任务，请使用 [refreshData](api/method/refreshdata.md) 方法：

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
var task2 = gantt.getTask(11);//->{id:11,text:"Task #11",start_date:"05-09-2020",...}
 
task.text = "Task #10_1"; /*!*/ 
task2.text = "Task #11_1";/*!*/ 
gantt.refreshData(); /*!*/ 
~~~

## 删除任务

要删除一个任务，请使用 [deleteTask](api/method/deletetask.md) 方法：

~~~js
gantt.deleteTask(taskId);
~~~

## 嵌套任务的级联删除

存在一个 [cascade_delete](api/config/cascade_delete.md) 配置，用于规范从甘特图删除任务的过程。默认设置为 *true*，这意味着在删除一个任务时，Gantt 会对被删除任务的每个嵌套任务和链接发送一个服务器请求。

如果您不需要向服务器发送多个请求，可以简单地禁用 [cascade_delete](api/config/cascade_delete.md) 配置：

~~~js
gantt.config.cascade_delete = false;
~~~

在这种情况下，Gantt 只会向服务器发送一个请求——仅删除父任务，而其嵌套任务和链接将由服务器删除。

[cascade_delete](api/config/cascade_delete.md) 选项会影响后端实现的方式。有关更多信息，请参阅 Server-side Integration 文章的相关部分的 [cascade-deletion](guides/server-side.md#cascade-deletion)。

## 从甘特图移除所有任务

要清空甘特图中的任务，请调用 [clearAll](api/method/clearall.md) 方法：

~~~js
gantt.clearAll();
~~~