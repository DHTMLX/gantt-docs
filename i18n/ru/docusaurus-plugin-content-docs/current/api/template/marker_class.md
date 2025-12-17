---
sidebar_label: marker_class
title: marker_class template
description: "определяет CSS класс, назначаемый маркерам"
---

# marker_class

### Description

@short: Определяет CSS класс, назначаемый маркерам

@signature: marker_class: (marker: any) =\> void;

### Parameters

- `marker` - (required) *object* - объект конфигурации для маркера

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
- [Добавление вертикальных маркеров](guides/markers.md#stylingmarkers)
