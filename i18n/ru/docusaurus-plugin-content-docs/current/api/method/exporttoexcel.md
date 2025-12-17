---
sidebar_label: exportToExcel
title: exportToExcel method
description: "экспортирует данные из Gantt chart в файл Excel"
---

# exportToExcel

### Description

@short: Экспортирует данные из Gantt chart в файл Excel

@signature: exportToExcel: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - опционально, объект с настройками экспорта (подробнее ниже)

### Example

~~~jsx
gantt.exportToExcel({
    name:"document.xlsx", 
    columns:[
        { id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250, type:"date" }
    ],
    server:"https://myapp.com/myexport/gantt",
    callback: function(res){
        alert(res.url);
    },
    visual:true,
    cellColors:true,
    date_format: "dddd d, mmmm yyyy"
});
~~~

### Details

:::note
 Этот метод является частью расширения **export**, поэтому убедитесь, что активирован плагин [export_api](guides/extensions-list.md#exportservice).
Более подробная информация доступна в статье [Экспорт/Импорт в Excel, экспорт в iCal](guides/excel.md).

 
:::

:::note
 Для версий Gantt младше 8.0 необходимо подключить скрипт **https://export.dhtmlx.com/gantt/api.js** на вашей странице для активации онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Метод **exportToExcel()** принимает объект с несколькими опциональными свойствами:

- **name** - (*string*) задаёт имя файла для выходного файла, включая расширение '.xlsx' 
- **columns** - (*array*) определяет колонки для создаваемого Excel листа. Каждый объект колонки может содержать:
    - **'id'** - (*string,number*) свойство задачи, которое будет отображено в колонке
    - **'header'** - (*string*) текст заголовка колонки
    - **'width'** - (*number*) ширина колонки в пикселях
    - **'type'** - (*string*) тип данных колонки
- **server** - (*string*) URL API для запроса экспорта. Полезно при использовании локальной установки сервиса экспорта. По умолчанию **https://export.dhtmlx.com/gantt**
- **callback** - (*function*) функция, которая получает URL сгенерированного XLSX файла. В callback передаётся JSON объект с полем url
- **visual** - (*boolean*) включает в экспортированный Excel файл диаграмму timeline; по умолчанию *false*. Подробнее о добавлении цветов задач см. [how to add task colors](guides/excel.md)
- **cellColors** - (*boolean*) если true, ячейки в экспортированном файле будут иметь цвета, определённые шаблоном [timeline_cell_class](api/template/timeline_cell_class.md), экспортируя свойства *color* и *background-color*
- **data** - (*object*) задаёт кастомный источник данных для отображения в итоговом Gantt chart
- **date_format** - (*string*) задаёт формат даты, используемый в экспортированном Excel документе. Поддерживаются следующие коды формата:


<table>
<tr><td>Код формата</td><td>Вывод</td></tr>

<tr><td>d</td><td>9</td></tr>
<tr><td>dd</td><td>09</td></tr>
<tr><td>ddd</td><td>Mon</td></tr>
<tr><td>dddd</td><td>Monday</td></tr>
<tr><td>mm</td><td>01</td></tr>
<tr><td>mmm</td><td>Jan</td></tr>
<tr><td>mmmm</td><td>January</td></tr>
<tr><td>mmmmm</td><td>J</td></tr>
<tr><td>yy</td><td>12</td></tr>
<tr><td>yyyy</td><td>2021</td></tr>
<tr><td>mm/dd/yyyy</td><td>01/09/2021</td></tr>
<tr><td>m/d/y</td><td>1/9/21</td></tr>
<tr><td>ddd, mmm d</td><td>Mon, Jan 9</td></tr>
<tr><td>mm/dd/yyyy h:mm AM/PM</td><td>01/09/2021 6:20 PM</td></tr>
<tr><td>dd/mm/yyyy hh:mm:ss</td><td>09/01/2012 16:20:00</td></tr>
</table>

#### Параметры даты по умолчанию

Модуль Export ожидает, что колонки **start_date** и **end_date** будут иметь тип *Date*, а колонка **duration** - тип *number*. 

При использовании [кастомных шаблонов](guides/specifying-columns.md#datamappingandtemplates) следует либо возвращать значения ожидаемых типов, либо указывать другое свойство в поле **name** конфигурации колонки. Например:

~~~js

gantt.config.columns = [
    ...
    {name: "start_date", align: "center", width: 100, resize: true, 
        editor: start_dateEditor},
    {name: "end_date", align: "center", width: 100, resize: true, 
        editor: end_dateEditor},
    {name: "duration_formatted", /*!*/
        align: "center", width: 40, resize: true, 
        editor: durationEditor, 
        template: function(task){ /*!*/
            return formatter.format(task.duration_formatted); /*!*/
        }
    },
    ...
];
~~~

Иначе данные Gantt не будут корректно экспортированы. [См. соответствующий пример](https://snippet.dhtmlx.com/q1lhyvt3).

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Экспорт/Импорт в Excel, экспорт в iCal](guides/excel.md)

