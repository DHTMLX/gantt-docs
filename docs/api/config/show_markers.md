---
sidebar_label: show_markers
title: show_markers config
description: "shows/hides markers on the page"
---

# show_markers

### Description

@short: Shows/hides markers on the page

@signature: show_markers: boolean

### Example

~~~jsx
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false;// hides all 3 markers
~~~

**Default value:** true

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
This option is defined in the **marker** extension, so you need to enable the [marker](guides/extensions-list.md#vertical-marker) plugin. Read the details in the [Adding Vertical Markers](guides/markers.md) article. 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)

### Related Guides
- [Adding Vertical Markers](guides/markers.md)

