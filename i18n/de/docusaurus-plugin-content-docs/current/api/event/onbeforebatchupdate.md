---
sidebar_label: onBeforeBatchUpdate
title: onBeforeBatchUpdate-Ereignis
description: "führt aus, bevor die [batchUpdate](api/method/batchupdate.md) Methode aufgerufen wird"
---

# onBeforeBatchUpdate

### Description

@short: Führt aus, bevor die [batchUpdate](api/method/batchupdate.md) Methode aufgerufen wird

@signature: onBeforeBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeBatchUpdate", function(){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- hinzugefügt in Version 4.0

