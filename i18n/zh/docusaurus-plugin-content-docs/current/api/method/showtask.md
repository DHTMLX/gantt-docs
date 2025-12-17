---
sidebar_label: showTask
title: showTask method
description: "使指定的任务在屏幕上可见"
---

# showTask

### Description

@short: 使指定的任务在屏幕上可见

@signature: showTask: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    任务的ID

### Example

~~~jsx
var taskId = gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.showTask(10);
~~~

### Details

默认情况下，当调用 [showTask](api/method/showdate.md) 方法时，Gantt 会自动滚动自身以将任务滚动到视图中。但是，如果启用了 **autosize** 模式，Gantt 会扩展其容器大小以使任务在页面上可见，而不是滚动到该任务。有关如何处理此行为的更多详细信息，请参阅 [Scrolling to hidden elements](api/config/autosize.md) 指南。

### Related API
- [showDate](api/method/showdate.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

