---
sidebar_label: marker_class
title: marker_class template
description: "마커에 적용될 CSS 클래스 지정"
---

# marker_class

### Description

@short: 마커에 적용될 CSS 클래스를 지정합니다

@signature: marker_class: (marker: any) => void;

### Parameters

- `marker` - (필수) *object* - 마커의 구성 객체

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