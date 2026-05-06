---
sidebar_label: onBeforeBatchUpdate
title: onBeforeBatchUpdate 이벤트
description: "batchUpdate 메서드가 호출되기 전에 실행됩니다"
---

# onBeforeBatchUpdate

### Description

@short: [batchUpdate](api/method/batchupdate.md) 메서드가 호출되기 전에 실행됩니다

@signature: onBeforeBatchUpdate: () => void;

### Example

~~~jsx
gantt.attachEvent("onBeforeBatchUpdate", function(){
    // 여기에 코드 작성
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- 버전 4.0에서 추가됨