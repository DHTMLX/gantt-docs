---
sidebar_label: deleteMarker
title: deleteMarker method
description: "删除指定的 marker"
---

# deleteMarker

### Description

@short: 删除指定的 marker

@signature: deleteMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (required) *string | number* -    要删除的 marker 的 ID

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
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
 此方法属于 **marker** 扩展，因此请确保已启用 [marker](guides/extensions-list.md) 插件。更多详情请参阅 [添加垂直标记](guides/markers.md) 文章。 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [添加垂直标记](guides/markers.md)

