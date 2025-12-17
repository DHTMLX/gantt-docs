---
sidebar_label: onAfterBatchUpdate
title: onAfterBatchUpdate event
description: "вызывается сразу после завершения метода batchUpdate"
---

# onAfterBatchUpdate

### Description

@short: Вызывается сразу после завершения метода [batchUpdate](api/method/batchupdate.md)

@signature: onAfterBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onAfterBatchUpdate", function(){
    // ваш код здесь
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)

### Change log
- добавлено в версии 4.0

