---
sidebar_label: dateFromPos
title: dateFromPos method
description: "获取图表区域内给定水平位置对应的日期"
---

# dateFromPos

### Description

@short: 获取图表区域内给定水平位置对应的日期

@signature: dateFromPos: (pos: number) =\> Date

### Parameters

- `pos` - (required) *number* - 要查找日期的相对水平位置

### Returns
- ` date` - (Date) - 与图表区域中指定水平位置匹配的日期

### Example

~~~jsx
var date = gantt.dateFromPos(200);
~~~

### Details

:::note

此方法返回当前在甘特图中可见的日期。如果指定位置的日期未显示在图表中，则返回 'null'。
 
:::

![gantt_localized](/img/gantt_localized.png)

例如，对于上图所示的甘特图，该方法将返回以下结果:

~~~js
gantt.dateFromPos(0); // -> Sun Mar 31 2013 00:00:00
gantt.dateFromPos(74);  // -> Mon Apr 01 2013 01:22:17
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)

