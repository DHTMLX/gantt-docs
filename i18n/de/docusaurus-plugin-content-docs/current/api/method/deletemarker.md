---
sidebar_label: deleteMarker
title: deleteMarker Methode
description: "löscht den angegebenen Marker"
---

# deleteMarker

### Description

@short: Löscht den angegebenen Marker

@signature: deleteMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (erforderlich) *string | number* - die Marker-ID

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
- [Heute- und Statuslinien im Gantt (vertikale Marker)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
Diese Methode ist im **Marker**-Erweiterung definiert, daher müssen Sie das [Marker](guides/extensions-list.md#vertical-marker) Plugin aktivieren. Lesen Sie die Details im Artikel [Vertikale Marker hinzufügen](guides/markers.md).
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Vertikale Marker hinzufügen](guides/markers.md)