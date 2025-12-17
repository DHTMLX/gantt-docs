---
sidebar_label: importFromExcel
title: importFromExcel method
description: "преобразует Excel-файл в формат JSON"
---

# importFromExcel

### Description

@short: Преобразует Excel-файл в формат JSON

@signature: importFromExcel: (config: any) =\> void

### Parameters

- `config` - (required) *object* - объект с настройками конфигурации для импортируемого файла

### Example

~~~jsx
gantt.importFromExcel({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
        console.log(project)
    }
});
~~~

### Related samples
- [Import Excel file](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)

### Details

:::note
 Этот метод требует поддержки HTML5 File API. 
:::

:::note
 Этот метод является частью расширения **export**, поэтому необходимо включить плагин [export_api](guides/extensions-list.md#exportservice). Подробнее об этом можно прочитать в статье [Экспорт/Импорт в Excel, экспорт в iCal](guides/excel.md#importfromexcel).

 
:::

:::note
 Для версий Gantt ниже 8.0 нужно добавить на страницу **https://export.dhtmlx.com/gantt/api.js** для использования онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Метод принимает объект с опциями конфигурации для импортируемого файла:

- **server** - указывает API-эндпоинт для запроса. Может использоваться с локально установленным сервисом импорта. По умолчанию **https://export.dhtmlx.com/gantt**.
- **data** - экземпляр [File](https://developer.mozilla.org/en-US/docs/Web/API/File), содержащий Excel-файл (xlsx). 
- **callback** - функция, которая вызывается после завершения импорта.
- **sheet** - индекс листа в документе, который будет обрабатываться сервисом импорта.

## Ответ

Ответ возвращает JSON, содержащий массив объектов:

~~~js
[
   { "Name": "Task Name", "Start": "2018-08-11 10:00", "Duration": 8 },
   ...
]
~~~

Подробности:

- Значения первой строки используются как имена свойств для импортируемых объектов.
- Каждая последующая строка преобразуется в отдельный объект.
- Даты форматируются как "%Y-%m-%d %H:%i".

### Related API
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Экспорт/Импорт в Excel, экспорт в iCal](guides/excel.md#importfromexcel)

