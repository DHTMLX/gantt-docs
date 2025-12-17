---
sidebar_label: ajax
title: ajax config
description: "модуль gantt ajax"
---

# ajax

### Description

@short: Модуль gantt ajax

@signature: ajax: any

### Example

~~~jsx
// предполагается, что ответ выглядит так
{status: "ok", data: "value", data2: "value2"}


var xhr = gantt.ajax;

// HTTP GET
xhr.get("server.php").then(function(response) {
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // ответ в порядке
    }
});

// HTTP POST
xhr.post({
    url:"server.php", 
    data: {
       paramName: "paramValue"
    }
}).then(function(response){
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // ответ в порядке
    }
});
~~~

### Details

## Справка по API

Все методы принимают параметры одним из двух способов:

1) RequestConfig - объект с опциями конфигурации запроса, структурированный так:

~~~js
{
  url: string,
  method: "PUT|GET|POST|DELETE",
  data: string | object,
  async: true|false,
  callback: function,
  headers: object
}
~~~

где:

- url - URL сервера
- method - необязательно, HTTP метод, по умолчанию "GET"
- data - необязательно, данные для отправки с POST или PUT запросами; может быть строкой или объектом
- async - необязательно, определяет, асинхронный ли запрос, по умолчанию true
- callback - необязательно, функция, вызываемая после получения ответа
- headers - необязательно, объект с заголовками в виде ключ-значение для включения в запрос

или:

2) Три параметра (кроме метода **query()**, который принимает только объект *RequestConfig*):

- url - URL сервера
- data - необязательно, данные, отправляемые с POST запросом
- callback - необязательно, функция, вызываемая после получения ответа

Ниже приведён список доступных методов API модуля ajax:

#### Опции callback

Все методы поддерживают как callback, так и [promises](#promises) для обработки ответов.

ajax promise резолвится с завершённым объектом XmlHttpRequest:

~~~js
gantt.ajax.post({ 
    url:"some.php",
    data: {
       paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});
~~~

По причинам совместимости, callback получает результат в немного другом формате:

~~~js
gantt.ajax.post({ 
    url:"some.php",
    data: {
       paramName: "paramValue"
    },
    callback: function(result){
       var response = result.xmlDoc;
       
       alert(response.responseText);
    }
});
~~~


#### query

Общий метод для отправки запросов. Вы можете указать любой HTTP метод в параметрах.

~~~js
gantt.ajax.query({ 
    url:"some.php",
    method:"POST",
    data: {
       paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});

~~~

#### get

Отправляет GET запрос.

~~~js
gantt.ajax.get("some.php", function(){
    // ваш код здесь
});
// или
gantt.ajax.get({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
});
~~~

#### put

Отправляет PUT запрос.

~~~js
gantt.ajax.put("server.php", "keep_alive=1&version=std", function(){
    // ваш код здесь
});
// или
gantt.ajax.put({
   url: "https://…",
   callback: function() {…},
   headers: { "Content-Type": "application/json" },
   data: {}
});
~~~

#### del

Отправляет DELETE запрос.

~~~js
gantt.ajax.del("server.php", function(){
    // ваш код здесь
});
// или
gantt.ajax.del({
   url: "https://…",
   callback: function() {…},
   headers: { "Content-Type": "application/json" }
});
~~~

#### post

Отправляет POST запрос.

~~~js
gantt.ajax.post("server.php", "keep_alive=1&version=std", function(){
    // ваш код здесь
});
// или
gantt.ajax.post({
      url: "https://…",
      callback: function() {…},
      headers: { "Content-Type": "application/json" },
      data: {}
});
~~~

## Отправка данных с методами POST/PUT 

Вместо строки вы можете передать объект в методы **post** и **put**. Когда передаётся объект, модуль ajax автоматически сериализует данные. Простые объекты сериализуются как form data (&param=value), а вложенные структуры сериализуются с помощью JSON.stringify().

Например, объект ниже:

~~~js
{
    id: 1,
    text: "My Task",
    users: [1,2,3]
}
~~~

будет преобразован в строку вида `id=1&text=My%20Task&users=%5B1%2C2%2C3%5D`.

### Promises {#promises}

dhtmlxGantt поддерживает promises (включая IE8+). Внутри используется библиотека промисов [Bluebird](https://github.com/petkaantonov/bluebird). Для создания промиса используйте этот конструктор:

~~~js
var promise = new gantt.Promise(function(resolve, reject) {...});
~~~

Объект Promise определён внутри Gantt, а не глобально.

Модуль AJAX возвращает promise, так что вы можете использовать синтаксис промисов вместо callback. Например, вместо:

~~~js
gantt.ajax.post(url, params, callback);
~~~

можно написать:

~~~js
gantt.ajax.post(url, params).then(function(){…});
~~~

Возможно использование и callback, и промисов вместе.

Пример ниже демонстрирует отправку нескольких запросов одновременно, а затем перезагрузку данных после их завершения:

~~~js 
gantt.Promise.all([
      gantt.ajax.post({url: "api/task", data: task1}),
      gantt.ajax.post({url: "api/task", data: task2}),
      gantt.ajax.post({url: "api/task", data: task3})
]).then(function(){
   gantt.clearAll();
   gantt.load("/api");
});
~~~

### Change log
- добавлено в версии 4.0
