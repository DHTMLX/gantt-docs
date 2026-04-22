---
sidebar_label: onAjaxError
title: onAjaxError Ereignis
description: "Wird ausgelöst, wenn der Server einen Fehler zurückgibt"
---

# onAjaxError

### Description

@short: Wird ausgelöst, wenn der Server einen Fehler zurückgibt

@signature: onAjaxError: (request: any) =\> boolean;

### Parameters

- `request` - (erforderlich) *Objekt* - XMLHttpRequest-Objekt

### Returns
- ` result` - (Boolean) - definiert, ob die Standardaktion des Ereignisses ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onAjaxError", function(request){
    gantt.message({type: "error", text:`Http error ${request.status}!`})
    gantt.message(request.response)
    return true;
});
~~~

### Related samples
- [Fehler vom Server](https://snippet.dhtmlx.com/5/9596ea969)

### Details

Das Ereignis ist blockierbar. Wenn false zurückgegeben wird, wird die weitere Verarbeitung der AJAX-Anfrage gestoppt.

### Related Guides
- [Server-Seitige Integration](guides/server-side.md)