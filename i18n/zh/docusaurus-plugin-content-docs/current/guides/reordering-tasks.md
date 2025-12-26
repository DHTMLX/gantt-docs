---
title: "任务重新排序"
sidebar_label: "任务重新排序"
---

# 任务重新排序

dhtmlxGantt 提供了两种在表格中重新排序任务的方法:

1. 拖放操作。
2. 排序（参见[详情](guides/sorting.md)）。

这两种方法互斥。默认情况下，两者均为关闭状态。

要启用拖放重新排序功能，请设置 [order_branch](api/config/order_branch.md) 选项:

~~~js
gantt.config.order_branch = true;
gantt.init("gantt_here");
~~~


[Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)


此外，还有一个视频教程演示了如何在表格中排序和重新排序任务。

<iframe width="676" height="400" src="https://www.youtube.com/embed/srtb3nYOb-E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 跨整个 Gantt 结构拖放

[order_branch](api/config/order_branch.md) 选项限制只能在同一树级别内拖动任务。

不过，也可以启用一种模式，使任务可以在 Gantt 的任意位置重新排序，允许任务替换任何树级别的其他任务。要启用此功能，请使用 [order_branch_free](api/config/order_branch_free.md) 选项:

~~~js
// 在整个 gantt 内重新排序任务
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

gantt.init("gantt_here");
~~~


[Drag and drop rows in Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)


## 限制拖放位置

如需防止任务被拖放到某些位置，请使用 [onBeforeTaskMove](api/event/onbeforetaskmove.md) 或 [onBeforeRowDragEnd](api/event/onbeforerowdragend.md) 事件:

~~~js
// 防止移动到其他子分支：
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});

// 或者
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

## 提升大数据集下的性能

当处理大量任务时，默认的分支重排序模式可能会影响性能。为提升性能，可以使用"marker"模式。

~~~js
gantt.config.order_branch = "marker";
~~~


[Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html)


在该模式下，仅任务名称会随着鼠标左键按下而移动，只有在任务被释放后 Gantt 图才会重新渲染。与默认模式不同，改变任务位置不会触发 onBeforeTaskMove 或 onAfterTaskMove 事件。

如需在该模式下限制任务拖放位置，请使用 [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) 事件（仅在 "marker" 模式下有效）。

## 拖放时高亮可用的放置目标

如需在拖动过程中直观地显示有效的放置目标（例如，防止根节点被拖到另一个根节点下），请使用 [onRowDragStart](api/event/onrowdragstart.md) 和 [onRowDragEnd](api/event/onrowdragend.md) 事件:

~~~js
gantt.config.order_branch = true; // 仅在分支内排序任务
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

## 在时间轴中垂直重新排序任务

请参考[如何在时间轴中垂直重新排序任务](guides/how-to.md#ruhezaishijianxianzhongchuizhichongxinpaixurenwu)部分中的示例。

