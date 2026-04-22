---
sidebar_label: onBeforeBatchUpdate
title: onBeforeBatchUpdate событие
description: "срабатывает перед вызовом метода [batchUpdate](api/method/batchupdate.md)"
---

# onBeforeBatchUpdate

### Description

@short: Срабатывает перед вызовом метода [batchUpdate](api/method/batchupdate.md)

@signature: onBeforeBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeBatchUpdate", function(){
    // любая ваша логика здесь
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- добавлено в версии 4.0