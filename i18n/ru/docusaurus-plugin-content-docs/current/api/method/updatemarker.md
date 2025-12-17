---
sidebar_label: updateMarker
title: updateMarker method
description: "обновляет указанный маркер"
---

# updateMarker

### Description

@short: Обновляет указанный маркер

@signature: updateMarker: (markerId: string | number) =\> void

### Parameters

- `markerId` - (required) *string | number* -    идентификатор маркера

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
 Этот метод принадлежит расширению **marker**, поэтому убедитесь, что плагин [marker](guides/extensions-list.md#verticalmarker) включён. Более подробная информация доступна в статье [Добавление вертикальных маркеров](guides/markers.md). 
:::

### Related API
- [renderMarkers](api/method/rendermarkers.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Добавление вертикальных маркеров](guides/markers.md)

