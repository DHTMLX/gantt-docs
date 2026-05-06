---
sidebar_label: onBeforeBatchUpdate
title: onBeforeBatchUpdate 事件
description: "在调用 [batchUpdate](api/method/batchupdate.md) 方法之前触发"
---

# onBeforeBatchUpdate

### Description

@short: 在调用 [batchUpdate](api/method/batchupdate.md) 方法之前触发

@signature: onBeforeBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeBatchUpdate", function(){
    // 在这里插入您的自定义逻辑
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- 在 4.0 版本中新增