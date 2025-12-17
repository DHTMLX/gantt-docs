---
sidebar_label: onLoadStart
title: onLoadStart event
description: "데이터 소스에서 데이터 로딩 프로세스가 시작되기 직전에 트리거됩니다."
---

# onLoadStart

### Description

@short: 데이터 소스에서 데이터 로딩 프로세스가 시작되기 직전에 트리거됩니다.

@signature: onLoadStart: (url: string, type: string) =\> void;

### Parameters

- `url` - (required) *string* - 서버 측 URL (정적 파일이거나 데이터를 반환하는 서버 측 스크립트일 수 있음)
- `type` - (required) *string* - ('json', 'xml', 'oldxml') 데이터 형식을 지정

### Example

~~~jsx
gantt.attachEvent("onLoadStart", function(url, type){
    console.log("onLoadStart", url, type)
});
~~~

### Details

이 이벤트는 [load](api/method/load.md) 메서드 내에서 트리거됩니다.

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

