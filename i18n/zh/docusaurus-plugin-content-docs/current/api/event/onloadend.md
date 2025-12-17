---
sidebar_label: onLoadEnd
title: onLoadEnd event
description: "当数据从源完全加载完成时触发"
---

# onLoadEnd

### Description

@short: 当数据从源完全加载完成时触发

@signature: onLoadEnd: (url: string, type: string) =\> void;

### Parameters

- `url` - (required) *string* - 服务器的URL（可以是静态文件或返回数据的服务器端脚本）
- `type` - (required) *string* - ('json', 'xml', 'oldxml') 指定加载的数据类型

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

