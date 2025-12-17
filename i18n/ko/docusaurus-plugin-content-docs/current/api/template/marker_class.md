---
sidebar_label: marker_class
title: marker_class template
description: "마커에 할당되는 CSS 클래스를 정의합니다."
---

# marker_class

### Description

@short: 마커에 할당되는 CSS 클래스를 정의합니다.

@signature: marker_class: (marker: any) =\> void;

### Parameters

- `marker` - (required) *object* - 마커의 구성 객체

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
- [수직 마커 추가하기](guides/markers.md#stylingmarkers)
