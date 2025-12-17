---
sidebar_label: onLoadEnd
title: onLoadEnd event
description: "fires after loading data from the data source has been completed"
---

# onLoadEnd

### Description

@short: Fires after loading data from the data source has been completed

@signature: onLoadEnd: (url: string, type: string) =\> void;

### Parameters

- `url` - (required) *string* - the server-side url (may be a static file or a server side script that outputs data)
- `type` - (required) *string* - ('json', 'xml', 'oldxml') the data type

### Example

~~~jsx
gantt.attachEvent("onLoadEnd", function(url, type){
    console.log("onLoadEnd",url, type)
});
~~~

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)

