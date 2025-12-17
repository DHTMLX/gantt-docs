---
sidebar_label: updateMarker
title: updateMarker method
description: "aktualisiert den angegebenen Marker"
---

# updateMarker

### Description

@short: Aktualisiert den angegebenen Marker

@signature: updateMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (required) *string | number* -    die ID des Markers

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
 Diese Methode gehört zur **marker**-Erweiterung, daher stellen Sie sicher, dass das [marker](guides/extensions-list.md#verticalmarker) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Hinzufügen von vertikalen Markierungen"](guides/markers.md). 
:::

### Related API
- [renderMarkers](api/method/rendermarkers.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- ["Hinzufügen von vertikalen Markierungen"](guides/markers.md)

