---
sidebar_label: onGanttScroll
title: onGanttScroll event
description: "当甘特图滚动到特定位置时触发"
---

# onGanttScroll

### Description

@short: 当甘特图滚动到特定位置时触发

@signature: onGanttScroll: (left: number, top: number) =\> void;

### Parameters

- `left` - (required) *number* - 水平滚动位置
- `top` - (required) *number* - 垂直滚动位置

### Example

~~~jsx
gantt.attachEvent("onGanttScroll", function (left, top){
    // 在这里添加任何自定义逻辑
});
~~~

### Related API
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [showTask](api/method/showtask.md)
- [showDate](api/method/showdate.md)

### Related Guides
- [操作指南](guides/how-to.md) (查看如何设置无限滚动)
- [操作指南](guides/how-to.md) (查看如何动态加载任务)

