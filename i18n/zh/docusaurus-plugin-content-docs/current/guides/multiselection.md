---
title: "多任务选择"
sidebar_label: "多任务选择"
---

# 多任务选择

从 3.2 版本开始，库中新增了 **multiselect** 扩展，允许您同时选择多个任务。

<div style="text-align:center;">![multiselection](/img/multiselection.png)</div>

## 启用多任务选择

要为任务启用多任务选择，请通过 [gantt.plugins](api/method/plugins.md) 方法激活该功能:

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

[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


启用后，多任务选择会自动生效。


如需关闭此扩展，请使用 [multiselect](api/config/multiselect.md) 选项:
**Disabling multi-task selection**
~~~js
gantt.config.multiselect = false; 
~~~

## 一次性批量更新多个任务

要同时修改多个任务或链接，请使用 [batchUpdate](api/method/batchupdate.md) 方法:

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
该方法允许您一次性批量更新多个任务或链接，只进行一次重渲染，避免多次更新导致的多次重绘。


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## 遍历器

要遍历甘特图中所有被选中的任务，请使用 [eachSelectedTask](api/method/eachselectedtask.md) 方法:

~~~js
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if(gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
~~~


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## 同时缩进/取消缩进

通过多任务选择，您可以一次性对多个任务执行操作。例如，您可以对任务进行缩进或取消缩进，将其变为子任务或将子任务提升为主任务。


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## 检查任务是否被选中

要判断某个任务当前是否被选中，请使用 [isSelectedTask](api/method/isselectedtask.md) 方法:

~~~js
gantt.templates.task_class = 
gantt.templates.grid_row_class = 
gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
~~~

[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


要切换任务的选中/未选中状态，请使用 [toggleTaskSelection](api/method/toggletaskselection.md) 方法:

~~~js
gantt.toggleTaskSelection("t_1"); //"t_1" 是任务的 id
gantt.render();
~~~

## 获取所有被选中的任务

要获取当前所有被选中的任务，请使用 [getSelectedTasks](api/method/getselectedtasks.md) 方法:

~~~js
gantt.getSelectedTasks();
~~~

要获取最近被选中的任务，请使用 [getLastSelectedTask](api/method/getlastselectedtask.md) 方法:

~~~js
gantt.getLastSelectedTask();
~~~

## 限制同一层级的多任务选择

如果您希望只允许选择同一层级的任务，请使用 [multiselect_one_level](api/config/multiselect_one_level.md) 选项:

~~~js
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

## 多任务选择与拖拽 {#multitaskselectionanddragndrop}

启用 **multiselect.js** 扩展后，按住 Ctrl 或 Shift 键可以选择多个任务，并可将它们一起水平拖动。

如需禁用该功能，请将 [drag_multiple](api/config/drag_multiple.md) 选项设为 *false*:

~~~js
gantt.config.drag_multiple = true; 
~~~


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


## 单击打开编辑器

在单选模式下，点击任务会立即打开内联编辑器。

在 **多选模式** 下，点击未选中的任务会先选中该任务，只有第二次点击才会打开内联编辑器。 
如果希望即使在多选模式下，第一次点击就能打开编辑器，请启用 [inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md) 配置项。

~~~js
gantt.plugins({
  multiselect: true
});

...

gantt.config.inline_editors_multiselect_open = true;
~~~

## API 事件

启用多任务选择后，选择一个或多个任务会同时触发通用的 [onTaskSelected](api/event/ontaskselected.md) / [onTaskUnselected](api/event/ontaskunselected.md) 事件，以及 multiselect 扩展专用事件。

多任务选择将触发以下事件流程:

- [onBeforeMultiSelect](api/event/onbeforemultiselect.md) - 在选择任务或任务范围前触发；此事件可被阻止
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md) - 在单个任务的选中状态改变（选中或取消选中）前触发；此事件可被阻止
- [onTaskMultiSelect](api/event/ontaskmultiselect.md) - 单个任务选中状态更改后触发
- [onTaskUnselected](api/event/ontaskunselected.md) - 针对范围内每个被取消选中的任务调用
- [onTaskSelected](api/event/ontaskselected.md) - 针对范围内每个被选中的任务调用
- [onMultiSelect](api/event/onmultiselect.md) - 任务或任务范围选择完成后触发

