---
title: "创建/选择任务与拖拽（DnD）"
sidebar_label: "创建/选择任务与拖拽（DnD）"
---

创建/选择任务与拖拽（DnD）
======================================

dhtmlxGantt 库提供了一个扩展，增强了在时间轴上通过拖拽管理任务的能力。

简而言之，**click_drag** 扩展支持以下功能:

- [通过拖拽创建任务](#creatingtaskswithdragndrop)
- [通过拖拽为未排期任务设置时间](#settingtimeforunscheduledtasks)
- [通过拖拽选择任务](#selectingtaskswithdragndrop)
- [通过拖拽创建拆分任务的部分](#creatingpartsofsplittasks)（PRO 版本）

:::note
要开始使用该扩展，请通过 [gantt.plugins](api/method/plugins.md) 方法启用 [click_drag](guides/extensions-list.md#gaojituofang) 插件。
:::

要开启高级拖拽功能，请设置 [click_drag](api/config/click_drag.md) 配置项，并在其对象内包含下列所需属性:

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- **className** -  (*string*) 为选中的元素应用自定义 CSS 类
- **render** - (*function*) 创建拖拽过程中显示的元素的函数。接收两个参数:
    - **startPoint** - (*object*) 结构如下:


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`，


  其中 absolute 表示文档左上角的坐标，relative 表示 viewPort 元素左上角的坐标
    - **endPoint** - (*object*) 与 startPoint 类似:


    `(absolute: (left: number, top: number), relative: (left: number, top: number) )`，


  absolute 和 relative 坐标含义同上
- **viewPort** - (*HTMLElement*) 事件附加和选择发生的元素
- **useRequestAnimationFrame** - (*boolean*) 指示渲染时是否使用 requestAnimationFrame
- **callback** - (*function*) 鼠标释放时触发。接收 6 个参数:
    - **startPoint** - (*object*) 结构如上所述
    - **endPoint** - (*object*) 结构如上所述
     - **startDate** - (*Date*) 拖拽起始对应的日期
    - **endDate** - (*Date*) 拖拽结束对应的日期
    - **tasksBetweenDates** - (*array*) 起止日期之间的任务
    - **tasksInRows** - (*array*) 在起止坐标间垂直选中的任务
- **singleRow** - (*boolean*) 若为 true，选择仅限于与任务高度相同的一行

你可以将以下事件附加到时间轴视图元素（默认是 gantt.$task_data，包含任务条）:

- **onBeforeDrag** - 按下鼠标后、拖拽开始前触发
- **onDrag** - 拖拽开始后、松开鼠标前持续触发
- **onBeforeDragEnd** - 松开鼠标后、拖拽元素移除和选中任务识别前触发
- **onDragEnd** - 拖拽元素移除和选中任务识别后、callback 函数调用前触发（如果设置了 callback）

~~~js
gantt.$task_data.attachEvent("onBeforeDrag", function (coords) {
    gantt.message("onBeforeDrag event");
});
~~~


**Related example:** [Attaching event handlers for the "click_drag" extension](https://snippet.dhtmlx.com/l13f1cxl)


:::note
请注意，事件处理器只能添加到已存在的元素上。因此，需在初始化 Gantt 之后添加事件处理器，否则不会生效，因为元素尚未创建。
:::

通过拖拽创建任务
---------------------------

可以直接在时间轴的空白处点击以设置任务起始日期，然后向右拖拽以定义任务持续时间，从而创建任务。

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


为未排期任务设置时间
------------------------

**click_drag** 扩展还支持通过拖拽为[未排期任务](guides/unscheduled-tasks.md)设置时间区间。

通过拖拽选择任务
-------------------------------

支持多种模式下通过拖拽选择任务:按日期、按行或在范围内选择。

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


创建拆分任务的部分
-------------------------

也可以通过拖拽为[拆分任务](guides/split-tasks.md)创建部分。

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

