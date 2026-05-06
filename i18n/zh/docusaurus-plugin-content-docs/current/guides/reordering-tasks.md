---
title: "重新排序任务"
sidebar_label: "重新排序任务"
---

# 重新排序任务

dhtmlxGantt 提供在网格中重新排序任务的两种方式：

1. 拖拽排序（Drag-and-drop）。
2. 排序（详见 [details](guides/sorting.md)）。

这两种方式是互斥的。默认情况下，两个模式都处于禁用状态。

要启用拖拽重新排序，请使用 [order_branch](api/config/order_branch.md) 选项：

~~~js
gantt.config.order_branch = true;
gantt.init("gantt_here");
~~~

[Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

你可以观看视频指南，了解如何在网格中对任务进行排序和重新排序。

<iframe width="676" height="400" src="https://www.youtube.com/embed/srtb3nYOb-E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 在整个 Gantt 结构中的拖拽排序

[order_branch](api/config/order_branch.md) 选项允许在同一树级内拖动任务。

也可以启用在整个 Gantt 中重新排序任务的模式。这意味着一个任务可以替换任何树级中的另一个任务。要使用这种类型的任务重新排序，请使用 [order_branch_free](api/config/order_branch_free.md) 选项：

~~~js
// 在整个 gantt 内重新排序任务
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
~~~

[Drag and drop rows in Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)

## 禁止在特定位置拖放 {#denyingdroppingtospecificpositions}

要禁止将任务拖放到特定位置，请使用 [onBeforeTaskMove](api/event/onbeforetaskmove.md) 或 [onBeforeRowDragEnd](api/event/onbeforerowdragend.md) 事件：

~~~js
//防止移动到另一个子分支：
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});

//或
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){
      var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

## 针对大型数据集的性能提升

如果你的 Gantt 含有大量任务，默认的分支重新排序模式可能会降低性能。要提速，可以使用“marker”模式。

~~~js
gantt.config.order_branch = "marker";
~~~

[Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html)

在此模式下，只对任务的名称进行重新排序（在按住左键时），只有在任务被拖放到目标位置并释放按键时才重新渲染 Gantt。与默认模式不同，任务位置的變更不会触发 onBeforeTaskMove/onAfterTaskMove 事件。

要防止将任务拖放到特定位置，请改用 [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) 事件（仅在“marker”模式下工作）。

## 拖拽时高亮显示可用的放置位置

在拖拽过程中高亮显示可用的目标位置（例如，不可能把根节点拖到另一个根节点之下，你希望通过视觉效果通知用户这一点），请使用 [onRowDragStart](api/event/onrowdragstart.md) 和 [onRowDragEnd](api/event/onrowdragend.md) 事件：

~~~js
gantt.config.order_branch = true;// 仅在一个分支内对任务进行排序
gantt.init("gantt_here");
gantt.parse(demo_tasks);

var drag_id = null;
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    drag_id = id;
    return true;
});
gantt.attachEvent("onRowDragEnd", function(id, target) {
    drag_id = null;
    gantt.render();
});

gantt.templates.grid_row_class = function(start, end, task){
    if(drag_id && task.id != drag_id){
        if(task.$level != gantt.getTask(drag_id).$level)
            return "cant-drop";
        }
    return "";
};
~~~

## 在时间线中垂直重新排序任务

请按照 [How to vertically reorder tasks in the timeline](guides/how-to.md#how-to-vertically-reorder-tasks-in-the-timeline) 小节中的示例进行操作。