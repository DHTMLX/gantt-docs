---
sidebar_label: marker_class
title: marker_class template
description: "specifies the CSS class that will be applied to markers"
---

# marker_class

### Description

@short: Specifies the CSS class that will be applied to markers

@signature: marker_class: (marker: any) =\> void;

### Parameters

- `marker` - (required) *object* - the marker's configuration object

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
- [Adding Vertical Markers](guides/markers.md#styling-markers)
