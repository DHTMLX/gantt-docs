---
sidebar_label: show_markers
title: show_markers config
description: "페이지 내 마커의 가시성을 제어합니다"
---

# show_markers

### Description

@short: 페이지 내 마커의 가시성을 제어합니다

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
 이 옵션은 **marker** 확장 기능의 일부이므로, [marker](guides/extensions-list.md#verticalmarker) 플러그인을 반드시 활성화해야 합니다. 자세한 내용은 [수직 마커 추가하기](guides/markers.md) 문서를 참고하세요. 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)

### Related Guides
- [수직 마커 추가하기](guides/markers.md)

