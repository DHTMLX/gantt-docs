---
sidebar_label: load
title: load method
description: "Lädt Daten aus einer externen Quelle in das Gantt-Diagramm."
---

# load

### Description

@short: Lädt Daten in das Gantt-Diagramm aus einer externen Datenquelle

@signature: load: (url: string, type?: string, callback?: GanttCallback) => any

### Parameters

- `url` - (erforderlich) *string* - die serverseitige URL (kann eine statische Datei oder ein serverseitiges Script sein, das Daten ausgibt)
- `type` -	(optionaL) *string*	<i>('json', 'xml', 'oldxml')</i> - der Datentyp. Der Standardwert - <i>'json'</i>
- `callback`	-	(optionaL) *function* 	- die Callback-Funktion

### Returns
- ` resultPromise` - (object) - das Promise-Objekt, das sich auflöst, wenn die AJAX-Anfrage abgeschlossen ist

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

Die Methode löst die Ereignisse [onLoadStart](api/event/onloadstart.md) und [onLoadEnd](api/event/onloadend.md) aus.

:::note
Beachten Sie, dass die Methode in der Gantt-Version für Node.js nicht funktioniert.
:::

### Related API
- [parse](api/method/parse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)
- [onAjaxError](api/event/onajaxerror.md)

### Related Guides
- [Unterstützte Datenformate](guides/supported-data-formats.md)
- [Datenladen](guides/loading.md)
- [Serverseitige Integration](guides/server-side.md)
- [Dynamisches Laden (bei Bedarf)](guides/dynamic-loading.md)

