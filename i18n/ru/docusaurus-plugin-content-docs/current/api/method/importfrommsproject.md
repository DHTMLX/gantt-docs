---
sidebar_label: importFromMSProject
title: importFromMSProject method
description: "конвертирует файл MS Project в формате XML или MPP в JSON"
---

# importFromMSProject

### Description

@short: Конвертирует файл MS Project в формате XML или MPP в JSON

@signature: importFromMSProject: (config: any) =\> void

### Parameters

- `config` - (required) *object* - объект, содержащий настройки конфигурации для импортируемого файла

### Example

~~~jsx
gantt.importFromMSProject({
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
- [Import MS Project file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_mpp.html)

### Details

:::note
 Этот метод требует поддержки HTML5 File API. 
:::

:::note
 Этот метод является частью расширения **export**, поэтому убедитесь, что плагин [export_api](guides/extensions-list.md#exportservice) включен. Подробнее можно узнать в статье [Экспорт и импорт из MS Project](guides/export-msproject.md#importfrommsproject).

 
:::

:::note
 Для версий Gantt ниже 8.0 подключите скрипт **https://export.dhtmlx.com/gantt/api.js** на вашей странице для активации онлайн сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Метод принимает объект с параметрами конфигурации для импортируемого файла:

- **data** - экземпляр [File](https://developer.mozilla.org/en-US/docs/Web/API/File), содержащий проектный файл в формате MPP или XML.
- **callback** - функция, вызываемая после завершения импорта.
- **durationUnit** - указывает ожидаемую единицу измерения длительности ("minute", "hour", "day", "week", "month", "year").
- **projectProperties** - массив, перечисляющий свойства проекта, которые нужно включить в ответ.
- **taskProperties** - массив, перечисляющий дополнительные свойства задач для импорта.

## Response

Ответ возвращает JSON-объект со следующей структурой:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {}
}
~~~

- **data** - объект данных gantt [data object](guides/supported-data-formats.md#json). Каждая задача содержит свойства, такие как *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Даты представлены в виде строк в формате "%Y-%m-%d %H:%i".
- **config** - объект конфигурации gantt [configuration](api/overview/properties-overview.md), содержащий настройки, извлечённые из файла проекта.
- **resources** - массив объектов, представляющих ресурсы из файла проекта, каждый с такими свойствами: \{*id:string, name:string, type:string*\}.
- **worktime** - объект, содержащий настройки рабочего времени из календаря проекта.

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)

### Related Guides
- [Экспорт и импорт из MS Project](guides/export-msproject.md#importfrommsproject)

