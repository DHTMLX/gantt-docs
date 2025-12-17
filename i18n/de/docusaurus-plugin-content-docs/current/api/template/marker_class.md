---
sidebar_label: marker_class
title: marker_class template
description: "definiert die CSS-Klasse, die Markern zugewiesen wird"
---

# marker_class

### Description

@short: Definiert die CSS-Klasse, die Markern zugewiesen wird

@signature: marker_class: (marker: any) =\> void;

### Parameters

- `marker` - (required) *object* - Das Konfigurationsobjekt für den Marker

### Example

~~~jsx
var showAdvancedMarkers;
gantt.templates.marker_class = function(marker){
    if (showAdvancedMarkers) {
        return "advanced_marker";
    }
    return "hidden";
}
~~~

### Related Guides
- ["Hinzufügen von vertikalen Markierungen"](guides/markers.md#stylingmarkers)
