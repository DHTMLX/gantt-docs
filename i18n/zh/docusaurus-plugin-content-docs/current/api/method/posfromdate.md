---
sidebar_label: posFromDate
title: posFromDate 方法
description: "获取图表区域中指定日期的相对水平位置"
---

# posFromDate

### Description

@short: 在图表区域中获取指定日期的相对水平位置

@signature: posFromDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - 你想要知道位置的日期

### Returns
- ` position` - (number) - 时间线中指定日期的 x 坐标（以像素为单位）

### Example

~~~jsx
gantt.posFromDate(new Date());
~~~

### Details

:::note
该方法返回当前在 Gantt 图中呈现的日期的位置。如果在图表中未呈现某日期，该方法将返回 'null'。
:::

例如，对于上面的甘特图，该方法将返回以下值：

~~~js
gantt.posFromDate(new Date(2023,02,31)); // -> 0
gantt.posFromDate(new Date(2023,03,1));  // -> 74
gantt.posFromDate(new Date(2023,03,2));  // -> 148
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)