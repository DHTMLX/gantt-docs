---
sidebar_label: getMarker
title: getMarker method
description: "gets the marker's object"
---

# getMarker

### Description

@short: Gets the marker's object

@signature: getMarker: (markerId: string | number) =\> any

### Parameters

- `markerId` - (required) *string | number* -    the marker's id

### Returns
- ` marker` - (object) - the marker's configuration object

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
This method is defined in the **marker** extension, so you need to enable the [marker](guides/extensions-list.md#vertical-marker) plugin. Read the details in the [Adding Vertical Markers](guides/markers.md) article. 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Adding Vertical Markers](guides/markers.md)

