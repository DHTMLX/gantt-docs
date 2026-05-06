---
sidebar_label: getScrollState
title: getScrollState method
description: "返回滚动位置"
---

# getScrollState

### Description

@short: 返回滚动位置

@signature: getScrollState: () =\> \{ x: number, y: number \}

### Returns
- `ScrollState` - (ScrollState) - 该滚动位置对象

### Example

~~~jsx
const sPos = gantt.getScrollState(); // {x:58,y:180}
const posX = sPos.x;
const posY = sPos.y;
~~~

### Details

该方法返回一个包含以下属性的对象：

- **y** - 垂直方向滚动的像素数量
- **x** - 水平方向滚动的像素数量
- **inner_width** - 可见时间线区域的宽度
- **inner_height** - 可见时间线区域的高度
- **width** - 时间线区域的滚动宽度
- **height** - 时间线区域的滚动高度

### Related API
- [scrollTo](api/method/scrollto.md)
- [onGanttScroll](api/event/onganttscroll.md)
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)