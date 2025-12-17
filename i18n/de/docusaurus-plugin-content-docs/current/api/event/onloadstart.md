---
sidebar_label: onLoadStart
title: onLoadStart event
description: "Wird unmittelbar vor Beginn des Datenladevorgangs aus der Datenquelle ausgelöst"
---

# onLoadStart

### Description

@short: Wird unmittelbar vor Beginn des Datenladevorgangs aus der Datenquelle ausgelöst

@signature: onLoadStart: (url: string, type: string) =\> void;

### Parameters

- `url` - (required) *string* - die serverseitige URL (dies kann eine statische Datei oder ein serverseitiges Skript sein, das Daten zurückgibt)
- `type` - (required) *string* - ('json', 'xml', 'oldxml') zur Angabe des Datenformats

### Example

~~~jsx
gantt.attachEvent("onLoadStart", function(url, type){
    console.log("onLoadStart", url, type)
});
~~~

### Details

Dieses Event wird innerhalb der Methode [load](api/method/load.md) ausgelöst.

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

