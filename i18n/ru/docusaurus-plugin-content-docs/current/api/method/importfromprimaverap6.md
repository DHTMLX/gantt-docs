---
sidebar_label: importFromPrimaveraP6
title: importFromPrimaveraP6 method
description: "конвертирует XML или XER Primavera P6 файл в JSON"
---

# importFromPrimaveraP6

### Description

@short: Конвертирует XML или XER файл Primavera P6 в JSON

@signature: importFromPrimaveraP6: (config: any) =\> void

### Parameters

- `config` - (required) *object* - объект с конфигурационными свойствами импортированного файла

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

### Details

:::note
Требуется поддержка HTML5 File API.
:::

:::note
Этот метод определяется в расширении **export**, поэтому вам нужно активировать плагин [export_api](guides/extensions-list.md#export-service). Подробности смотрите в статье [Export/Import for Excel, Export to iCal](guides/excel.md#importfromexcel).
:::

:::note
Если у вас версия Gantt старше 8.0, необходимо подключить на страницу файл **https://export.dhtmlx.com/gantt/api.js**, чтобы включить онлайн-сервис экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

Метод принимает в качестве параметра объект с конфигурационными свойствами импортированного файла:

- **data** - экземпляр [File](https://developer.mozilla.org/en-US/docs/Web/API/File), который должен содержать либо XER, либо XML-файл проекта.
- **callback** - функция обратного вызова.
- **durationUnit** - устанавливает единицу продолжительности (("minute", "hour", "day", "week", "month", "year")).
- **projectProperties** - задаёт массив свойств проекта, которые должны быть включены в ответ.
- **taskProperties** - задаёт массив дополнительных свойств задач для импорта.

См. подробные описания настроек импорта в соответствующем разделе guides/export-primavera.md#import-settings.

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

- **data** - (*object*) объект данных gantt [data object](guides/supported-data-formats.md). У задачи есть следующие свойства: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Даты приводятся к строковому представлению в формате "%Y-%m-%d %H:%i".
- **config** - (*object*) объект [configuration](api/overview/properties-overview.md) для gantt с настройками, полученными из файла проекта.
- **resources** - (*array*) массив объектов (каждый имеет следующие свойства: \{*id: string, name: string, type: string, calendar: string*\}) представляющих список ресурсов из файла проекта.
- **worktime** - (*object*) объект, содержащий настройки рабочего времени из календаря проекта. Он может содержать следующие атрибуты:
    - **id** - (*string | number*) необязательный идентификатор календаря
    - **hours** - (*array*) массив глобальных рабочих часов, устанавливает начальные и конечные часы задачи
    - **dates** - (*array*) массив дат, который может содержать:
        - 7 дней недели (от 0 - Воскресенье, до 6 - Суббота), где 1/true обозначает рабочий день, а 0/false — нерабочий день
        - другие записи — даты
- **calendars** - (*array*) массив, содержащий конфигурационные объекты календаря для создания нового календаря.
    - **calendarConfig** - (*object*) конфигурационный объект календаря, который может содержать следующие атрибуты:
      - **id** - (*string | number*) необязательный идентификатор календаря
      - **name** - (*string*) имя календаря
      - **hours** - (*array*) массив глобальных рабочих часов, устанавливает начальные и конечные часы задачи
      - **dates** - (*array*) массив дат, который может содержать:
            - 7 дней недели (от 0 - Воскресенье, до 6 - Суббота), где 1/true обозначает рабочий день и 0/false — нерабочий день
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
- [importFromExcel](api/method/importfromexcel.md)

### Related Guides
- [Export and Import from Primavera P6](guides/export-primavera.md#import-from-primavera-p6)