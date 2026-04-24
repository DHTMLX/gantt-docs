---
sidebar_label: addMarker
title: addMarker method
description: "타임라인 영역에 마커를 추가합니다"
---

# addMarker

### Description

@short: 타임라인 영역에 마커를 추가합니다

@signature: addMarker: (marker: MarkerConfig) => number | string

### Parameters

- `marker` - (required) *MarkerConfig* - 마커의 구성 객체

### Returns
- `markerId` - (number|string) - 선택적, 마커의 ID

### Example

~~~jsx
const dateToString = gantt.date.date_to_str(gantt.config.task_date);
const markerId = gantt.addMarker({
    start_date: new Date(),
    css: "today",
    title: dateToString(new Date())
});

setInterval(() => {
    const marker = gantt.getMarker(markerId);
    marker.start_date = new Date();
    marker.title = dateToString(marker.start_date);
    gantt.updateMarker(markerId);
}, 1000 * 60);
~~~

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
 이 메서드는 **marker** 확장의 일부이므로, [marker](guides/extensions-list.md#verticalmarker) 플러그인을 활성화해야 합니다. 자세한 내용은 [수직 마커 추가하기](guides/markers.md) 문서를 참고하세요. 
:::


구성 객체는 다음 속성을 포함합니다:

- **id?** - (*string | number*) - 마커의 ID
- **start_date** - (*Date*) - 마커의 시작 날짜를 설정하는 Date 객체
- **end_date?** - (*Date*) - 마커의 종료 날짜를 설정하는 Date 객체
- **css?** - (*string*) - 마커에 적용되는 CSS 클래스
- **text?** - (*string | number*) - 마커 제목
- **title?** - (*string | number*) - 마커의 툴팁

### Related API
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [수직 마커 추가하기](guides/markers.md)

