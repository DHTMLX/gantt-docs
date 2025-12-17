---
sidebar_label: onClear
title: onClear event
description: "fires after all tasks were removed from the Gantt chart by the [clearAll](api/method/clearall.md) method"
---

# onClear

### Description

@short: Fires after all tasks were removed from the Gantt chart by the [clearAll](api/method/clearall.md) method

@signature: onClear: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onClear", function (){
    //any custom logic here
});
~~~

### Related API
- [clearAll](api/method/clearall.md)

