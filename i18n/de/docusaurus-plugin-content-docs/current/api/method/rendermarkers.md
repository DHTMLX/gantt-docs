---
sidebar_label: renderMarkers
title: renderMarkers Methode
description: "Aktualisiert alle Marker auf der Seite"
---

# renderMarkers

### Description

@short: Aktualisiert alle Marker auf der Seite

@signature: renderMarkers: () =\> void

### Example

~~~jsx
var marker1 = gantt.addMarker({ ...});
var marker2 = gantt.addMarker({ ...});
var marker3 = gantt.addMarker({ ...});

gantt.renderMarkers(); /*!*/
~~~

### Related samples
- [Heute- und Statuszeilen im Gantt (vertikale Marker)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
Diese Methode ist in der **marker** Erweiterung definiert, daher muss das [marker](guides/extensions-list.md#vertical-marker) Plugin aktiviert werden. Lesen Sie die Details im Artikel [Vertikale Marker hinzufügen](guides/markers.md).
:::

### Related API
- [updateMarker](api/method/updatemarker.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Vertikale Marker hinzufügen](guides/markers.md)