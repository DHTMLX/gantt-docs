---
sidebar_label: updateMarker
title: updateMarker method
description: "지정된 마커를 업데이트합니다"
---

# updateMarker

### Description

@short: 지정된 마커를 업데이트합니다

@signature: updateMarker: (markerId: string | number) => void

### Parameters

- `markerId` - (필수) *string | number* - 마커의 ID

### Example

~~~jsx
var todayMarker = gantt.addMarker({
    start_date: new Date(),
    css: "today",
    title:date_to_str( new Date())
});
gantt.getMarker(todayMarker).css = "today_new";
gantt.updateMarker(todayMarker); /*!*/
~~~

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
이 메서드는 **marker** 확장에 정의되어 있으므로 [marker](guides/extensions-list.md#vertical-marker) 플러그인을 활성화해야 합니다. 자세한 내용은 [Adding Vertical Markers](guides/markers.md) 문서를 참조하십시오.
:::

### Related API
- [renderMarkers](api/method/rendermarkers.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [수직 마커 추가하기](guides/markers.md)

