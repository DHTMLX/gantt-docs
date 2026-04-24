---
sidebar_label: deleteMarker
title: deleteMarker 메서드
description: "지정된 마커를 삭제합니다"
---

# deleteMarker

### Description

@short: 지정된 마커를 삭제합니다

@signature: deleteMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (required) *string | number* - 마커의 ID

### Example

~~~jsx
const todayMarker = gantt.addMarker({
    start_date: new Date(),
    css: "today",
    title:date_to_str( new Date())
});
gantt.deleteMarker(todayMarker);/*!*/
~~~

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
이 메서드는 **marker** 확장에 정의되어 있으므로 [marker](guides/extensions-list.md#vertical-marker) 플러그인을 활성화해야 합니다. 자세한 내용은 [Adding Vertical Markers](guides/markers.md) 문서를 참조하십시오.
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [수직 마커 추가하기](guides/markers.md)

