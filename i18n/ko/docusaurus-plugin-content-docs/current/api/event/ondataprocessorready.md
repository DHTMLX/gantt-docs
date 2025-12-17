---
sidebar_label: onDataProcessorReady
title: onDataProcessorReady event
description: "`dp.init(gantt)`가 호출될 때 트리거됩니다."
---

# onDataProcessorReady

### Description

@short: `dp.init(gantt)`가 호출될 때 트리거됩니다.

@signature: onDataProcessorReady: (DataProcessor: any) =\> void;

### Parameters

- `DataProcessor` - (required) *object* - DataProcessor 인스턴스

### Example

~~~jsx
gantt.attachEvent("onDataProcessorReady",function(DataProcessor){
    // 여기에 사용자 정의 로직을 작성하세요
});
~~~

### Details

이 이벤트는 애플리케이션 코드에서 DataProcessor에 직접 핸들러를 연결할 수 있게 해줍니다.

### Related Guides
- [Server-Side Integration](guides/server-side.md)
