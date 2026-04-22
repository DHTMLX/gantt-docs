---
sidebar_label: onAfterBatchUpdate
title: onAfterBatchUpdate событие
description: "Срабатывает после вызова метода batchUpdate"
---

# onAfterBatchUpdate

### Description

@short: Срабатывает после вызова метода [batchUpdate](api/method/batchupdate.md)

@signature: onAfterBatchUpdate: () => void;

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