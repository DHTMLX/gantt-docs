---
sidebar_label: onAjaxError
title: onAjaxError event
description: "当服务器响应错误时触发"
---

# onAjaxError

### Description

@short: 当服务器响应错误时触发

@signature: onAjaxError: (request: any) =\> boolean;

### Parameters

- `request` - (required) *object* - XML HTTP 请求对象

### Returns
- ` result` - (boolean) - 指示事件的默认操作是否应继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onAjaxError", function(request){
    gantt.message({type: "error", text:`Http error ${request.status}!`})
    gantt.message(request.response)
    return true;
});
~~~

### Related samples
- [服务器错误示例](https://snippet.dhtmlx.com/5/9596ea969)    

### Details

此事件可以被阻止。返回 false 将停止对该 AJAX 请求的任何进一步处理。

### Related Guides
- [服务器端集成](guides/server-side.md)
