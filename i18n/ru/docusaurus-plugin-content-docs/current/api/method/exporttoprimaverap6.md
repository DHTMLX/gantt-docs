---
sidebar_label: exportToPrimaveraP6
title: exportToPrimaveraP6 method
description: "экспортирует данные из Gantt chart в Primavera P6"
---

# exportToPrimaveraP6

### Description

@short: Экспортирует данные из Gantt chart в Primavera P6

@signature: exportToPrimaveraP6: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - необязательно, объект с настройками экспорта (подробнее см. ниже)

### Example

~~~jsx
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

### Related samples
- [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)

### Details

:::note
 Этот метод является частью расширения **export**, поэтому убедитесь, что плагин [export_api](guides/extensions-list.md#exportservice) включен. Подробнее смотрите в статье [Export and Import from Primavera P6](guides/export-primavera.md#exporttoprimaverap6).
 
:::

:::note
 Для версий Gantt старше 8.0 необходимо подключить **https://export.dhtmlx.com/gantt/api.js** на вашей странице для использования онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::


Метод **exportToPrimaveraP6()** принимает объект с несколькими необязательными свойствами:

- **name** - (*string*) имя файла для экспортируемого файла (по умолчанию 'gantt.xml').
- **auto_scheduling** - (boolean) определяет режим планирования задач в экспортируемом проекте. Значение **true** помечает задачи как с авто-планированием, **false** - как с ручным планированием (по умолчанию).
- **skip_circular_links** - (boolean) указывает, нужно ли удалять циклические связи. **true** удаляет их (по умолчанию), **false** сохраняет.
- **project** - (object) позволяет задать кастомные свойства для экспортируемого объекта проекта.
- **tasks** - (object) позволяет задать кастомные свойства для экспортируемых задач.
- **data** - (object) даёт возможность указать собственный источник данных для выводимого Gantt chart. Свойства **start_date** и **end_date** должны быть в формате, включающем дату и время (*%d-%m-%Y %H:%i*).
- **callback** - (function) если нужно получить URL для скачивания сгенерированного XML файла, можно использовать этот параметр. В функцию передаётся JSON объект с полем *url*.
- **resources** - (array) позволяет экспортировать список ресурсов в файл Primavera P6.
- **server** - (string) задаёт API endpoint для запроса экспорта. Используется, если у вас локальная установка сервиса экспорта. По умолчанию **https://export.dhtmlx.com/gantt**.

## Response

Ответ возвращает JSON объект со структурой:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {}
}
~~~

- **data** - объект данных gantt [data object](guides/supported-data-formats.md#json). Каждая задача содержит свойства *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Даты представлены строками в формате "%Y-%m-%d %H:%i".
- **config** - объект конфигурации gantt [configuration](api/overview/properties-overview.md), содержащий настройки, извлечённые из файла проекта.
- **resources** - массив объектов ресурсов из файла проекта, каждый с полями *id*, *name*, *type*.
- **worktime** - объект с настройками рабочего времени из календаря проекта.

### Related API
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Экспорт и импорт из Primavera P6](guides/export-primavera.md#exporttoprimaverap6)

