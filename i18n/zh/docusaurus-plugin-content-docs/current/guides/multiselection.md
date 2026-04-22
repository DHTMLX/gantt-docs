---
title: "多任务选择"
sidebar_label: "多任务选择"
---

# 多任务选择

从版本 3.2 开始，库提供了 **multiselect** 扩展，允许一次选择多个任务。

<div style="text-align:center;">![多选](/img/multiselection.png)</div>

## 启用多任务选择

要为任务启用多任务选择，请使用 [gantt.plugins](api/method/plugins.md) 方法启用：

~~~js
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({ /*!*/
        multiselect: true /*!*/
    }); /*!*/
    //your code will be here
</body>
</html>
~~~

[多选和缩进/取消缩进任务](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

一旦扩展被激活，将自动开启多任务选择。

要禁用扩展，请使用 [multiselect](api/config/multiselect.md) 选项：
**禁用多任务选择**
~~~js
gantt.config.multiselect = false; 
~~~

## 一次性更新多个任务

要一次性更新多个任务/链接，请使用 [batchUpdate](api/method/batchupdate.md) 方法：

~~~js
gantt.batchUpdate(function () {
    var tasks = gantt.getTaskByTime();
    for(var i = 0; i < tasks.length; i++){
        var task = tasks[i];
        task.start_date = gantt.date.add(task.start_date, 1, "day");
        task.end_date = gantt.calculateEndDate(task.start_date, task.duration);
        gantt.updateTask(task.id);
    }
});
~~~
该方法允许通过单次重新渲染来一次性更新多个任务/链接，而不是进行多次更新和多次重新渲染。

[多选和缩进/取消缩进任务](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

## 迭代器

要遍历甘特图中所有被选中的任务，请使用 [eachSelectedTask](api/method/eachselectedtask.md) 方法：

~~~js
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if(gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
~~~

[多选和缩进/取消缩进任务](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

## 同时缩进/取消缩进

多任务选择允许您一次性对多个任务执行不同的操作。例如，您可以增加缩进/取消缩进，从而将任务转换为子任务，反之亦然。

[多选和缩进/取消缩进任务](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

## 检查任务是否被选中

要检查某个任务是否当前被选中，请使用 [isSelectedTask](api/method/isselectedtask.md) 方法：

~~~js
gantt.templates.task_class = 
gantt.templates.grid_row_class = 
gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
~~~

[多选和缩进/取消缩进任务](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

要在选中与未选中状态之间切换，请使用 [toggleTaskSelection](api/method/toggletaskselection.md) 方法：

~~~js
gantt.toggleTaskSelection("t_1"); //"t_1" 是任务的 id
gantt.render();
~~~

## 获取所有被选中的任务

要获取当前被选中的所有任务，请使用 [getSelectedTasks](api/method/getselectedtasks.md) 方法：

~~~js
gantt.getSelectedTasks();
~~~

要获取最后一次被选中的任务，请使用 [getLastSelectedTask](api/method/getlastselectedtask.md) 方法：

~~~js
gantt.getLastSelectedTask();
~~~

## 将多任务选择限定在同一层级

要禁止从不同层级选择任务，请使用 [multiselect_one_level](api/config/multiselect_one_level.md) 选项：

~~~js
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

## 多任务选择与拖拽 {#multitaskselectionanddragndrop}

当启用 **multiselect.js** 扩展时，您可以按住 Ctrl 或 Shift 键并水平拖动所选的多个任务来一次性移动。

要禁用此功能，请将 [drag_multiple](api/config/drag_multiple.md) 配置设置为 *false*：

~~~js
gantt.config.drag_multiple = true; 
~~~

[多选和缩进/取消缩进任务](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

## 一键打开编辑器

在单一选择模式下，单击任务后，Gantt 将打开内联编辑器。

在 **多选** 模式下，单击未选中的任务后，Gantt 将选中它，并且只有在第二次单击后才会打开 [内联编辑器](guides/inline-editing.md)。 
如果你希望 Gantt 在第一次单击后就打开内联编辑器，请启用 [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md) 配置。

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~

## API 事件 {#apievents}

启用多任务选择后，选择一个任务或一个范围的任务将同时触发通用的 [onTaskSelected] / [onTaskUnselected] 事件，以及与 multiselect 扩展相关的事件。

多任务选择的事件流程如下：

- [onBeforeMultiSelect] - 在选择任务或一段任务之前触发，可阻止
- [onBeforeTaskMultiSelect] - 在任务选择状态即将改变（任务被选中或取消选中）之前触发，可阻止
- [onTaskMultiSelect] - 在任务选择状态改变后触发（任务已被选中/取消选中）
- [onTaskUnselected] - 针对多选范围内的每个任务调用
- [onTaskSelected] - 针对多选范围内的每个任务调用
- [onMultiSelect] - 在选择一个任务或一段任务完成后触发