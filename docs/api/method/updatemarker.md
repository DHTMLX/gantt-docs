---
sidebar_label: updateMarker
title: updateMarker method
description: "updates the specified marker"
---

# updateMarker

### Description

@short: Updates the specified marker

@signature: updateMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (required) *string | number* -    the marker's id

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
This method is defined in the **marker** extension, so you need to enable the [marker](guides/extensions-list.md#vertical-marker) plugin. Read the details in the [Adding Vertical Markers](guides/markers.md) article. 
:::

### Related API
- [renderMarkers](api/method/rendermarkers.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Adding Vertical Markers](guides/markers.md)

