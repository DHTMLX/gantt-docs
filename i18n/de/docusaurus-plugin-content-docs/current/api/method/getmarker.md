---
sidebar_label: getMarker
title: getMarker method
description: "Ruft das Marker-Objekt ab"
---

# getMarker

### Description

@short: Ruft das Marker-Objekt ab

@signature: getMarker: (markerId: string | number) =\> any

### Parameters

- `markerId` - (required) *string | number* -    die ID des Markers

### Returns
- ` marker` - (object) - das Konfigurationsobjekt des Markers

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
note Diese Methode ist Teil der **marker**-Erweiterung, daher stellen Sie sicher, dass das [marker](guides/extensions-list.md#verticalmarker) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Hinzufügen von vertikalen Markierungen"](guides/markers.md). 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- ["Hinzufügen von vertikalen Markierungen"](guides/markers.md)

