---
sidebar_label: scrollTo
title: scrollTo 方法
description: "将 Gantt 容器滚动到指定位置"
---

# scrollTo

### Description

@short: 将 Gantt 容器滚动到指定位置

@signature: scrollTo: (x?: number | null, y?: number | null) =\> void

### Parameters

- `x` -	(optional) *number | null*	-	可选，水平滚动的值，或 'null'（如果不应改变滚动位置）
- `y`	(optional) *number | null*	-	可选，垂直滚动的值，或 'null'（如果不应改变滚动位置）

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