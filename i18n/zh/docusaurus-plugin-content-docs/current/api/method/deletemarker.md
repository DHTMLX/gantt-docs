---
sidebar_label: deleteMarker
title: deleteMarker 方法
description: "删除指定的标记"
---

# deleteMarker

### Description

@short: 删除指定的标记

@signature: deleteMarker: (markerId: string | number) => void

### Parameters

- `markerId` - (必需) *string | number* - 标记的 ID

### Example

~~~jsx
const todayMarker = gantt.addMarker({
    start_date: new Date(),
    css: "today",
    title:date_to_str( new Date())
});
gantt.deleteMarker(todayMarker);/*!*/
~~~

### Related samples
- [今天和状态线在 Gantt 中（竖向标记）](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
此方法在 **marker** 扩展中定义，因此您需要启用 [marker](guides/extensions-list.md#vertical-marker) 插件。请在 [添加垂直标记](guides/markers.md) 文章中了解详细信息。
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [添加垂直标记](guides/markers.md)