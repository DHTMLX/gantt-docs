---
sidebar_label: load
title: load method
description: "загружает данные в gantt из внешнего источника данных"
---

# load

### Description

@short: Загружает данные в gantt из внешнего источника данных

@signature: load: (url: string, type?: string, callback?: GanttCallback) => any

### Parameters

- `url` - (required) *string* - серверный URL-адрес (может быть статическим файлом или скриптом на сервере, который выводит данные)
- `type` - (optional) *string*  <i>('json', 'xml', 'oldxml')</i> - тип данных. Значение по умолчанию - <i>'json'</i>
- `callback` - (optional) *function* - функция обратного вызова

### Returns
- ` resultPromise` - (object) - объект Promise, который разрешается после завершения AJAX-запроса

### Example

~~~jsx
gantt.load("/data",function(){
    gantt.message("everything is ready");
});
 //or
 gantt.load("/data").then(function(xhr){
    gantt.message("everything is ready");
 });
 //or
 gantt.load("data.json"); //loading data in the JSON format
 //or
 gantt.load("data.xml","xml"); //loading data in the XML format (version 2.0+)
 //or
 gantt.load("data.xml","xml", function(){ //specifying the callback function 
     alert("Data has been successfully loaded");
 });
~~~

### Related samples
- [Хранение на сервере с использованием REST API](https://docs.dhtmlx.com/gantt/samples/01_initialization/04_save_rest.html)
- [Загрузка подсказок на требование (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)

### Details

The method invokes the [onLoadStart](api/event/onloadstart.md) and [onLoadEnd](api/event/onloadend.md) events.

:::note
Обратите внимание, метод не работает в версии Gantt для Node.js.
:::

### Related API
- [parse](api/method/parse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)
- [onAjaxError](api/event/onajaxerror.md)

### Related Guides
- [Поддерживаемые форматы данных](guides/supported-data-formats.md)
- [Загрузка данных](guides/loading.md)
- [Интеграция на стороне сервера](guides/server-side.md)
- [Динамическая загрузка (по требованию)](guides/dynamic-loading.md)