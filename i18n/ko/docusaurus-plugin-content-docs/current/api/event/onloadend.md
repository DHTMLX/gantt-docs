---
sidebar_label: onLoadEnd
title: onLoadEnd 이벤트
description: "데이터 소스에서 데이터를 로드한 후 완료되었을 때 발생합니다"
---

# onLoadEnd

### Description

@short: 데이터 소스에서 데이터를 로드한 후 완료되었을 때 발생합니다

@signature: onLoadEnd: (url: string, type: string) => void;

### Parameters

- `url` - (required) *string* - 서버 측 URL(정적 파일이거나 데이터를 출력하는 서버 측 스크립트일 수 있음)
- `type` - (required) *string* - ('json', 'xml', 'oldxml') 데이터 타입

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