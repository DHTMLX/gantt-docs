---
sidebar_label: getLayoutView
title: getLayoutView method
description: "通过名称获取布局视图对象"
---

# getLayoutView

### Description

@short: 通过名称获取布局视图对象

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

此方法用于访问布局视图对象，从而可以使用多个实用方法，包括:

- [dateFromPos](api/method/datefrompos.md) - 获取视图中对应特定水平位置的日期
- [posFromDate](api/method/posfromdate.md) - 查找视图中给定日期对应的相对水平位置
- [getScale](api/method/getscale.md) - 获取视图时间刻度的配置信息

若需将视图移动到特定位置，可使用 [scrollLayoutCell](api/method/scrolllayoutcell.md) 方法。

:::note
Sample: [用于获取布局单元视图并滚动的公共方法](https://snippet.dhtmlx.com/0v4mmoxu) 
:::

### Related Guides
- [Gantt 布局](guides/layout-config.md)

