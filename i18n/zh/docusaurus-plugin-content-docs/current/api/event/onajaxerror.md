---
sidebar_label: onAjaxError
title: onAjaxError
description: "当服务器返回错误时触发"
---

# onAjaxError

### Description

@short: 当服务器返回错误时触发

@signature: onAjaxError: (request: any) => boolean;

### Parameters

- `request` - (required) *object* - XMLHttpRequest 对象

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否会被触发（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onAjaxError", function(request){
    gantt.message({type: "error", text:`Http error ${request.status}!`})
    gantt.message(request.response)
    return true;
});
~~~

### Related samples
- [来自服务器的错误](https://snippet.dhtmlx.com/5/9596ea969)

### Details

该事件是可阻塞的。返回 false 将停止 AJAX 请求的后续处理

### Related Guides
- [服务端集成](guides/server-side.md)