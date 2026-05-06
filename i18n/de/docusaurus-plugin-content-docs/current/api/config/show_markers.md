---
sidebar_label: show_markers
title: show_markers Konfiguration
description: "Marker auf der Seite anzeigen/ausblenden"
---

# show_markers

### Description

@short: Zeigt/Versteckt Marker auf der Seite

@signature: show_markers: boolean

### Example

~~~jsx
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false; // blendet alle 3 Marker aus
~~~

**Standardwert:** true

### Related samples
- [Heute- und Statuslinien im Gantt (vertikale Marker)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
Diese Option ist in der **Marker-Erweiterung** definiert, daher müssen Sie das [marker](guides/extensions-list.md#vertical-marker) Plugin aktivieren. Lesen Sie die Details im Artikel [Vertikale Marker hinzufügen](guides/markers.md). 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)

### Related Guides
- [Vertikale Marker hinzufügen](guides/markers.md)