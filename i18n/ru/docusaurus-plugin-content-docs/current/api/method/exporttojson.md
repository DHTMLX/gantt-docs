---
sidebar_label: exportToJSON
title: exportToJSON method
description: "создаёт JSON-объект, содержащий структуру и данные диаграммы Ганта"
---

# exportToJSON

### Description

@short: Создаёт JSON-объект, содержащий структуру и данные диаграммы Ганта

@signature: exportToJSON: (config?: any) =\> void

### Parameters

- `config` - (optional) *object* - необязательно, объект с конфигурацией Gantt

### Example

~~~jsx
gantt.exportToJSON({
    name:"gantt.json"
});
~~~

### Details

:::note
 Этот метод является частью расширения **export**, поэтому убедитесь, что плагин [export_api](guides/extensions-list.md#exportservice) включён.
 
:::

:::note
 Для версий Gantt ниже 8.0 необходимо добавить **https://export.dhtmlx.com/gantt/api.js** на вашу страницу для использования онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Объект **config** поддерживает следующие опции:

- name - имя файла для экспортируемого JSON-файла
- data - (массив) список задач для экспорта; если не указан, будет экспортирована вся диаграмма Ганта

### Related API
- [exportToMSProject](api/method/exporttomsproject.md)
- [exportToPrimaveraP6](api/method/exporttoprimaverap6.md)
- [exportToExcel](api/method/exporttoexcel.md)
- [exportToICal](api/method/exporttoical.md)
- [exportToPDF](api/method/exporttopdf.md)
- [exportToPNG](api/method/exporttopng.md)
- [importFromExcel](api/method/importfromexcel.md)
- [importFromPrimaveraP6](api/method/importfromprimaverap6.md)
- [importFromMSProject](api/method/importfrommsproject.md)

