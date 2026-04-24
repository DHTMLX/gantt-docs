---
sidebar_label: onAjaxError
title: onAjaxError 이벤트
description: "서버가 오류를 반환하면 발생합니다"
---

# onAjaxError

### Description

@short: 서버가 오류를 반환할 때 발생합니다

@signature: onAjaxError: (request: any) => boolean;

### Parameters

- `request` - (required) *object* - XML HTTP 요청 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 여부 (<b>false</b>)

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

이벤트는 차단 가능합니다. false를 반환하면 AJAX 요청의 이후 처리가 중지됩니다

### Related Guides
- [Server-Side Integration](guides/server-side.md)