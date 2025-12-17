---
sidebar_label: getScrollState
title: getScrollState method
description: "获取当前的滚动位置"
---

# getScrollState

### Description

@short: 获取当前的滚动位置

@signature: getScrollState: () =\> \{ x: number, y: number \}

### Returns
- `ScrollState` - (ScrollState) - 一个表示滚动位置的对象

### Example

~~~jsx
const sPos = gantt.getScrollState(); // {x:58,y:180}
const posX = sPos.x;
const posY = sPos.y;
~~~

### Details

此方法返回一个包含以下详细信息的对象:

- **y** - 垂直滚动偏移量，单位为像素
- **x** - 水平滚动偏移量，单位为像素
- **inner_width** - 可见时间线部分的宽度
- **inner_height** - 可见时间线部分的高度
- **width** - 时间线的总可滚动宽度
- **height** - 时间线的总可滚动高度

### Related API
- [scrollTo](api/method/scrollto.md)
- [onGanttScroll](api/event/onganttscroll.md)
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)

