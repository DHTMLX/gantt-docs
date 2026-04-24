---
title: "通过拖放创建/选择任务"
sidebar_label: "通过拖放创建/选择任务"
---

# 通过拖放创建/选择任务

dhtmlxGantt 库提供了一个扩展，能够在时间线中处理任务时提供高级拖放功能。

总之，**click_drag** 扩展允许：

- [通过拖放创建任务](#creating-tasks-with-drag-n-drop)
- [通过拖放为未排程的任务设置时间](#setting-time-for-unscheduled-tasks)
- [通过拖放选择任务](#selecting-tasks-with-drag-n-drop)
- [通过拖放创建拆分任务的部分](#creating-parts-of-split-tasks)（PRO 版）

:::note
要开始使用该扩展，请使用 [gantt.plugins](api/method/plugins.md) 方法启用 [click_drag](guides/extensions-list.md#advanced-drag-n-drop) 插件。
:::

要启用高级拖放，请指定 [click_drag](api/config/click_drag.md) 配置选项，并在其对象中设置下方列表中的必要属性：

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- **className** -  (*string*) 为被选中元素设置自定义 CSS 类
- **render** -  (*function*) 在拖动过程中创建被渲染的元素的函数。共有两个参数： 
    - **startPoint** - (*object*) - 一种类型的对象：


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  其中 absolute 为文档左上角的坐标，relative 为用作 viewPort 的左上角元素的坐标 
    - **endPoint** - (*object*) 一种类型的对象： 


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  其中 absolute 为文档左上角的坐标，relative 为用作 viewPort 的左上角元素的坐标 
- **viewPort** - (*HTMLElement*) 要附加事件并选择的元素
- **useRequestAnimationFrame** - (*boolean*) 定义渲染时是否使用 requestAnimationFrame
- **callback** - (*function*) - 当释放鼠标按钮时将被调用的函数。接受 6 个参数：
    - **startPoint** - (*object*) - 一种类型的对象： 


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  其中 absolute 为文档左上角的坐标，relative 为用作 viewPort 的左上角元素的坐标 
    - **endPoint** - (*object*) 一种类型的对象： 


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`, 


  其中 absolute 为文档左上角的坐标，relative 为用作 viewPort 的左上角元素的坐标 
     - **startDate** - (*Date*) 对应于起点的日期
    - **endDate** - (*Date*) 对应于终点的日期
    - **tasksBetweenDates** - (*array*) 在起止日期之间的任务数组
    - **tasksInRows** - (*array*) 在垂直方向上位于起止坐标之间被选中的任务数组
- **singleRow** - (*boolean*) true 时仅在一个等同于一个任务高度的行中添加选中

您可以将以下事件附加到时间线视口的元素上（默认情况下为 gantt.$task_data - 时间线上的任务条的一部分）：

- **onBeforeDrag** - 在按下鼠标按钮后、开始拖动前触发
- **onDrag** - 在拖动开始后、释放鼠标按钮前每次触发
- **onBeforeDragEnd** - 在释放鼠标按钮后、渲染的元素被删除、并搜索出现在选择范围内的任务之前触发
- **onDragEnd** - 在删除渲染的元素、找到出现在选择范围内的任务后但在调用回调函数（如有）之前触发

~~~js
gantt.$task_data.attachEvent("onBeforeDrag", function (coords) {
    gantt.message("onBeforeDrag event");
});
~~~

**相关示例** [Attaching event handlers for the "click_drag" extension](https://snippet.dhtmlx.com/l13f1cxl)

:::note
请注意，事件处理程序只能为已有元素添加。因此应在 Gantt 初始化后再添加事件处理程序，否则它们将不起作用，因为这些元素尚未创建。
:::

## 通过拖放创建任务

您可以在时间线直接通过拖放创建任务：在空白处点击以设置任务的开始日期，然后向右拖动以设置其持续时间。

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};

gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRow){
    if (tasksInRow.length === 1) {
        var parent = tasksInRow[0];
        gantt.createTask({
            text:"Subtask of " + parent.text,
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        }, parent.id);
    } else if (tasksInRow.length === 0) {
        gantt.createTask({
            text:"New task",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        });
    }
}
~~~

[Create new tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)

## 为未排程的任务设置时间

通过拖放扩展，您可以为 [unscheduled tasks](guides/unscheduled-tasks.md) 设置时间。

## 通过拖放选择任务

可以在多种模式下通过拖放来选择任务：按照日期、按行，或在边界内。

~~~js
gantt.config.multiselect = true;
gantt.config.click_drag = {
    callback: onDragEnd
};

gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;
gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRows){
    var mode = document.querySelector("input[name="selectMode]:checked"").value;
        switch(mode) {
            case "1":
                unselectTasks();
                tasksBetweenDates.forEach(function(item) {
                    gantt.selectTask(item.id);
                });
            break;
            case "2":
                unselectTasks();
                tasksInRows.forEach(function(item) {
                    gantt.selectTask(item.id);
                });
            break;
            case "3":
                unselectTasks();
                for (var i="0;" i<tasksBetweenDates.length; i++) {
                    for (var j="0;" j<tasksInRows.length; j++) {
                        if (tasksBetweenDates[i] === tasksInRows[j]) {
                            gantt.selectTask(tasksBetweenDates[i].id);
                        }
                    }
                }
            break;
            return;
        }
}
~~~


[Select multiple tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/25_click_drag_select_by_drag.html)


## 通过拖放创建拆分任务的部分

:::info
此功能仅在 PRO 版中可用。
:::
您也可以通过拖放创建 [split tasks](guides/split-tasks.md) 的部分。

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
}

gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRow){
    if (tasksInRow.length === 1) {
        var currentTask = tasksInRow[0];
        if (currentTask.type === "project") {
            currentTask.render = "split";
            gantt.addTask({
                text:"Subtask of " + currentTask.text,
                start_date: gantt.roundDate(startDate),
                end_date: gantt.roundDate(endDate)
            }, currentTask.id);
        } else {
            var projectName = "new Project " + currentTask.text;
            var newProject = gantt.addTask({
                text: projectName,
                render: "split",
                type: "project",
            }, currentTask.parent);
            gantt.moveTask(
                newProject,
                gantt.getTaskIndex(currentTask.id),
                gantt.getParent(currentTask.id)
            );
            gantt.moveTask(currentTask.id, 0, newProject);
            gantt.calculateTaskLevel(currentTask)

            var newTask = gantt.addTask({
                text:"Subtask of " + projectName,
                start_date: gantt.roundDate(startDate),
                end_date: gantt.roundDate(endDate)
            }, newProject);
            gantt.calculateTaskLevel(newTask);
        }
    } else if (tasksInRow.length === 0) {
        gantt.createTask({
            text:"New task",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        });
    }
}
~~~

[Create split tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/23_click_drag_splittask.html)