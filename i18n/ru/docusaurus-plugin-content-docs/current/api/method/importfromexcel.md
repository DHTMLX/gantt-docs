---
sidebar_label: importFromExcel
title: importFromExcel method
description: "преобразует файл Excel в JSON"
---

# importFromExcel

### Description

@short: Преобразует файл Excel в JSON

@signature: importFromExcel: (config: any) =\> void

### Parameters

- `config` - (required) *object* - объект с конфигурационными свойствами импортируемого файла

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
- [Импорт файла Excel](https://docs.dhtmlx.com/gantt/samples/08_api/21_load_from_excel.html)

### Details

:::note
Метод требует поддержки HTML5 File API.
:::

:::note
Этот метод определяется в расширении **export**, поэтому необходимо активировать плагин [export_api](guides/extensions-list.md#export-service). Подробности смотрите в статье [Экспорт/Импорт для Excel, Экспорт в iCal](guides/excel.md#importfromexcel).
:::

:::note
Если вы используете более старую версию Gantt, чем 8.0, вам нужно включить файл **https://export.dhtmlx.com/gantt/api.js** на вашей странице, чтобы включить онлайн-сервис экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

Метод принимает в качестве параметра объект с конфигурационными свойствами импортируемого файла:

- **server** - устанавливает конечную точку API для запроса. Может использоваться с локальной установкой сервиса импорта. Значение по умолчанию: **https://export.dhtmlx.com/gantt**.
- **data** - экземпляр [File](https://developer.mozilla.org/en-US/docs/Web/API/File) который должен содержать файл Excel (xlsx). 
- **callback** - функция обратного вызова.
- **sheet** - номер листа документа, который должен быть возвращён сервисом импорта.

## Response

Ответ будет содержать JSON с массивом объектов:

~~~js
[
   { "Name": "Task Name", "Start": "2018-08-11 10:00", "Duration": 8 },
   ...
]
~~~

где:

- Значения первой строки используются в качестве имен свойств импортируемых объектов.
- Каждая строка сериализуется как отдельный объект.
- Значения дат сериализуются в формате "%Y-%m-%d %H:%i".

### Related API
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Экспорт/Импорт для Excel, Экспорт в iCal](guides/excel.md#importfromexcel)