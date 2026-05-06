---
sidebar_label: renderMarkers
title: renderMarkers 메서드
description: "페이지의 모든 마커를 업데이트합니다"
---

# renderMarkers

### Description

@short: 페이지의 모든 마커를 업데이트합니다

@signature: renderMarkers: () =\> void

### Example

~~~jsx
var marker1 = gantt.addMarker({ ...});
var marker2 = gantt.addMarker({ ...});
var marker3 = gantt.addMarker({ ...});

gantt.renderMarkers(); /*!*/
~~~

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
이 메서드는 **marker** 확장에 정의되어 있으므로 [marker](guides/extensions-list.md#vertical-marker) 플러그인을 활성화해야 합니다. 자세한 내용은 [Adding Vertical Markers](guides/markers.md) 문서를 참조하세요.
:::

### Related API
- [updateMarker](api/method/updatemarker.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [수직 마커 추가하기](guides/markers.md)

