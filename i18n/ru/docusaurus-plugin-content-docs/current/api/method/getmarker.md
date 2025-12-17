---
sidebar_label: getMarker
title: getMarker method
description: "получает объект маркера"
---

# getMarker

### Description

@short: Получает объект маркера

@signature: getMarker: (markerId: string | number) =\> any

### Parameters

- `markerId` - (required) *string | number* -    идентификатор маркера

### Returns
- ` marker` - (object) - объект конфигурации маркера

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
 Этот метод является частью расширения **marker**, поэтому убедитесь, что плагин [marker](guides/extensions-list.md#verticalmarker) включен. Подробнее можно узнать в статье [Добавление вертикальных маркеров](guides/markers.md). 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Добавление вертикальных маркеров](guides/markers.md)

