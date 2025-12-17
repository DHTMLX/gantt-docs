---
sidebar_label: renderMarkers
title: renderMarkers method
description: "刷新页面上显示的所有标记"
---

# renderMarkers

### Description

@short: 刷新页面上显示的所有标记

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
 该方法是 **marker** 扩展的一部分，请确保已启用 [marker](guides/extensions-list.md) 插件。更多信息请参考 [添加垂直标记](guides/markers.md) 文章。 
:::

### Related API
- [updateMarker](api/method/updatemarker.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [添加垂直标记](guides/markers.md)

