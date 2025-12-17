---
sidebar_label: deleteMarker
title: deleteMarker method
description: "지정된 마커를 제거합니다"
---

# deleteMarker

### Description

@short: 지정된 마커를 제거합니다

@signature: deleteMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (required) *string | number* -    마커의 ID

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
 이 메서드는 **marker** 확장의 일부이므로, 반드시 [marker](guides/extensions-list.md#verticalmarker) 플러그인을 활성화해야 합니다. 자세한 내용은 [수직 마커 추가하기](guides/markers.md) 문서에서 확인할 수 있습니다. 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [수직 마커 추가하기](guides/markers.md)

