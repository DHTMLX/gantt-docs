---
sidebar_label: onAfterBatchUpdate
title: onAfterBatchUpdate event
description: "batchUpdate 메서드가 호출된 직후에 발생합니다"
---

# onAfterBatchUpdate

### Description

@short: batchUpdate 메서드가 호출된 직후에 발생합니다 [batchUpdate](api/method/batchupdate.md) 참조

@signature: onAfterBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onAfterBatchUpdate", function(){
    // 여기에 코드 작성
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)

### Change log
- 버전 4.0에서 추가됨