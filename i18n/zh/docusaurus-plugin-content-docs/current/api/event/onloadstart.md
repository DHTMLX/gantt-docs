---
sidebar_label: onLoadStart
title: onLoadStart event
description: "在从数据源开始加载数据之前触发"
---

# onLoadStart

### Description

@short: 在从数据源开始加载数据之前触发

@signature: onLoadStart: (url: string, type: string) =\> void;

### Parameters

- `url` - (required) *string* - 服务器端 URL（可以是静态文件或返回数据的服务器端脚本）
- `type` - (required) *string* - ('json', 'xml', 'oldxml') 指定数据格式

### Example

~~~jsx
gantt.attachEvent("onLoadStart", function(url, type){
    console.log("onLoadStart", url, type)
});
~~~

### Details

该事件在 [load](api/method/load.md) 方法中触发。

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

