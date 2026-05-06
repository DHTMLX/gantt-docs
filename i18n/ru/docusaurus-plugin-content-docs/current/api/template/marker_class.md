---
sidebar_label: marker_class
title: marker_class шаблон
description: "определяет CSS класс, который будет применяться к маркерам"
---

# marker_class

### Description

@short: Определяет CSS класс, который будет применяться к маркерам

@signature: marker_class: (marker: any) => void;

### Parameters

- `marker` - (required) *object* - объект конфигурации маркера

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
- [Добавление вертикальных маркеров](guides/markers.md#styling-markers)