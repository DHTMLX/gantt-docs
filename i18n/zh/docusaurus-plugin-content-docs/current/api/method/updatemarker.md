---
sidebar_label: updateMarker
title: updateMarker 方法
description: "更新指定的标记"
---

# updateMarker

### Description

@short: 更新指定的标记

@signature: updateMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (required) *string | number* - 该标记的 ID

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
- [甘特图中的今日线和状态线（垂直标记）](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
此方法在 **marker** 扩展中定义，因此您需要启用 [marker](guides/extensions-list.md#vertical-marker) 插件。请参阅 [添加垂直标记](guides/markers.md) 文章中的详细信息。
:::

### Related API
- [renderMarkers](api/method/rendermarkers.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [添加垂直标记](guides/markers.md)