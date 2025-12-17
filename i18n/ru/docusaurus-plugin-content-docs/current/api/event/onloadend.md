---
sidebar_label: onLoadEnd
title: onLoadEnd event
description: "срабатывает один раз, когда загрузка данных из источника полностью завершена"
---

# onLoadEnd

### Description

@short: Срабатывает один раз, когда загрузка данных из источника полностью завершена

@signature: onLoadEnd: (url: string, type: string) =\> void;

### Parameters

- `url` - (required) *string* - URL сервера (это может быть статический файл или серверный скрипт, который возвращает данные)
- `type` - (required) *string* - ('json', 'xml', 'oldxml') указывает тип загружаемых данных

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

