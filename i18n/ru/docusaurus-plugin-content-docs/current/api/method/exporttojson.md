---
sidebar_label: exportToJSON
title: exportToJSON метод
description: "экспортирует структуру и данные диаграммы Ганта в JSON-объект"
---

# exportToJSON

### Description

@short: Экспортирует структуру и данные диаграммы Ганта в JSON-объект

@signature: exportToJSON: (config?: any) =\> void

### Parameters

- `config` - object	 - необязательный, объект с настройками Gantt

### Example

~~~jsx
gantt.exportToJSON({
    name:"gantt.json"
});
~~~

### Details

:::note
Этот метод определён в расширении **export**, поэтому вам нужно активировать плагин [export_api](guides/extensions-list.md#export-service).
 :::

:::note
Примечание: Если вы используете Gantt версию старше 8.0, вам нужно подключить на страницу `https://export.dhtmlx.com/gantt/api.js` для включения онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
 
:::

Объект **config** может содержать следующие параметры:

- name - имя экспортируемого JSON-файла
- data - (массив) список задач для экспорта. Весь Gantt будет экспортирован, если не указан

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