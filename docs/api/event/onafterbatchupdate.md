---
sidebar_label: onAfterBatchUpdate
title: onAfterBatchUpdate event
description: "fires after the batchUpdate method was called"
---

# onAfterBatchUpdate

### Description

@short: Fires after the [batchUpdate](api/method/batchupdate.md) method was called

@signature: onAfterBatchUpdate: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onAfterBatchUpdate", function(){
    // your code here
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)

### Change log
- added in version 4.0

