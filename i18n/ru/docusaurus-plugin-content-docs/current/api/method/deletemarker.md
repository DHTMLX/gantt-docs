---
sidebar_label: deleteMarker
title: deleteMarker метод
description: "удаляет указанный маркер"
---

# deleteMarker

### Description

@short: Удаляет указанный маркер

@signature: deleteMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (required) *string | number* - идентификатор маркера

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
Этот метод определён в расширении **marker**, поэтому нужно включить плагин [marker](guides/extensions-list.md#vertical-marker). Подробности см. в статье [Adding Vertical Markers](guides/markers.md).
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Adding Vertical Markers](guides/markers.md)