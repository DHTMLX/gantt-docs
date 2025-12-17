---
sidebar_label: onLoadStart
title: onLoadStart event
description: "срабатывает непосредственно перед началом процесса загрузки данных из источника данных"
---

# onLoadStart

### Description

@short: Срабатывает непосредственно перед началом процесса загрузки данных из источника данных

@signature: onLoadStart: (url: string, type: string) =\> void;

### Parameters

- `url` - (required) *string* - серверный URL (это может быть статический файл или серверный скрипт, возвращающий данные)
- `type` - (required) *string* - ('json', 'xml', 'oldxml'), указывающий формат данных

### Example

~~~jsx
gantt.attachEvent("onLoadStart", function(url, type){
    console.log("onLoadStart", url, type)
});
~~~

### Details

Это событие вызывается внутри метода [load](api/method/load.md).

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

