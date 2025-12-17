---
sidebar_label: load
title: load method
description: "외부 소스에서 Gantt 차트로 데이터를 로드합니다."
---

# load

### Description

@short: 외부 소스에서 Gantt 차트로 데이터를 로드합니다.

@signature: load: (url: string, type?: string, callback?: GanttCallback) =\> any

### Parameters

- `url` - (required) *string* - 서버 측 URL (정적 파일 또는 데이터를 반환하는 서버 측 스크립트일 수 있습니다).
- `type` - (optional) *string* - <i>('json', 'xml', 'oldxml')</i> 데이터 형식입니다. 기본값은 <i>'json'</i>입니다.
- `callback` - (optional) *function* - 로딩이 완료된 후 호출할 함수입니다.

### Returns
- ` resultPromise` - (object) - AJAX 요청이 완료되면 해결되는 Promise 객체입니다.

### Example

~~~jsx
gantt.load("/data",function(){
    gantt.message("모든 준비가 완료되었습니다");
});
//또는
gantt.load("/data").then(function(xhr){
    gantt.message("모든 준비가 완료되었습니다");
});
//또는
gantt.load("data.json"); // JSON 형식으로 데이터 로드
//또는
gantt.load("data.xml","xml"); // XML 형식(버전 2.0 이상)으로 데이터 로드
//또는
gantt.load("data.xml","xml", function(){ // 콜백 함수 제공
    alert("데이터가 성공적으로 로드되었습니다");
});
~~~

### Related samples
- [Backend storage using REST API](https://docs.dhtmlx.com/gantt/samples/01_initialization/04_save_rest.html)
- [Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)

### Details

이 메서드는 [onLoadStart](api/event/onloadstart.md) 및 [onLoadEnd](api/event/onloadend.md) 이벤트를 트리거합니다.

:::note

이 메서드는 Node.js용 Gantt 버전에서는 지원되지 않음을 유의하세요.
 
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

