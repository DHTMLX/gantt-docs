---
sidebar_label: renderMarkers
title: renderMarkers method
description: "Aktualisiert alle auf der Seite angezeigten Marker"
---

# renderMarkers

### Description

@short: Aktualisiert alle auf der Seite angezeigten Marker

@signature: renderMarkers: () =\> void

### Example

~~~jsx
var marker1 = gantt.addMarker({ ...});
var marker2 = gantt.addMarker({ ...});
var marker3 = gantt.addMarker({ ...});

gantt.renderMarkers(); /*!*/
~~~

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
 Diese Methode ist Teil der **marker**-Extension. Stellen Sie daher sicher, dass das [marker](guides/extensions-list.md#verticalmarker) Plugin aktiviert ist. Für weitere Informationen lesen Sie den Artikel ["Hinzufügen von vertikalen Markierungen"](guides/markers.md). 
:::

### Related API
- [updateMarker](api/method/updatemarker.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- ["Hinzufügen von vertikalen Markierungen"](guides/markers.md)

