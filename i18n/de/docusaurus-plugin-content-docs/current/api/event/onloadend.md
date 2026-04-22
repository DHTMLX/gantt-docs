---
sidebar_label: onLoadEnd
title: onLoadEnd event
description: "wird ausgelöst, nachdem das Laden der Daten aus der Datenquelle abgeschlossen wurde"
---

# onLoadEnd

### Description

@short: Wird ausgelöst, nachdem das Laden der Daten aus der Datenquelle abgeschlossen wurde

@signature: onLoadEnd: (url: string, type: string) =\> void;

### Parameters

- `url` - (required) *string* - die serverseitige URL (kann eine statische Datei oder ein serverseitiges Skript sein, das Daten ausgibt)
- `type` - (required) *string* - ('json', 'xml', 'oldxml') der Datentyp

### Example

~~~jsx
gantt.attachEvent("onLoadEnd", function(url, type){
    console.log("onLoadEnd",url, type)
});
~~~

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onBeforeParse]( api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)