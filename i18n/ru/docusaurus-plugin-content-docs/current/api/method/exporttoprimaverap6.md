---
sidebar_label: exportToPrimaveraP6
title: exportToPrimaveraP6 метод
description: "экспортирует данные из диаграммы Ганта в Primavera P6"
---

# exportToPrimaveraP6

### Description

@short: Экспортирует данные из диаграммы Ганта в Primavera P6

@signature: exportToPrimaveraP6: (_export_?: any) =\> void

### Parameters

- `export` - object - optional, объект с настройками экспорта (см. подробности)

### Example

~~~jsx
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

### Related Samples
- [Экспорт данных: MS Project, PrimaveraP6, Excel и iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)

### Details

:::note
Этот метод определяется в расширении **export**, поэтому необходимо активировать плагин [export_api](guides/extensions-list.md#export-service). Подробности см. в статье [Экспорт и импорт из Primavera P6](guides/export-primavera.md#exporttoprimaverap6).
 
:::

:::note
Если версия Gantt ниже 8.0, вам нужно подключить `https://export.dhtmlx.com/gantt/api.js` на вашей странице, чтобы включить онлайн-сервис экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~

:::

Метод **exportToPrimaveraP6()** принимает в качестве параметра объект с набором свойств (все свойства являются необязательными):

- **name** - (*string*) имя получаемого файла ('gantt.xml' по умолчанию).
- **auto_scheduling** - (*boolean*) указывает режим планирования задач в экспортируемом проекте. Значение **true** пометит задачи как автоматически запланированные, **false** — как вручную запланированные (значение по умолчанию).
- **skip_circular_links** - (*boolean*) указывает, следует ли удалять циклические связи или нет (true — будут удалены (режим по умолчанию), false — не будут удалены).
- **project** - (*object*) позволяет задать пользовательские свойства экспортируемого элемента проекта.
- **tasks** - (*object*) позволяет задать пользовательские свойства экспортируемых задач.
- **data** - (*object*) позволяет задать пользовательский источник данных, который будет представлен в выходной диаграмме Ганта. Ожидается, что свойства **start_date** и **end_date** будут указаны в формате, включающем дату и время (*%d-%m-%Y %H:%i*).
- **callback** - (*function*) если вы хотите получить URL для загрузки сгенерированного XML, можно использовать свойство *callback*. Функция получает JSON-объект с свойством *url*.
- **resources** - (*array*) позволяет экспортировать список ресурсов в файл Primavera P6. Если используются календари ресурсов, в процессе экспорта в свойстве **CalendarUID** задачи (в объекте **tasks**) необходимо указать -1. Тогда задача будет использовать календарь ресурса.
- **server** - (*string*) конечная точка API для запроса. Можно использовать с локальной установкой сервиса экспорта. Значение по умолчанию: `https://export.dhtmlx.com/gantt`.

Проверьте подробное описание настроек экспорта в [соответствующем разделе](guides/export-primavera.md#export-settings).

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