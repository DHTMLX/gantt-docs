---
sidebar_label: deleteMarker
title: deleteMarker method
description: "удаляет указанный маркер"
---

# deleteMarker

### Description

@short: Удаляет указанный маркер

@signature: deleteMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (required) *string | number* -    идентификатор маркера

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
 Этот метод является частью расширения **marker**, поэтому убедитесь, что плагин [marker](guides/extensions-list.md#verticalmarker) включён. Подробнее об этом можно узнать в статье [Добавление вертикальных маркеров](guides/markers.md). 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Добавление вертикальных маркеров](guides/markers.md)

