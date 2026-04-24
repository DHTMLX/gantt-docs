---
sidebar_label: importFromMSProject
title: Метод importFromMSProject
description: "преобразует XML- или MPP-файл MS Project в JSON"
---

# importFromMSProject

### Description

@short: Преобразует XML- или MPP MS Project файл в JSON

@signature: importFromMSProject: (config: any) => void

### Parameters

- `config` - (обязателен) *object* - объект с настройками импортированного файла

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

### Details

:::note
Метод требует поддержки HTML5 File API.
:::

:::note
Этот метод определён в расширении **export**, поэтому необходимо активировать плагин [export_api](guides/extensions-list.md#export-service). Подробности смотрите в статье [Export/Import for Excel, Export to iCal](guides/excel.md#importfromexcel).

 
::: 

:::note
Если вы используете версию Gantt старше 8.0, вам нужно включить на страницу файл **https://export.dhtmlx.com/gantt/api.js** для включения онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

Метод принимает в качестве параметра объект с настройками конфигурации импортированного файла:

- **data** - экземпляр [File](https://developer.mozilla.org/en-US/docs/Web/API/File), который должен содержать либо MPP-, либо XML-файл проекта.
- **callback** - функция обратного вызова.
- **durationUnit** - задаёт ожидаемую единицу продолжительности ("minute", "hour", "day", "week", "month", "year").
- **projectProperties** - задаёт массив свойств проекта, которые должны быть включены в ответ.
- **taskProperties** - задаёт массив дополнительных свойств задач, которые будут импортированы.

См. подробные описания настроек импорта в соответствующем разделе [guides/export-msproject.md#import-settings](guides/export-msproject.md#import-settings).

## Response

Ответ будет содержать JSON следующей структуры:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {},
   calendars: []
}
~~~

- **data** - (*object*) объект данных gantt [data object](guides/supported-data-formats.md). Каждая задача имеет следующие свойства: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*.
Даты приводятся к строке в формате "%Y-%m-%d %H:%i".
- **config** - (*object*) объект конфигурации gantt [configuration](api/overview/properties-overview.md) с настройками, полученными из файла проекта.
- **resources** - (*array*) массив объектов (каждый имеет свойства: \{*id: string, name: string, type: string, calendar: string*\}), которые представляют список ресурсов из файла проекта.
- **worktime** - (*object*) объект, содержащий настройки рабочего времени из календаря проекта. Может содержать следующие атрибуты:
    - **id** - (*string | number*) необязателен, идентификатор календаря
    - **hours** - (*array*) массив глобальных рабочих часов, задаёт время начала и окончания задачи
    - **dates** - (*array*) массив дат, который может содержать:
        - 7 дней недели (от 0 - воскресенье до 6 - суббота), где 1/true обозначает рабочий день, а 0/false — нерабочий день
        - другие записи — даты
- **calendars** - (*array*) массив, содержащий конфигурационные объекты календарей для создания нового календаря.
    - **calendarConfig** - (*object*) объект конфигурации календаря, который может содержать следующие атрибуты:
      - **id** - (*string | number*) необязателен, идентификатор календаря
      - **name** - (*string*) имя календаря
      - **hours** - (*array*) массив глобальных рабочих часов, задаёт время начала и окончания задачи
      - **dates** - (*array*) массив дат, который может содержать:
            - 7 дней недели (от 0 - воскресенье до 6 - суббота), где 1/true обозначает рабочий день и 0/false - нерабочий день
            - другие записи — даты

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromMSProject](api/method/importfrommsproject.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)

### Related Guides
- [Export and Import from MS Project](guides/export-msproject.md#import-from-ms-project)