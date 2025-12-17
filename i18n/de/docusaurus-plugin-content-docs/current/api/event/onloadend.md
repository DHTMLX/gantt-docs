---
sidebar_label: onLoadEnd
title: onLoadEnd event
description: "Wird ausgelöst, sobald das Laden der Daten aus der Quelle vollständig abgeschlossen ist"
---

# onLoadEnd

### Description

@short: Wird ausgelöst, sobald das Laden der Daten aus der Quelle vollständig abgeschlossen ist

@signature: onLoadEnd: (url: string, type: string) =\> void;

### Parameters

- `url` - (required) *string* - die URL des Servers (dies kann eine statische Datei oder ein serverseitiges Skript sein, das Daten zurückgibt)
- `type` - (required) *string* - ('json', 'xml', 'oldxml') gibt den Typ der geladenen Daten an

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

