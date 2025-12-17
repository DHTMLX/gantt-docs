---
sidebar_label: showTask
title: showTask method
description: "makes the specified task visible on the screen"
---

# showTask

### Description

@short: Makes the specified task visible on the screen

@signature: showTask: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    the task id

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

In the default mode, Gantt scrolls itself when you use the [showTask](api/method/showdate.md) method.
But if the **autosize** mode is enabled, Gantt increases the size of its container to show itself on the page instead of showing the specified date. 
Read the [Scrolling to hidden elements](api/config/autosize.md) article to know how to solve this problem.

### Related API
- [showDate](api/method/showdate.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

