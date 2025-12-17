---
sidebar_label: onLoadEnd
title: onLoadEnd event
description: "소스에서 데이터 로딩이 완전히 완료되었을 때 한 번 발생합니다"
---

# onLoadEnd

### Description

@short: 소스에서 데이터 로딩이 완전히 완료되었을 때 한 번 발생합니다

@signature: onLoadEnd: (url: string, type: string) =\> void;

### Parameters

- `url` - (required) *string* - 서버의 URL (정적 파일이거나 데이터를 반환하는 서버 사이드 스크립트일 수 있습니다)
- `type` - (required) *string* - ('json', 'xml', 'oldxml') 로드된 데이터의 타입을 지정합니다

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

