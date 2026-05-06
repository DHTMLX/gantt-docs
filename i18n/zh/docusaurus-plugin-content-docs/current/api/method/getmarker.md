---
sidebar_label: getMarker
title: getMarker 方法
description: "获取标记对象"
---

# getMarker

### Description

@short: 获取标记对象

@signature: getMarker: (markerId: string | number) =\> any

### Parameters

- `markerId` - (required) *string | number* - 标记的 ID

### Returns
- `marker` - (object) - 标记的配置对象

### Example

~~~jsx
const todayMarker = gantt.addMarker({
    start_date: new Date(),
    css: "today",
    text:"Now"
    title:date_to_str( new Date())
});
gantt.getMarker(todayMarker); //->{css:"today", text:"Now", id:...}
~~~ 

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
本方法在 **marker** 扩展中定义，因此需要启用 [marker](guides/extensions-list.md#vertical-marker) 插件。请在 [Adding Vertical Markers](guides/markers.md) 文章中阅读详细信息。
 :::

### Related API
- [addMarker](api/method/addmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Adding Vertical Markers](guides/markers.md)