---
sidebar_label: onClear
title: onClear 이벤트
description: "간트 차트에서 모든 작업이 [clearAll](api/method/clearall.md) 메서드로 제거된 후에 발생합니다."
---

# onClear

### Description

@short: 간트 차트에서 모든 작업이 [clearAll](api/method/clearall.md) 메서드로 제거된 후에 발생합니다.

@signature: onClear: () => void;

### Example

~~~jsx
gantt.attachEvent("onClear", function (){
    // 여기에 코드 작성
});
~~~

### Related API
- [clearAll](api/method/clearall.md)