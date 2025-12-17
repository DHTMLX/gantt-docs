---
sidebar_label: getMarker
title: getMarker method
description: "获取标记对象"
---

# getMarker

### Description

@short: 获取标记对象

@signature: getMarker: (markerId: string | number) =\> any

### Parameters

- `markerId` - (required) *string | number* -    标记的ID

### Returns
- ` marker` - (object) - 标记的配置对象

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
 该方法属于 **marker** 扩展的一部分，因此请确保已启用 [marker](guides/extensions-list.md) 插件。更多详情请参阅 [添加垂直标记](guides/markers.md) 文章。 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [添加垂直标记](guides/markers.md)

