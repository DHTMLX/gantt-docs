---
sidebar_label: onLoadEnd
title: событие onLoadEnd
description: "Выполняется после загрузки данных из источника данных"
---

# onLoadEnd

### Description

@short: Срабатывает после завершения загрузки данных из источника данных

@signature: onLoadEnd: (url: string, type: string) =\> void;

### Parameters

- `url` - (required) *string* - URL сервера (может быть статическим файлом или серверным скриптом, который выводит данные)
- `type` - (required) *string* - ('json', 'xml', 'oldxml') тип данных

### Пример

~~~jsx
gantt.attachEvent("onLoadEnd", function(url, type){
    console.log("onLoadEnd",url, type)
});
~~~

### Связанные API
- [onLoadStart](api/event/onloadstart.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)