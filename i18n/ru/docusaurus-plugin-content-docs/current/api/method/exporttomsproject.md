---
sidebar_label: exportToMSProject
title: exportToMSProject method
description: "экспортирует данные из Ганта в MS Project"
---

# exportToMSProject

### Description

@short: Экспортирует данные из Ганта в MS Project

@signature: exportToMSProject: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - опционально, объект с настройками экспорта (см. детали)

### Example

~~~jsx
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

### Details

:::note
 Этот метод является частью расширения **export**, поэтому убедитесь, что включен плагин [export_api](guides/extensions-list.md#exportservice). Дополнительная информация доступна в статье [Экспорт и импорт из MS Project](guides/export-msproject.md#exporttomsproject).
 
:::

:::note
 Для версий Gantt ранее 8.0 необходимо подключить скрипт **https://export.dhtmlx.com/gantt/api.js** на вашей странице для активации онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::


Метод **exportToMSProject()** принимает объект с несколькими опциональными свойствами:

- **name** - (*string*) имя файла для экспортируемого файла (по умолчанию 'gantt.xml').
- **auto_scheduling** - (boolean) задаёт режим планирования задач в экспортируемом проекте. Значение **true** помечает задачи как авто-планируемые, **false** - как планируемые вручную (по умолчанию).
- **skip_circular_links** - (boolean) определяет, следует ли удалять циклические связи. **true** (по умолчанию) удаляет их, **false** сохраняет.
- **project** - (object) позволяет добавить пользовательские свойства к экспортируемому объекту проекта.
- **tasks** - (object) позволяет добавить пользовательские свойства к экспортируемым задачам.
- **data** - (object) позволяет указать пользовательский источник данных для выходного Ганта. Свойства **start_date** и **end_date** должны быть в формате дата и время (*%d-%m-%Y %H:%i*).
- **callback** - (function) предоставляет способ получить URL для скачивания сгенерированного XML. Коллбэк получает JSON объект с полем *url*.
- **resources** - (array) позволяет экспортировать список ресурсов в файл MS Project.
- **server** - (string) указывает API endpoint для запроса экспорта, полезно при использовании локального сервиса экспорта. По умолчанию **https://export.dhtmlx.com/gantt**.

## Ответ

Ответ возвращает JSON объект со структурой:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {}
}
~~~

- **data** - объект данных gantt [data object](guides/supported-data-formats.md#json). Каждая задача включает: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Даты в формате "%Y-%m-%d %H:%i".
- **config** - объект [configuration](api/overview/properties-overview.md) gantt с настройками из файла проекта.
- **resources** - массив объектов ресурсов, каждый со свойствами: \{*id: string, name:string, type:string*\}, представляющих ресурсы из файла проекта.
- **worktime** - объект с настройками рабочего времени из календаря проекта.

### Related API
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Related Guides
- [Экспорт и импорт из MS Project](guides/export-msproject.md#exporttomsproject)

