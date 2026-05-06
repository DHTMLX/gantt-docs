---
sidebar_label: onAjaxError
title: onAjaxError событие
description: "срабатывает, если сервер возвращает ошибку"
---

# onAjaxError

### Description

@short: Срабатывает, если сервер возвращает ошибку

@signature: onAjaxError: (request: any) =\> boolean;

### Parameters

- `request` - (required) *object* - объект XML HTTP-запроса

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onAjaxError", function(request){
    gantt.message({type: "error", text:`Http error ${request.status}!`})
    gantt.message(request.response)
    return true;
});
~~~

### Related samples
- [Ошибка сервера](https://snippet.dhtmlx.com/5/9596ea969)

### Details

Событие можно блокировать. Возврат значения false остановит дальнейшую обработку AJAX-запроса

### Related Guides
- [Серверная интеграция](guides/server-side.md)