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

- `id` - (必需) *string | number* - 任务 ID

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

在默认模式下，当你使用 [showTask](api/method/showdate.md) 方法时，Gantt 会自行滚动。
但如果启用了 **autosize** 模式，Gantt 会增大其容器的尺寸，以便在页面上显示自身，而不是显示指定的日期。
请阅读 [Scrolling to hidden elements](api/config/autosize.md) 文章，以了解如何解决此问题。

### Related API
- [showDate](api/method/showdate.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)