---
sidebar_label: renderMarkers
title: renderMarkers method
description: "페이지에 표시된 모든 마커를 새로 고칩니다"
---

# renderMarkers

### Description

@short: 페이지에 표시된 모든 마커를 새로 고칩니다

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
 이 메서드는 **marker** 확장의 일부이므로, [marker](guides/extensions-list.md#verticalmarker) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [수직 마커 추가하기](guides/markers.md) 문서를 참고하시기 바랍니다. 
:::

### Related API
- [updateMarker](api/method/updatemarker.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [수직 마커 추가하기](guides/markers.md)

