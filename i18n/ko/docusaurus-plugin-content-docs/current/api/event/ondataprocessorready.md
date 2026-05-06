---
sidebar_label: onDataProcessorReady
title: onDataProcessorReady 이벤트
description: "`dp.init(gantt)` 호출 시 발생"
---

# onDataProcessorReady

### Description

@short: `dp.init(gantt)` 호출 시 발생

@signature: onDataProcessorReady: (DataProcessor: any) => void;

### Parameters

- `DataProcessor` - (필수) *객체* - DataProcessor 객체

### Example

~~~jsx
gantt.attachEvent("onDataProcessorReady",function(DataProcessor){
    // 여기에 코드 작성
});
~~~

### Details

이벤트를 사용하여 앱 코드에서 DataProcessor에 대한 핸들러를 추가할 수 있습니다.

### Related Guides
- [Server-Side Integration](guides/server-side.md)