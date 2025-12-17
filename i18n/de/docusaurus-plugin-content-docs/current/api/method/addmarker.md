---
sidebar_label: addMarker
title: addMarker method
description: "fügt einen Marker zum Timeline-Bereich hinzu"
---

# addMarker

### Description

@short: Fügt einen Marker zum Timeline-Bereich hinzu

@signature: addMarker: (marker: MarkerConfig) =\> number | string

### Parameters

- `marker` - (required) *MarkerConfig* - die Konfigurationsobjekt des Markers

### Returns
- `markerId` - (number|string) - optionale ID des Markers

### Example

~~~jsx
var todayMarker = gantt.addMarker({
    start_date: new Date(),
    css: "today",
    title:date_to_str( new Date())
});
setInterval(function(){
    var today = gantt.getMarker(todayMarker);
    today.start_date = new Date();
    today.title = date_to_str(today.start_date);
    gantt.updateMarker(todayMarker);
}, 1000*60);
~~~

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
 Diese Methode ist Teil der **marker** Erweiterung, daher stellen Sie sicher, dass das [marker](guides/extensions-list.md#verticalmarker) Plugin aktiviert ist. Für weitere Details lesen Sie den Artikel ["Hinzufügen von vertikalen Markierungen"](guides/markers.md). 
:::


Das Konfigurationsobjekt enthält die folgenden Eigenschaften:

- **id?** - (*string | number*) - die ID des Markers
- **start_date** - (*Date*) - das Date-Objekt, das den Startzeitpunkt des Markers angibt
- **end_date?** - (*Date*) - das Date-Objekt, das den Endzeitpunkt des Markers angibt
- **css?** - (*string*) - CSS-Klasse zur Gestaltung des Markers
- **text?** - (*string | number*) - der Titeltext des Markers
- **title?** - (*string | number*) - Tooltip-Text für den Marker

### Related API
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- ["Hinzufügen von vertikalen Markierungen"](guides/markers.md)

