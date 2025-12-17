---
sidebar_label: onBeforeBatchUpdate
title: onBeforeBatchUpdate event
description: "fires before the [batchUpdate](api/method/batchupdate.md) method is called"
---

# onBeforeBatchUpdate

### Description

@short: Fires before the [batchUpdate](api/method/batchupdate.md) method is called

@signature: onBeforeBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeBatchUpdate", function(){
    // your code here
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- added in version 4.0

