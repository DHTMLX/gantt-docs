---
sidebar_label: addMarker
title: addMarker method
description: "добавляет маркер в область timeline"
---

# addMarker

### Description

@short: Добавляет маркер в область timeline

@signature: addMarker: (marker: MarkerConfig) =\> number | string

### Parameters

- `marker` - (required) *MarkerConfig* - объект конфигурации маркера

### Returns
- `markerId` - (number|string) - опционально, id маркера

### Example

~~~jsx
var todayMarker = gantt.addMarker({
    start_date: new Date(),
    css: "today",
    title:date_to_str( new Date())
});
setInterval(function(){
    var today = gantt.getMarker(todayMarker);
    today.start_date = new Date();
    today.title = date_to_str(today.start_date);
    gantt.updateMarker(todayMarker);
}, 1000*60);
~~~

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
 Этот метод является частью расширения **marker**, поэтому убедитесь, что включили плагин [marker](guides/extensions-list.md#verticalmarker). Для подробностей смотрите статью [Добавление вертикальных маркеров](guides/markers.md). 
:::


Объект конфигурации содержит следующие свойства:

- **id?** - (*string | number*) - id маркера
- **start_date** - (*Date*) - объект Date, указывающий дату начала маркера
- **end_date?** - (*Date*) - объект Date, указывающий дату окончания маркера
- **css?** - (*string*) - CSS класс для стилизации маркера
- **text?** - (*string | number*) - заголовок маркера
- **title?** - (*string | number*) - текст tooltip для маркера

### Related API
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Добавление вертикальных маркеров](guides/markers.md)

