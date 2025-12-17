---
sidebar_label: show_markers
title: show_markers config
description: "控制页面上标记的可见性"
---

# show_markers

### Description

@short: 控制页面上标记的可见性

@signature: show_markers: boolean

### Example

~~~jsx
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false; // 隐藏所有3个标记
~~~

**Default value:** true

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
 此选项是 **marker** 扩展的一部分，因此请确保启用 [marker](guides/extensions-list.md) 插件。更多详情请参见 [添加垂直标记](guides/markers.md) 文章。 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)

### Related Guides
- [添加垂直标记](guides/markers.md)

