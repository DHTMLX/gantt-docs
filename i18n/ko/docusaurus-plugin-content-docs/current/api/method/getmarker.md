---
sidebar_label: getMarker
title: getMarker method
description: "마커의 객체를 가져옵니다"
---

# getMarker

### Description

@short: 마커의 객체를 가져옵니다

@signature: getMarker: (markerId: string | number) =\> any

### Parameters

- `markerId` - (required) *string | number* -    마커의 ID

### Returns
- ` marker` - (object) - 마커의 설정 객체

### Example

~~~jsx
const todayMarker = gantt.addMarker({
    start_date: new Date(),
    css: "today",
    text:"Now"
    title:date_to_str( new Date())
});
gantt.getMarker(todayMarker); //->{css:"today", text:"Now", id:...}
~~~

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
note 이 메서드는 **marker** 확장 기능의 일부이므로, [marker](guides/extensions-list.md#verticalmarker) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [수직 마커 추가하기](guides/markers.md) 문서를 참고하시기 바랍니다. 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [수직 마커 추가하기](guides/markers.md)

