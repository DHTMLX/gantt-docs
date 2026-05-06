---
sidebar_label: exportToMSProject
title: exportToMSProject method
description: "экспортирует данные диаграммы Ганта в MS Project"
---

# exportToMSProject

### Description

@short: Экспортирует данные диаграммы Ганта в MS Project

@signature: exportToMSProject: (_export_?: any) =\> void

### Parameters

- `export` - объект - необязательный, объект с настройками экспорта (см. подробности)

### Example

~~~jsx
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

### Details

:::note
Этот метод определяется в расширении **export**, поэтому необходимо активировать плагин [export_api](guides/extensions-list.md#export-service). Подробнее см. в статье [Export and Import from MS Project](guides/export-msproject.md#export-to-ms-project).
:::

:::note
Примечание: Если вы используете Gantt версию старше 8.0, необходимо подключить на страницу `https://export.dhtmlx.com/gantt/api.js` для включения онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Метод **exportToMSProject()** принимает в качестве параметра объект, содержащий набор свойств (все свойства необязательны):

- **name** - (*string*) имя полученного файла ('gantt.xml' по умолчанию).
- **auto_scheduling** - (*boolean*) указывает режим планирования задач в экспортируемом проекте. true пометит задачи как автоматически запланированные, false — как вручную запланированные (состояние по умолчанию).
- **skip_circular_links** - (*boolean*) указывает, будут ли удаляться циклические связи или нет (true - будут удалены (режим по умолчанию), false - не будут удалены).
- **project** - (*object*) позволяет задать пользовательские свойства экспортируемого объекта проекта.
- **tasks** - (*object*) позволяет задать пользовательские свойства экспортируемых задач.
- **data** - (*object*) позволяет задать пользовательский источник данных, который будет представлен на выходной диаграмме Ганта. Ожидается, что свойства **start_date** и **end_date** будут указаны в формате, включающем дату и время (*%d-%m-%Y %H:%i*).
- **callback** - (*function*) если вы хотите получить URL для загрузки сгенерированного XML, можно использовать свойство *callback*. Оно возвращает JSON-объект с свойством *url*.
- **resources** - (*array*) позволяет экспортировать список ресурсов в файл MS Project. Если используются календари ресурсов, необходимо указать -1 для задачи в свойстве *CalendarUID* во время экспорта (в объекте **tasks**). Затем задача будет использовать календарь ресурса.
- **server** - (*string*) API-эндпойнт запроса. Может использоваться с локальной установкой сервиса экспорта. Значение по умолчанию: `https://export.dhtmlx.com/gantt`.

Проверьте подробные описания настроек экспорта в соответствующем разделе [Export settings](guides/export-msproject.md#export-settings).

### Связанные API
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [exportToJSON](api/method/exporttojson.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

### Связанные руководства
- [Export and Import from MS Project](guides/export-msproject.md#export-to-ms-project)