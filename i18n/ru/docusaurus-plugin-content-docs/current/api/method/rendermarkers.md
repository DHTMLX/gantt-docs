---
sidebar_label: renderMarkers
title: renderMarkers метод
description: "обновляет все маркеры на странице"
---

# renderMarkers

### Description

@short: Обновляет все маркеры на странице

@signature: renderMarkers: () =\> void

### Example

~~~jsx
var marker1 = gantt.addMarker({ ...});
var marker2 = gantt.addMarker({ ...});
var marker3 = gantt.addMarker({ ...});

gantt.renderMarkers(); /*!*/
~~~

### Related samples
- [Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Details

:::note
Этот метод определён в расширении **marker**, поэтому необходимо включить плагин [marker](guides/extensions-list.md#vertical-marker). Подробности см. в статье [Добавление вертикальных маркеров](guides/markers.md).
:::

### Related API
- [updateMarker](api/method/updatemarker.md)
- [addMarker](api/method/addmarker.md)
- [getMarker](api/method/getmarker.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Related Guides
- [Добавление вертикальных маркеров](guides/markers.md)