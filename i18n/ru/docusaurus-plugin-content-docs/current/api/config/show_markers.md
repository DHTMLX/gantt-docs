---
sidebar_label: show_markers
title: show_markers config
description: "показывает/скрывает маркеры на странице"
---

# show_markers

### Description

@short: Показывает/скрывает маркеры на странице

@signature: show_markers: boolean

### Example

~~~jsx
var marker1 = gantt.addMarker({ ...}); 
var marker2 = gantt.addMarker({ ...}); 
var marker3 = gantt.addMarker({ ...}); 

gantt.config.show_markers = false;// hides all 3 markers
~~~

**Значение по умолчанию:** true

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
Эта опция определяется в расширении **marker**, поэтому необходимо включить плагин [marker](guides/extensions-list.md#vertical-marker). Подробности см. в статье [Adding Vertical Markers](guides/markers.md).
:::

### Related API
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)

### Related Guides
- [Adding Vertical Markers](guides/markers.md)