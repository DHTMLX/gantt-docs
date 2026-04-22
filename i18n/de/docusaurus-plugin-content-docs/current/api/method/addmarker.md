---
sidebar_label: addMarker
title: addMarker-Methode
description: "fügt einen Marker zum Timeline-Bereich hinzu"
---

# addMarker

### Description

@short: Fügt einen Marker zum Timeline-Bereich hinzu

@signature: addMarker: (marker: MarkerConfig) =\> number | string

### Parameters

- `marker` - (erforderlich) *MarkerConfig* - das Konfigurationsobjekt des Markers

### Returns
- `markerId` - (number|string) - optional, die Marker-ID

### Example

~~~jsx
const dateToString = gantt.date.date_to_str(gantt.config.task_date);
const markerId = gantt.addMarker({
    start_date: new Date(),
    css: "today",
    title: dateToString(new Date())
});

setInterval(() => {
    const marker = gantt.getMarker(markerId);
    marker.start_date = new Date();
    marker.title = dateToString(marker.start_date);
    gantt.updateMarker(markerId);
}, 1000 * 60);
~~~

### Related samples
- [Heute- und Statuszeilen im Gantt (vertikale Marker)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
Diese Methode ist in der **Marker**-Erweiterung definiert, daher müssen Sie das Marker-Plugin aktivieren. Lesen Sie die Details im Artikel [Vertikale Marker hinzufügen](guides/markers.md).
:::

Das Konfigurationsobjekt hat die folgenden Eigenschaften:

- **id?** - (*string | number*) - die Marker-ID
- **start_date** - (*Date*) - ein Date-Objekt, das das Startdatum des Markers festlegt
- **end_date?** - (*Date*) - ein Date-Objekt, das das Enddatum des Markers festlegt
- **css?** - (*string*) - eine CSS-Klasse, die dem Marker zugewiesen wird
- **text?** - (*string | number*) - der Marker-Titel
- **title?** - (*string | number*) - der Marker-Tooltip

### Related API
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Vertikale Marker hinzufügen](guides/markers.md)