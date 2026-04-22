---
sidebar_label: show_markers
title: show_markers 配置
description: "显示/隐藏页面上的标记"
---

# show_markers

### Description

@short: 显示/隐藏页面上的标记

@signature: show_markers: boolean

### Example

~~~jsx
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false; // 隐藏所有3个标记
~~~

**默认值：** true

### Related samples
- [Gantt 中的 Today 和 Status 线（垂直标记）](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
此选项在 **marker** 扩展中定义，因此您需要启用 [marker](guides/extensions-list.md#vertical-marker) 插件。请在 [添加垂直标记](guides/markers.md) 文章中阅读详细信息。
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)

### Related Guides
- [添加垂直标记](guides/markers.md)