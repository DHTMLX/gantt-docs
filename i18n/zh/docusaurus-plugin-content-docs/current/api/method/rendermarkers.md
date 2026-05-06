---
sidebar_label: renderMarkers
title: renderMarkers 方法
description: "更新页面上的所有标记"
---

# renderMarkers

### Description

@short: 更新页面上的所有标记

@signature: renderMarkers: () =\> void

### Example

~~~jsx
var marker1 = gantt.addMarker({ ...});
var marker2 = gantt.addMarker({ ...});
var marker3 = gantt.addMarker({ ...});

gantt.renderMarkers(); /*!*/
~~~

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
此方法在 **marker** 扩展中定义，因此需要启用 [marker](guides/extensions-list.md#vertical-marker) 插件。请在 [Adding Vertical Markers](guides/markers.md) 文章中阅读详细信息。
:::

### Related API
- [updateMarker](api/method/updatemarker.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [添加垂直标记](guides/markers.md)

