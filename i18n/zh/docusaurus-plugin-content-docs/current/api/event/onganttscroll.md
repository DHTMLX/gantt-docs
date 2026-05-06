---
sidebar_label: onGanttScroll
title: onGanttScroll 事件
description: "当甘特图滚动到某个点时触发"
---

# onGanttScroll

### Description

@short: 当甘特图滚动到特定位置时触发

@signature: onGanttScroll: (left: number, top: number) =\> void;

### Parameters

- `left` - (required) *number* - 水平滚动的位置
- `top` - (required) *number* - 垂直滚动的位置

### Example

~~~jsx
gantt.attachEvent("onGanttScroll", function (left, top){
    // 在这里插入您的自定义逻辑 
});
~~~

### Related API
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [showTask](api/method/showtask.md)
- [showDate](api/method/showdate.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline) (了解如何在时间线中实现无限滚动)
- [How-tos](guides/how-to.md#how-to-load-tasks-dynamically) (了解如何动态加载任务)