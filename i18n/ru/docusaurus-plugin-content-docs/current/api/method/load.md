---
sidebar_label: load
title: load method
description: "Загружает данные в Gantt chart из внешнего источника."
---

# load

### Description

@short: Загружает данные в Gantt chart из внешнего источника.

@signature: load: (url: string, type?: string, callback?: GanttCallback) =\> any

### Parameters

- `url` - (required) *string* - URL на сервере (это может быть статический файл или серверный скрипт, возвращающий данные).
- `type` - (optional) *string* - <i>('json', 'xml', 'oldxml')</i> Формат данных. По умолчанию <i>'json'</i>.
- `callback` - (optional) *function* - Функция, которая будет вызвана после завершения загрузки.

### Returns
- ` resultPromise` - (object) - Промис, который разрешается после завершения AJAX-запроса.

### Example

~~~jsx
gantt.load("/data",function(){
    gantt.message("всё готово");
});
//или
gantt.load("/data").then(function(xhr){
    gantt.message("всё готово");
});
//или
gantt.load("data.json"); //загрузка данных в формате JSON
//или
gantt.load("data.xml","xml"); //загрузка данных в формате XML (версия 2.0+)
//или
gantt.load("data.xml","xml", function(){ //передача callback-функции
    alert("Данные успешно загружены");
});
~~~

### Related samples
- [Backend storage using REST API](https://docs.dhtmlx.com/gantt/samples/01_initialization/04_save_rest.html)
- [Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)

### Details

Этот метод вызывает события [onLoadStart](api/event/onloadstart.md) и [onLoadEnd](api/event/onloadend.md).

:::note

Учтите, что этот метод не поддерживается в версии Gantt для Node.js.
 
:::

### Related API
- [parse](api/method/parse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)
- [onAjaxError](api/event/onajaxerror.md)

### Related Guides
- [Поддерживаемые форматы данных](guides/supported-data-formats.md)
- [Загрузка данных](guides/loading.md)
- [Интеграция с серверной стороной](guides/server-side.md)
- [Динамическая загрузка (по требованию)](guides/dynamic-loading.md)

