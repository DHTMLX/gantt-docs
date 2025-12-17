---
sidebar_label: show_markers
title: show_markers config
description: "управляет видимостью маркеров на странице"
---

# show_markers

### Description

@short: Управляет видимостью маркеров на странице

@signature: show_markers: boolean

### Example

~~~jsx
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false; // скрывает все 3 маркера
~~~

**Default value:** true

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
 Эта опция является частью расширения **marker**, поэтому убедитесь, что включен плагин [marker](guides/extensions-list.md#verticalmarker). Подробнее можно узнать в статье [Добавление вертикальных маркеров](guides/markers.md). 
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)

### Related Guides
- [Добавление вертикальных маркеров](guides/markers.md)

