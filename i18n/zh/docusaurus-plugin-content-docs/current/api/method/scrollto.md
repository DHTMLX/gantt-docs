---
sidebar_label: scrollTo
title: scrollTo method
description: "滚动 Gantt 容器到指定位置"
---

# scrollTo

### Description

@short: 滚动 Gantt 容器到指定位置

@signature: scrollTo: (x?: number | null, y?: number | null) =\> void

### Parameters

- `x` - (optional) *number | null* -        可选，水平滚动值，若不需要更改则为 'null'
- `y` - (optional) *number | null* -        可选，垂直滚动值，若不需要更改则为 'null'

### Example

~~~jsx
gantt.scrollTo(30, 80); // 同时水平和垂直滚动容器

gantt.scrollTo(30, null); // 仅水平滚动容器

gantt.scrollTo(null, 80); // 仅垂直滚动容器
~~~

### Related API
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)
- [scrollLayoutCell](api/method/scrolllayoutcell.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

