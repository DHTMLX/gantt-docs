---
sidebar_label: exportToICal
title: exportToICal method
description: "экспортирует данные из Gantt chart в строку формата iCal"
---

# exportToICal

### Description

@short: Экспортирует данные из Gantt chart в строку формата iCal

@signature: exportToICal: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - необязательно, объект с настройками экспорта (подробнее ниже)

### Example

~~~jsx
gantt.exportToICal({
    server:"https://myapp.com/myexport/gantt"
});
~~~

### Details

:::note
 Этот метод является частью расширения **export**, поэтому необходимо включить плагин [export_api](guides/extensions-list.md#exportservice). Подробнее об этом можно узнать в статье [Экспорт/Импорт в Excel, экспорт в iCal](guides/excel.md).

 
:::


Метод **exportToICal()** принимает необязательный объект с следующими свойствами:

- **server** - (*string*) указывает API endpoint для запроса экспорта. Используется при работе с локально установленным сервисом экспорта. По умолчанию endpoint равен **https://export.dhtmlx.com/gantt**;
- **name** - (*string*) позволяет задать собственное имя файла и расширение, однако файл всё равно будет экспортирован в формате iCal. [Пример можно посмотреть здесь](https://snippet.dhtmlx.com/atbhz9vq).

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Экспорт/Импорт в Excel, экспорт в iCal](guides/excel.md#exporttoical)

