---
sidebar_label: load
title: load method
description: "외부 데이터 소스에서 간트 차트로 데이터를 로드합니다"
---

# load

### Description

@short: 외부 데이터 소스에서 간트 차트로 데이터를 로드합니다

@signature: load: (url: string, type?: string, callback?: GanttCallback) =\> any

### Parameters

- `url` - (required) *string* - 서버 측 URL(정적 파일 또는 데이터를 출력하는 서버 사이드 스크립트일 수 있습니다)
- `type` -	(optionaL) *string*	<i>('json', 'xml', 'oldxml')</i> - 데이터 타입. 기본값 - <i>'json'</i>
- `callback`	-	(optionaL) *function* 	- 콜백 함수

### Returns
- ` resultPromise` - (object) - AJAX 요청이 완료될 때 해결되는 프라미스 객체

### Example

~~~jsx
gantt.load("/data",function(){
    gantt.message("everything is ready");
});
//또는
gantt.load("/data").then(function(xhr){
    gantt.message("everything is ready");
});
//또는
gantt.load("data.json"); //JSON 포맷으로 데이터를 로딩
//또는
gantt.load("data.xml","xml"); //XML 포맷으로 데이터를 로딩(버전 2.0+)
//또는
gantt.load("data.xml","xml", function(){ //콜백 함수를 지정
    alert("Data has been successfully loaded");
});
~~~

### Related samples
- [Backend storage using REST API](https://docs.dhtmlx.com/gantt/samples/01_initialization/04_save_rest.html)
- [Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)

### Details

이 메서드는 [onLoadStart](api/event/onloadstart.md) 및 [onLoadEnd](api/event/onloadend.md) 이벤트를 트리거합니다.

:::note
참고: 이 메서드는 Node.js용 Gantt 버전에서 작동하지 않습니다.
 :::

### Related API
- [parse](api/method/parse.md)
- [onLoadStart](api/event/onloadstart.md)
- [onLoadEnd](api/event/onloadend.md)
- [onAjaxError](api/event/onajaxerror.md)

### Related Guides
- [지원되는 데이터 형식](guides/supported-data-formats.md)
- [데이터 로딩](guides/loading.md)
- [Server-Side Integration](guides/server-side.md)
- [동적 로딩 (온디맨드)](guides/dynamic-loading.md)

