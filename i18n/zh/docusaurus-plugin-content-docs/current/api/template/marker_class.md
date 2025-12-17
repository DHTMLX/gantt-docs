---
sidebar_label: marker_class
title: marker_class template
description: "定义分配给 markers 的 CSS 类"
---

# marker_class

### Description

@short: 定义分配给 markers 的 CSS 类

@signature: marker_class: (marker: any) =\> void;

### Parameters

- `marker` - (required) *object* - marker 的配置对象

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
- [添加垂直标记](guides/markers.md)
