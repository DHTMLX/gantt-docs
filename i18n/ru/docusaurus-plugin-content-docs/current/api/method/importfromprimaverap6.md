---
sidebar_label: importFromPrimaveraP6
title: importFromPrimaveraP6 method
description: "конвертирует XML или XER файл Primavera P6 в формат JSON"
---

# importFromPrimaveraP6

### Description

@short: Конвертирует XML или XER файл Primavera P6 в формат JSON

@signature: importFromPrimaveraP6: (config: any) =\> void

### Parameters

- `config` - (required) *object* - объект, содержащий параметры конфигурации для импортируемого файла

### Example

~~~jsx
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            gantt.clearAll();
            if (project.config.duration_unit) {
                gantt.config.duration_unit = project.config.duration_unit;
            }                    
            gantt.parse(project.data);
        }
     }
});
~~~

### Related samples
- [Import Primavera P6 file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_primaverap6.html)

### Details

:::note
 Метод требует поддержки HTML5 File API. 
:::

:::note
 Этот метод является частью расширения **export**, поэтому плагин [export_api](guides/extensions-list.md#exportservice) должен быть включен. Подробнее можно узнать в статье [Экспорт и импорт из Primavera P6](guides/export-primavera.md#importfromprimaverap6). 
:::

:::note
 Для версий Gantt ниже 8.0 необходимо подключить **https://export.dhtmlx.com/gantt/api.js** на вашей странице для включения онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Метод принимает объект с параметрами конфигурации для импортируемого файла:

- **data** - экземпляр [File](https://developer.mozilla.org/en-US/docs/Web/API/File), содержащий файл проекта в формате XER или XML.
- **callback** - функция, вызываемая после завершения импорта.
- **durationUnit** - задает ожидаемую единицу измерения длительности ("minute", "hour", "day", "week", "month", "year").
- **projectProperties** - массив свойств проекта, которые нужно включить в ответ.
- **taskProperties** - массив дополнительных свойств задач для импорта.

## Response

Ответ будет JSON-объектом со следующей структурой:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {}
}
~~~

- **data** - объект данных gantt [data object](guides/supported-data-formats.md#json), в котором каждая задача содержит свойства, такие как *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Даты представлены строками в формате "%Y-%m-%d %H:%i".
- **config** - объект [конфигурации](api/overview/properties-overview.md) gantt с настройками, извлеченными из файла проекта.
- **resources** - массив объектов, представляющих ресурсы из файла проекта, каждый содержит *id*, *name* и *type*.
- **worktime** - объект с настройками рабочего времени из календаря проекта.

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Экспорт и импорт из Primavera P6](guides/export-primavera.md#importfromprimaverap6)

