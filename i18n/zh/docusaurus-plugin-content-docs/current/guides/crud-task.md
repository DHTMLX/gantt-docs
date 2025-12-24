---
title: "任务的基本操作"
sidebar_label: "任务的基本操作"
---

# 任务的基本操作


本章介绍如何处理任务的基本操作:动态创建、删除和更新任务属性。

## 添加新任务


要向甘特图添加新任务，请使用 [addTask](api/method/addtask.md) 方法:

~~~js
var taskId = gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2020",
    duration:28
});
~~~

### 限制在特定层级添加任务

如果你想阻止用户在某些层级的任务下添加子任务（或基于其他条件），一种简单的方法是通过 CSS 隐藏"添加"按钮。

你可以通过 [grid_row_class](api/template/grid_row_class.md) 模板为每一行任务分配一个 CSS 类:

~~~js
gantt.templates.grid_row_class = function( start, end, task ){
    if ( task.$level > 1 ){
        return "nested_task"
    }
    return "";
};
~~~

然后为这些行隐藏"添加"按钮:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

[Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## 更新任务属性


要动态更新任务对象的属性，请使用 [updateTask](api/method/updatetask.md) 方法:

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1";/*!*/ 
gantt.updateTask(10); /*!*/
~~~

当启用 Data Processor 时，调用 [updateTask()](api/method/updatetask.md) 会将更改发送到服务器。

任务更新后，会触发 [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 事件。这可能会引发其他更新，例如如果启用了该功能，则自动调度任务及其后续任务。

如果只需要进行界面刷新而不需要将数据发送到服务器，可以使用 [refreshTask()](api/method/refreshtask.md) 方法替代 [updateTask()](api/method/updatetask.md):

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1"; 
gantt.refreshTask(10);
~~~

## 重绘任务


要重绘甘特图中的所有任务，请使用 [refreshData](api/method/refreshdata.md) 方法:

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
var task2 = gantt.getTask(11);//->{id:11,text:"Task #11",start_date:"05-09-2020",...}
 
task.text = "Task #10_1"; /*!*/ 
task2.text = "Task #11_1";/*!*/ 
gantt.refreshData(); /*!*/ 
~~~

## 删除任务


要移除一个任务，请使用 [deleteTask](api/method/deletetask.md) 方法:

~~~js
gantt.deleteTask(taskId);
~~~

## 级联删除嵌套任务


[cascade_delete](api/config/cascade_delete.md) 设置控制任务删除的处理方式。默认情况下，它设置为 *true*，意味着删除一个任务会为每个相关的嵌套任务和关联的链接向服务器发起请求。

如果不希望发送多个请求，可以禁用 [cascade_delete](api/config/cascade_delete.md) 选项:

~~~js
gantt.config.cascade_delete = false;
~~~

关闭该设置后，Gantt 只会发送一个请求删除父任务，服务器端负责移除嵌套任务和链接。

此选项会影响后端的实现。更多细节请参见
[Server-side Integration 文章的相关部分](guides/server-side.md#jilianshanchu)。

## 从甘特图中移除所有任务


要清空甘特图中的所有任务，请调用 [clearAll](api/method/clearall.md) 方法:

~~~js
gantt.clearAll();
~~~

