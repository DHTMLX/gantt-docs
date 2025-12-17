---
sidebar_label: deleteMarker
title: deleteMarker method
description: "entfernt den angegebenen Marker"
---

# deleteMarker

### Description

@short: Entfernt den angegebenen Marker

@signature: deleteMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (required) *string | number* -     die ID des Markers

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
 Diese Methode ist Teil der **marker**-Erweiterung, daher stellen Sie sicher, dass das [marker](guides/extensions-list.md#verticalmarker) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Hinzufügen von vertikalen Markierungen"](guides/markers.md). 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- ["Hinzufügen von vertikalen Markierungen"](guides/markers.md)

