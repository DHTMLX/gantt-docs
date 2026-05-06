---
sidebar_label: getMarker
title: getMarker-Methode
description: "Gibt das Marker-Objekt zurück"
---

# getMarker

### Description

@short: Gibt das Marker-Objekt zurück

@signature: getMarker: (markerId: string | number) =\> any

### Parameters

- `markerId` - (erforderlich) *string | number* -    die Marker-ID

### Returns
- ` marker` - (object) - das Marker-Konfigurationsobjekt

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
Diese Methode ist in der **Marker-Erweiterung** definiert, daher müssen Sie das [marker](guides/extensions-list.md#vertical-marker) Plugin aktivieren. Lesen Sie die Details im Artikel [Adding Vertical Markers](guides/markers.md). 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Adding Vertical Markers](guides/markers.md)