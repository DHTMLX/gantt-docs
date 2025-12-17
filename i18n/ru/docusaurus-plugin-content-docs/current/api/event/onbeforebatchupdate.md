---
sidebar_label: onBeforeBatchUpdate
title: onBeforeBatchUpdate event
description: "срабатывает непосредственно перед выполнением метода [batchUpdate](api/method/batchupdate.md)"
---

# onBeforeBatchUpdate

### Description

@short: Срабатывает непосредственно перед выполнением метода [batchUpdate](api/method/batchupdate.md)

@signature: onBeforeBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeBatchUpdate", function(){
    // ваш код здесь
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- добавлено в версии 4.0

