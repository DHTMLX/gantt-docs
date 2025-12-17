---
sidebar_label: onGanttScroll
title: onGanttScroll event
description: "fires when the Gantt chart is scrolled to a particular point"
---

# onGanttScroll

### Description

@short: Fires when the Gantt chart is scrolled to a particular point

@signature: onGanttScroll: (left: number, top: number) =\> void;

### Parameters

- `left` - (required) *number* - the position of horizontal scroll
- `top` - (required) *number* - the position of vertical scroll

### Example

~~~jsx
gantt.attachEvent("onGanttScroll", function (left, top){
    // any custom logic here
});
~~~

### Related API
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [showTask](api/method/showtask.md)
- [showDate](api/method/showdate.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline) (read how to implement an infinite scroll)
- [How-tos](guides/how-to.md#how-to-load-tasks-dynamically) (read how to load tasks dynamically)

