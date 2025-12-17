---
sidebar_label: onAjaxError
title: onAjaxError event
description: "fires if the server returns an error"
---

# onAjaxError

### Description

@short: Fires if the server returns an error

@signature: onAjaxError: (request: any) =\> boolean;

### Parameters

- `request` - (required) *object* - XML HTTP request object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onAjaxError", function(request){
    gantt.message({type: "error", text:`Http error ${request.status}!`})
    gantt.message(request.response)
    return true;
});
~~~

### Related samples
- [Error from the server](https://snippet.dhtmlx.com/5/9596ea969)

### Details

The event is blockable. Returning false will stop further processing of the AJAX request

### Related Guides
- [Server-Side Integration](guides/server-side.md)
