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
    raw: true,
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

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

Метод **exportToExcel()** принимает в качестве параметра объект с несколькими свойствами (все свойства необязательные):

| Property | Description |
| --- | --- |
| **name** | (*string*) задаёт имя выходного файла с расширением '.xlsx' |
| **columns** | (*array*) позволяет настроить столбцы выходного Excel-листа. Свойства объектов столбца:<ul><li><b>'id'</b> - (<i>string,number</i>) свойство события, которое будет сопоставлено столбцу</li><li><b>'header'</b> - (<i>string</i>) заголовок столбца</li><li><b>'width'</b> - (<i>number</i>) ширина столбца в пикселях</li><li><b>'type'</b> - (<i>string</i>) тип столбца</li></ul> |
| **server** | (*string*) задаёт API-ендпойнт для запроса. Можно использовать с локальной установкой сервиса экспорта. Значение по умолчанию: `https://export.dhtmlx.com/gantt` |
| **raw** | (*boolean*) определяет способ экспорта данных Gantt. Выполняет две задачи:<ul><li>если задача отфильтрована через событие [`onBeforeTaskDisplay`](api/event/onbeforetaskdisplay.md), т.е. не отображается ни в гриде, ни в timeline, она не экспортируется в файл Excel (по умолчанию экспортируются все задачи). <br/> **Related sample**: [Gantt. Export filtered data to PDF, Excel, and MSProject files](https://snippet.dhtmlx.com/twfy116w)</li><li>если столбец [скрыт](guides/specifying-columns.md#visibility) с помощью настройки `hide:true`, он не экспортируется в файл Excel (по умолчанию экспортируются все столбцы). <br/> **Related sample**: [Gantt. Export to Excel. Hide grid columns with the raw mode](https://snippet.dhtmlx.com/b7y0ps8m)</li></ul> По умолчанию — *false*. [Подробнее](guides/excel.md#exporting-filtered-tasks-and-hidden-columns) |
| **callback** | (*function*) если вы хотите получить url для загрузки сгенерированного XLSX-файла, можно использовать свойство callback. Оно принимает JSON-объект с полем url |
| **visual** | (*boolean*) добавляет timeline диаграмму к экспортируемому Excel-документу; по умолчанию — *false*. Узнайте, [как добавить цвета задач](guides/excel.md#adding-colors-of-tasks-to-export) к экспортированному файлу |
| **cellColors** | (*boolean*) если значение равно *true*, ячейки экспортированного документа будут иметь цвета, определённые в шаблоне [](api/template/timeline_cell_class.md); будут экспортированы свойства *color* и *background-color* |
| **data** | (*object*) задаёт пользовательский источник данных, который будет представлен в итоговой диаграмме Ганта |
| **date_format** | (*string*) задаёт формат отображения даты в экспортируемом Excel-документе. Можно использовать следующий код формата: |

<div class="auto-width-table">

| Format code           | Output              |
| --------------------- | ------------------- |
| d                     | 9                   |
| dd                    | 09                  |
| ddd                   | Mon                 |
| dddd                  | Monday              |
| mm                    | 01                  |
| mmm                   | Jan                 |
| mmmm                  | January             |
| mmmmm                 | J                   |
| yy                    | 12                  |
| yyyy                  | 2021                |
| mm/dd/yyyy            | 01/09/2021          |
| m/d/y                 | 1/9/21              |
| ddd, mmm d            | Mon, Jan 9          |
| mm/dd/yyyy h:mm AM/PM | 01/09/2021 6:20 PM  |
| dd/mm/yyyy hh:mm:ss   | 09/01/2012 16:20:00 |

</div>


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

- [Экспорт и импорт для Excel](guides/excel.md)