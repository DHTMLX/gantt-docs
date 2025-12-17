---
sidebar_label: posFromDate
title: posFromDate method
description: "获取图表区域内指定日期的相对水平位置"
---

# posFromDate

### Description

@short: 获取图表区域内指定日期的相对水平位置

@signature: posFromDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - 需要获取位置的日期

### Returns
- ` position` - (number) - 指定日期在时间轴上的x坐标（以像素为单位）

### Example

~~~jsx
gantt.posFromDate(new Date());
~~~

### Details

:::note

此方法返回当前甘特图中显示日期的位置。如果该日期未在图表中显示，则返回 'null'。
 
:::

![gantt_localized](/img/gantt_localized.png)

对于上图所示的甘特图，该方法返回如下结果:

~~~js
gantt.posFromDate(new Date(2023,02,31)); // -> 0
gantt.posFromDate(new Date(2023,03,1));  // -> 74
gantt.posFromDate(new Date(2023,03,2));  // -> 148
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)

