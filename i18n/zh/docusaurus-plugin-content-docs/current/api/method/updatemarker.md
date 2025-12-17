---
sidebar_label: updateMarker
title: updateMarker method
description: "刷新指定的 marker"
---

# updateMarker

### Description

@short: 刷新指定的 marker

@signature: updateMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (required) *string | number* -    marker 的 ID

### Example

~~~jsx
var todayMarker = gantt.addMarker({
    start_date: new Date(),
    css: "today",
    title:date_to_str( new Date())
});
gantt.getMarker(todayMarker).css = "today_new";
gantt.updateMarker(todayMarker); /*!*/
~~~

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
 该方法属于 **marker** 扩展，因此请确保已启用 [marker](guides/extensions-list.md) 插件。更多信息请参见 [添加垂直标记](guides/markers.md) 文章。 
:::

### Related API
- [renderMarkers](api/method/rendermarkers.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [添加垂直标记](guides/markers.md)

