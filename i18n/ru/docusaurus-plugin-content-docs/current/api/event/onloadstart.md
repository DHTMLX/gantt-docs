---
sidebar_label: onLoadStart
title: onLoadStart event
description: "Срабатывает непосредственно перед началом загрузки данных из источника данных"
---

# onLoadStart

### Description

@short: Срабатывает непосредственно перед началом загрузки данных из источника данных

@signature: onLoadStart: (url: string, type: string) =\> void;

### Parameters

- `url` - (обязательный) *string* - URL сервера (может быть статическим файлом или серверным скриптом, который возвращает данные)
- `type` - (обязательный) *string* - ('json', 'xml', 'oldxml') тип данных

### Example

~~~jsx
gantt.attachEvent("onLoadStart", function(url, type){
    console.log("onLoadStart",url, type)
});
~~~

### Details

Событие срабатывает в методе [load](api/method/load.md).

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)