---
sidebar_label: onAjaxError
title: onAjaxError event
description: "ausgelöst, wenn der Server mit einem Fehler antwortet"
---

# onAjaxError

### Description

@short: Ausgelöst, wenn der Server mit einem Fehler antwortet

@signature: onAjaxError: (request: any) =\> boolean;

### Parameters

- `request` - (required) *object* - XML HTTP request Objekt

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events fortgesetzt werden soll (<b>true</b>) oder verhindert wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onAjaxError", function(request){
    gantt.message({type: "error", text:`Http error ${request.status}!`})
    gantt.message(request.response)
    return true;
});
~~~

### Related samples
- https://snippet.dhtmlx.com/5/9596ea969    Error vom Server

### Details

Dieses Event kann blockiert werden. Das Zurückgeben von false stoppt jegliche weitere Verarbeitung der AJAX-Anfrage.

### Related Guides
- ["Serverseitige Integration"](guides/server-side.md)
