---
sidebar_label: dateFromPos
title: dateFromPos 方法
description: "获取图表区域中指定水平位置的日期"
---

# dateFromPos

### Description

@short: 获取图表区域中指定水平位置的日期

@signature: dateFromPos: (pos: number) =\> Date

### Parameters

- `pos` - (必填) *number* - 你想了解日期的相对水平位置

### Returns
- ` date` - (Date) - 指定水平位置在图表区域的日期

### Example

~~~jsx
var date = gantt.dateFromPos(200);
~~~

### Details

:::note
该方法返回当前在 Gantt 图中呈现的日期。如果图表中未呈现日期，则该方法将返回 'null'。
:::

对于上述 Gantt 图，该方法将返回以下内容：

~~~js
gantt.dateFromPos(0); // -> Sun Mar 31 2013 00:00:00
gantt.dateFromPos(74);  // -> Mon Apr 01 2013 01:22:17
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)