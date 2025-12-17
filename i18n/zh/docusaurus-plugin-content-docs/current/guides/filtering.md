---
title: "任务过滤"
sidebar_label: "任务过滤"
---

任务过滤
============================

过滤功能可以通过限制任务的数量和类型，帮助控制哪些任务显示在甘特图中。例如，可以仅显示分配给特定员工的任务或被标记为紧急的任务。

请注意，dhtmlxGantt 支持客户端过滤。

![filtering](/img/filtering.png)

要应用过滤，请使用 @[onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 事件，并返回:

- *true* 显示任务
- *false* 隐藏任务

**仅显示高优先级任务**
~~~js
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~


[Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)


要过滤拆分任务的部分，请使用 @[onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) 事件。

此外，还有一个视频教程，演示如何设置任务过滤。

<iframe width="676" height="400" src="https://www.youtube.com/embed/LyJ3zKSrmH4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

