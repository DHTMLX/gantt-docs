---
sidebar_label: updateMarker
title: updateMarker method
description: "Aktualisiert den angegebenen Marker"
---

# updateMarker

### Description

@short: Aktualisiert den angegebenen Marker

@signature: updateMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (erforderlich) *string | number* - die ID des Markers

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
Diese Methode ist in der **Marker**-Erweiterung definiert, daher müssen Sie das Marker-Plugin aktivieren. Lesen Sie die Details im Artikel [Adding Vertical Markers](guides/markers.md). 
:::

### Related API
- [renderMarkers](api/method/rendermarkers.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Adding Vertical Markers](guides/markers.md)