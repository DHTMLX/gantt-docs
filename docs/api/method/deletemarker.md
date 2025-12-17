---
sidebar_label: deleteMarker
title: deleteMarker method
description: "deletes the specified marker"
---

# deleteMarker

### Description

@short: Deletes the specified marker

@signature: deleteMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (required) *string | number* -    the marker's id

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
This method is defined in the **marker** extension, so you need to enable the [marker](guides/extensions-list.md#vertical-marker) plugin. Read the details in the [Adding Vertical Markers](guides/markers.md) article. 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Adding Vertical Markers](guides/markers.md)

