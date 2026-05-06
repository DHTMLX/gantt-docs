---
sidebar_label: onAfterBatchUpdate
title: onAfterBatchUpdate 事件
description: "在 batchUpdate 方法被调用之后触发"
---

# onAfterBatchUpdate

### Description

@short: 在 [batchUpdate](api/method/batchupdate.md) 方法被调用之后触发

@signature: onAfterBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onAfterBatchUpdate", function(){
    // 在这里插入您的自定义逻辑
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)

### Change log
- 在版本 4.0 中新增