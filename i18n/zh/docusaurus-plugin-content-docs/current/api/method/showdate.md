---
sidebar_label: showDate
title: showDate 方法
description: "将图表区域滚动到使指定日期可见"
---

# showDate

### Description

@short: 将图表区域滚动以使指定日期可见

@signature: showDate: (date: Date) =\> void

### Parameters

- `date` - (required) *Date* - 要在图表中显示的日期

### Example

~~~jsx
gantt.showDate(new Date()); //滚动到当前日期
~~~

### Details

在默认模式下，当你使用 [showDate](api/method/showdate.md) 方法时，Gantt 会自动滚动。

但如果启用 **autosize** 模式，Gantt 会增大其容器的尺寸，以便在页面上显示自身，而不是显示指定日期。

请阅读 [滚动到隐藏元素](api/config/autosize.md) 文章，了解如何解决此问题。

### Related API
- [showTask](api/method/showtask.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)