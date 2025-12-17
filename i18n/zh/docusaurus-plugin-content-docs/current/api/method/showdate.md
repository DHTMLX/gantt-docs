---
sidebar_label: showDate
title: showDate method
description: "滚动图表区域以显示指定日期"
---

# showDate

### Description

@short: 滚动图表区域以显示指定日期

@signature: showDate: (date: Date) =\> void

### Parameters

- `date` - (required) *Date* - 要在图表中显示的日期

### Example

~~~jsx
gantt.showDate(new Date()); //滚动到当前日期
~~~

### Details

默认情况下，调用 [showDate](api/method/showdate.md) 方法会使甘特图滚动到指定日期。 
但是，当启用 **autosize** 模式时，甘特图不会滚动，而是会扩展其容器的大小以在页面上显示该日期。 
有关如何处理此行为的更多详情，请参阅[滚动到隐藏元素](api/config/autosize.md)一文。

### Related API
- [showTask](api/method/showtask.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

