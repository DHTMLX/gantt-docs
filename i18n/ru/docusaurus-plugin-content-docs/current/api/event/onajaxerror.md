---
sidebar_label: onAjaxError
title: onAjaxError event
description: "срабатывает, когда сервер возвращает ошибку"
---

# onAjaxError

### Description

@short: Срабатывает, когда сервер возвращает ошибку

@signature: onAjaxError: (request: any) =\> boolean;

### Parameters

- `request` - (required) *object* - объект XML HTTP запроса

### Returns
- ` result` - (boolean) - указывает, должно ли выполняться действие по умолчанию события (<b>true</b>) или оно должно быть предотвращено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onAjaxError", function(request){
    gantt.message({type: "error", text:`Http error ${request.status}!`})
    gantt.message(request.response)
    return true;
});
~~~

### Related samples
- [Ошибка от сервера](https://snippet.dhtmlx.com/5/9596ea969)   

### Details

Это событие можно заблокировать. Возврат false остановит дальнейшую обработку AJAX запроса.

### Related Guides
- [Интеграция с серверной стороной](guides/server-side.md)
