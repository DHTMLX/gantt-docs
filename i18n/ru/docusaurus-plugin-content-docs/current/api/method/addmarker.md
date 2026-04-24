--- 
sidebar_label: addMarker
title: addMarker method
description: "добавляет маркер на область временной шкалы"
---

# addMarker

### Description

@short: добавляет маркер на область временной шкалы

@signature: addMarker: (marker: MarkerConfig) =\> number | string

### Parameters

- `marker` - (required) *MarkerConfig* - конфигурационный объект маркера

### Returns
- `markerId` - (number|string) - необязательный идентификатор маркера

### Пример

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

### Связанные примеры
- [Сегодня и линии статуса в Gantt (вертикальные маркеры)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

### Подробности

:::note
Этот метод определяется в расширении **marker**, поэтому необходимо включить плагин [marker](guides/extensions-list.md#vertical-marker). Подробности см. в статье [Добавление вертикальных маркеров](guides/markers.md).
:::

Объект конфигурации имеет следующие свойства:

- **id?** - (*string | number*) - идентификатор маркера
- **start_date** - (*Date*) - Date-объект, задающий начальную дату маркера
- **end_date?** - (*Date*) - Date-объект, задающий конечную дату маркера
- **css?** - (*string*) - CSS-класс, применяемый к маркеру
- **text?** - (*string | number*) - заголовок маркера
- **title?** - (*string | number*) - tooltip маркера

### Связанные API
- [getMarker](api/method/getmarker.md)
- [updateMarker](api/method/updatemarker.md)
- [renderMarkers](api/method/rendermarkers.md)
- [deleteMarker](api/method/deletemarker.md)
- [show_markers](api/config/show_markers.md)

### Связанные руководства
- [Добавление вертикальных маркеров](guides/markers.md)