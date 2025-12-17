---
sidebar_label: onAfterBatchUpdate
title: onAfterBatchUpdate event
description: "wird direkt nach Abschluss der Methode batchUpdate ausgelöst"
---

# onAfterBatchUpdate

### Description

@short: Wird direkt nach Abschluss der Methode [batchUpdate](api/method/batchupdate.md) ausgelöst

@signature: onAfterBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onAfterBatchUpdate", function(){
    // Ihr Code hier
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)

### Change log
- hinzugefügt in Version 4.0

