---
sidebar_label: load
title: load method
description: "loads data to the gantt from an external data source"
---

# load

### Description

@short: Loads data to the gantt from an external data source

@signature: load: (url: string, type?: string, callback?: GanttCallback) =\> any

### Parameters

- `url` - (required) *string* - the server-side url (may be a static file or a server side script that outputs data)
- `type` -	(optionaL) *string*	<i>('json', 'xml', 'oldxml')</i> - the data type. The default value - <i>'json'</i>
- `callback`	-	(optionaL) *function* 	- the callback function

### Returns
- ` resultPromise` - (object) - the promise object which resolves when ajax request is completed

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
- [Backend storage using REST API](https://docs.dhtmlx.com/gantt/samples/01_initialization/04_save_rest.html)
- [Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)

### Details

The method invokes the [onLoadStart](api/event/onloadstart.md) and [onLoadEnd](api/event/onloadend.md) events.

:::note
Note that the method doesn't work in the Gantt version for Node.js.
:::

### Related API
- [parse](api/method/parse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)
- [onAjaxError](api/event/onajaxerror.md)

### Related Guides
- [Supported Data Formats](guides/supported-data-formats.md)
- [Data Loading](guides/loading.md)
- [Server-Side Integration](guides/server-side.md)
- [Dynamic Loading (on demand)](guides/dynamic-loading.md)

