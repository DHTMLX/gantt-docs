---
sidebar_label: getLayoutView
title: getLayoutView method
description: "根据名称返回布局视图对象"
---

# getLayoutView

### Description

@short: 根据名称返回布局视图对象

@signature: getLayoutView: (name: string) =\> any

### Parameters

- `name` - (required) *string* - 布局视图的名称

### Returns
- ` view` - (object) - 布局视图对象

### Example

~~~jsx
gantt.getLayoutView("resourceTimeline").posFromDate(new Date(2025, 05, 08));
// 返回 210

gantt.getLayoutView("resourceTimeline").dateFromPos(210);
// 返回 2025年6月8日
~~~

### Details

该方法允许对返回的布局视图对象应用某些方法。这些方法包括：

- [dateFromPos](api/method/datefrompos.md) - 获取视图中指定水平位置的日期
- [posFromDate](api/method/posfromdate.md) - 获取视图中指定日期的相对水平位置
- [getScale](api/method/getscale.md) - 返回该视图的时间刻度配置

要将视图滚动到指定位置，请应用 [scrollLayoutCell](api/method/scrolllayoutcell.md) 方法。

:::note
sample: [公开方法以获取布局单元格视图并对它们进行滚动](https://snippet.dhtmlx.com/0v4mmoxu)
:::

### Related Guides
- [Gantt 布局](guides/layout-config.md)