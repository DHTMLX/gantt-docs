---
sidebar_label: exportToExcel
title: exportToExcel метод
description: "Экспортирует данные диаграммы Ганта в документ Excel"
---

# exportToExcel

### Description

@short: Экспортирует данные диаграммы Ганта в документ Excel

@signature: exportToExcel: (_export_?: any) => void

### Parameters

- `export` - object - optional, объект с настройками экспорта (см. детали)

### Example

~~~jsx
gantt.exportToExcel({
    name: "document.xlsx", 
    columns:[
        { id: "text",  header: "Title", width: 150 },
        { id: "start_date",  header: "Start date", width: 250, type: "date" }
    ],
    server: "https://myapp.com/myexport/gantt",
    callback: (res) => {
        alert(res.url);
    },
    visual: true,
    cellColors: true,
    data: { },
    date_format: "dddd d, mmmm yyyy"
});
~~~

### Details

:::note
Этот метод определяется в расширении **export**, поэтому необходимо активировать плагин [export_api](guides/extensions-list.md#export-service).
Подробнее в статье [](guides/excel.md).
:::

:::note
Если вы используете версию Gantt ниже 8.0, на вашей странице нужно подключить `https://export.dhtmlx.com/gantt/api.js`, чтобы включить онлайн-сервис экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

The **exportToExcel()** метод принимает в качестве параметра объект, у которого несколько свойств (все свойства являются необязательными):

- **name** - (*string*) устанавливает имя выходного файла с расширением '.xlsx' 
- **columns** - (*array*) позволяет настроить столбцы выходного Excel-листа. Свойства объектов столбца:
    - **'id'** - (*string,number*) свойство события, которое будет сопоставлено столбцу
    - **'header'** - (*string*) заголовок столбца
    - **'width'** - (*number*) ширина столбца в пикселях
    - **'type'** - (*string*) тип столбца
- **server** - (*string*) задаёт API-ендпойнт для запроса. Можно использовать с локальной установкой сервиса экспорта. Значение по умолчанию: `https://export.dhtmlx.com/gantt`
- **callback** - (*function*) если вы хотите получить url для загрузки сгенерированного XLSX-файла, можно использовать свойство callback. Оно принимает JSON-объект с полем url
- **visual** - (*boolean*) добавляет timeline диаграмму к экспортируемому Excel-документу; по умолчанию — *false*. Узнайте, как добавить цвета задач к экспортированному файлу, в guides/excel.md#adding-colors-of-tasks-to-export
- **cellColors** - (*boolean*) если значение равно *true*, ячейки экспортированного документа будут иметь цвета, определённые в шаблоне [](api/template/timeline_cell_class.md); будут экспортированы свойства *color* и *background-color*
- **data** - (*object*) задаёт пользовательский источник данных, который будет представлен в итоговой диаграмме Ганта
- **date_format** - (*string*) задаёт формат отображения даты в экспортируемом Excel-документе. Можно использовать следующий код формата:

~~~css
table.my_table {
    width: 70%;
    padding: 0 20px;
}
table.my_table tr td {
    text-align: left;
    vertical-align: middle;
    width: 35%;
    border-bottom: 1px solid grey;
}
table.my_table td.version_info {
    text-align: left;
    font-weight: bold;
}
~~~

Format codeOutput:

<table class="my_table">
<tr><td class="version_info">Format code</td><td class="version_info">Output</td></tr>
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


#### Default date parameters

Модуль экспорта ожидает, что столбцы **start_date** и **end_date** имеют тип *Date*, а столбец **duration** имеет тип *number*. 

В случае применения [кастомных шаблонов](guides/specifying-columns.md#datamappingandtemplates) необходимо либо вернуть значение ожидаемого типа, либо определить другое значение в свойстве **name** конфигурации столбца. Например:

~~~jsx {7,10-12}
gantt.config.columns = [
    ...
    { name: "start_date", align: "center", width: 100, resize: true, 
        editor: start_dateEditor },
    { name: "end_date", align: "center", width: 100, resize: true, 
        editor: end_dateEditor },
    { name: "duration_formatted", 
        align: "center", width: 40, resize: true, 
        editor: durationEditor, 
        template: (task) => { 
            return formatter.format(task.duration_formatted); 
        }
    },
    ...
];
~~~

Иначе данные Gantt не будут экспортированы. [Посмотреть соответствующий пример](https://snippet.dhtmlx.com/q1lhyvt3).

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

- [Export/Import for Excel, Экспорт в iCal](guides/excel.md)