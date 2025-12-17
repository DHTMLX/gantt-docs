---
sidebar_label: load
title: load method
description: "Lädt Daten aus einer externen Quelle in das Gantt-Diagramm."
---

# load

### Description

@short: Lädt Daten aus einer externen Quelle in das Gantt-Diagramm.

@signature: load: (url: string, type?: string, callback?: GanttCallback) =\> any

### Parameters
- `url` - (required) *string* - Die URL auf der Serverseite (dies kann eine statische Datei oder ein serverseitiges Skript sein, das Daten zurückgibt).
- `type` - (optional) *string* - ('json', 'xml', 'oldxml') Das Format der Daten. Standard ist 'json'.
- `callback` - (optional) *function* - 	Eine Funktion, die aufgerufen wird, sobald das Laden abgeschlossen ist.

### Returns
- ` resultPromise` - (object) - Ein Promise, das aufgelöst wird, wenn die AJAX-Anfrage abgeschlossen ist.

### Example

~~~jsx
gantt.load("/data",function(){
    gantt.message("everything is ready");
});
//oder
gantt.load("/data").then(function(xhr){
    gantt.message("everything is ready");
});
//oder
gantt.load("data.json"); //Laden von Daten im JSON-Format
//oder
gantt.load("data.xml","xml"); //Laden von Daten im XML-Format (Version 2.0+)
//oder
gantt.load("data.xml","xml", function(){ //Callback-Funktion angeben 
    alert("Data has been successfully loaded");
});
~~~

### Related samples
- [Backend storage using REST API](https://docs.dhtmlx.com/gantt/samples/01_initialization/04_save_rest.html)
- [Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)

### Details

Diese Methode löst die Events [onLoadStart](api/event/onloadstart.md) und [onLoadEnd](api/event/onloadend.md) aus.

:::note
note
Beachten Sie, dass diese Methode in der Gantt-Version für Node.js nicht unterstützt wird.
 
:::

### Related API
- [parse](api/method/parse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)
- [onAjaxError](api/event/onajaxerror.md)

### Related Guides
- ["Unterstützte Datenformate"](guides/supported-data-formats.md)
- ["Datenladen"](guides/loading.md)
- ["Serverseitige Integration"](guides/server-side.md)
- ["Dynamisches Laden (bei Bedarf)"](guides/dynamic-loading.md)

