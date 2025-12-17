---
sidebar_label: onAjaxError
title: onAjaxError event
description: "서버가 에러 응답을 보낼 때 트리거됩니다."
---

# onAjaxError

### Description

@short: 서버가 에러 응답을 보낼 때 트리거됩니다.

@signature: onAjaxError: (request: any) =\> boolean;

### Parameters

- `request` - (required) *object* - XML HTTP 요청 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작을 계속할지(<b>true</b>) 아니면 막을지(<b>false</b>)를 나타냅니다.

### Example

~~~jsx
gantt.attachEvent("onAjaxError", function(request){
    gantt.message({type: "error", text:`Http error ${request.status}!`})
    gantt.message(request.response)
    return true;
});
~~~

### Related samples
- [서버에서 발생한 에러](https://snippet.dhtmlx.com/5/9596ea969)    

### Details

이 이벤트는 차단할 수 있습니다. false를 반환하면 AJAX 요청에 대한 추가 처리가 중단됩니다.

### Related Guides
- [Server-Side Integration](guides/server-side.md)
