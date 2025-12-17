---
sidebar_label: onAfterBatchUpdate
title: onAfterBatchUpdate event
description: "在 batchUpdate 方法完成后立即触发"
---

# onAfterBatchUpdate

### Description

@short: 在 [batchUpdate](api/method/batchupdate.md) 方法完成后立即触发

@signature: onAfterBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onAfterBatchUpdate", function(){
    // 你的代码写在这里
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)

### Change log
- 版本 4.0 中新增

