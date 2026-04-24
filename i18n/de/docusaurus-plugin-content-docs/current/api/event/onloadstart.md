---
sidebar_label: onLoadStart
title: onLoadStart-Ereignis
description: "Wird unmittelbar vor dem Start des Ladens der Daten aus der Datenquelle ausgelöst"
---

# onLoadStart

### Description

@short: Wird unmittelbar vor dem Start des Ladens der Daten aus der Datenquelle ausgelöst

@signature: onLoadStart: (url: string, type: string) =\> void;

### Parameter

- `url` - (erforderlich) *string* - die serverseitige URL (kann eine statische Datei oder ein serverseitiges Skript sein, das Daten ausgibt)
- `type` - (erforderlich) *string* - ('json', 'xml', 'oldxml') der Datentyp

### Beispiel

~~~jsx
gantt.attachEvent("onLoadStart", function(url, type){
    console.log("onLoadStart", url, type)
});
~~~

### Details

Das Event wird in der [load](api/method/load.md) Methode ausgelöst.

### Verwandte API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)