---
sidebar_label: onBeforeBatchUpdate
title: onBeforeBatchUpdate event
description: "wird unmittelbar vor dem Ausführen der [batchUpdate](api/method/batchupdate.md) Methode ausgelöst"
---

# onBeforeBatchUpdate

### Description

@short: Wird unmittelbar vor dem Ausführen der [batchUpdate](api/method/batchupdate.md) Methode ausgelöst

@signature: onBeforeBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeBatchUpdate", function(){
    // Ihr Code hier
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- hinzugefügt in Version 4.0

