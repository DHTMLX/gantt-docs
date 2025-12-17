---
sidebar_label: onBeforeBatchUpdate
title: onBeforeBatchUpdate event
description: "[batchUpdate](api/method/batchupdate.md) 메서드가 실행되기 직전에 트리거됩니다."
---

# onBeforeBatchUpdate

### Description

@short: [batchUpdate](api/method/batchupdate.md) 메서드가 실행되기 직전에 트리거됩니다.

@signature: onBeforeBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeBatchUpdate", function(){
    // your code here
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- 버전 4.0에 추가됨

