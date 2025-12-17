---
sidebar_label: onLoadStart
title: onLoadStart event
description: "fires immediately before loading data from the data source has been started"
---

# onLoadStart

### Description

@short: Fires immediately before loading data from the data source has been started

@signature: onLoadStart: (url: string, type: string) =\> void;

### Parameters

- `url` - (required) *string* - the server-side url (may be a static file or a server side script that outputs data)
- `type` - (required) *string* - ('json', 'xml', 'oldxml') the data type

### Example

~~~jsx
gantt.attachEvent("onLoadStart", function(url, type){
    console.log("onLoadStart",url, type)
});
~~~

### Details

The event fires in the [load](api/method/load.md) method.

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

