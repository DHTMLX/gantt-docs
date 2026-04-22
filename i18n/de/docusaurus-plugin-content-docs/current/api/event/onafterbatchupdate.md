---
sidebar_label: onAfterBatchUpdate
title: onAfterBatchUpdate-Ereignis
description: "wird ausgelöst, nachdem die batchUpdate-Methode aufgerufen wurde"
---

# onAfterBatchUpdate

### Description

@short: Wird ausgelöst, nachdem die [batchUpdate](api/method/batchupdate.md) Methode aufgerufen wurde

@signature: onAfterBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onAfterBatchUpdate", function(){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)

### Change log
- hinzugefügt in Version 4.0

