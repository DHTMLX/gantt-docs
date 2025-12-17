---
sidebar_label: onAfterBatchUpdate
title: onAfterBatchUpdate event
description: "batchUpdate 메서드가 완료된 직후에 트리거됩니다."
---

# onAfterBatchUpdate

### Description

@short: [batchUpdate](api/method/batchupdate.md) 메서드가 완료된 직후에 트리거됩니다.

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

