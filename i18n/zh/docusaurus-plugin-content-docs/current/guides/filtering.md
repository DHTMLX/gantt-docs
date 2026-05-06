---
title: "筛选任务"
sidebar_label: "筛选任务"
---

# 筛选任务

过滤功能使您能够控制在甘特图中呈现的任务数量及特征。例如，您可以使用过滤来显示分配给特定人员的任务，或显示优先级为紧急的任务。

请注意，dhtmlxGantt 支持客户端过滤。

![filtering](/img/filtering.png)

要过滤数据，请使用 [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 事件并返回：

- *true*，表示要显示的任务
- *false*，表示不显示的任务

**仅显示高优先级的任务**
~~~js
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~

[基础过滤](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

要过滤分割任务的数据，请应用 [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) 事件。

您可以查看显示如何实现任务过滤的视频指南。

<iframe width="676" height="400" src="https://www.youtube.com/embed/LyJ3zKSrmH4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>