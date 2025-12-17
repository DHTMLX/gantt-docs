---
sidebar_label: show_markers
title: show_markers config
description: "Steuert die Sichtbarkeit der Marker auf der Seite"
---

# show_markers

### Description

@short: Steuert die Sichtbarkeit der Marker auf der Seite

@signature: show_markers: boolean

### Example

~~~jsx
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false; // blendet alle 3 Marker aus
~~~

**Default value:** true

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
 Diese Option ist Teil der **marker**-Erweiterung, daher stellen Sie sicher, dass das [marker](guides/extensions-list.md#verticalmarker) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Hinzufügen von vertikalen Markierungen"](guides/markers.md). 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)

### Related Guides
- ["Hinzufügen von vertikalen Markierungen"](guides/markers.md)

