---
sidebar_label: show_markers
title: show_markers 설정
description: "페이지에서 마커를 표시하거나 숨깁니다."
---

# show_markers

### Description

@short: 페이지에서 마커를 표시하거나 숨깁니다

@signature: show_markers: boolean

### Example

~~~jsx
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false; // 3개의 마커 모두 숨김
~~~

**Default value:** true

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
이 옵션은 **marker** 확장에 정의되어 있으므로 [marker](guides/extensions-list.md#vertical-marker) 플러그인을 활성화해야 합니다. [Adding Vertical Markers](guides/markers.md) 문서를 참고하여 세부 정보를 확인하세요.
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)

### Related Guides
- [수직 마커 추가하기](guides/markers.md)

