---
sidebar_label: onBeforeBatchUpdate
title: onBeforeBatchUpdate event
description: "在 [batchUpdate](api/method/batchupdate.md) 方法执行之前触发"
---

# onBeforeBatchUpdate

### Description

@short: 在 [batchUpdate](api/method/batchupdate.md) 方法执行之前触发

@signature: onBeforeBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeBatchUpdate", function(){
    // 在这里编写你的代码
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- 4.0 版本新增

