---
sidebar_label: onDestroy
title: onDestroy event
description: "called after gantt has been cleared by the destructor method"
---

# onDestroy

### Description

@short: Called after gantt has been cleared by the [destructor](api/method/destructor.md) method

@signature: onDestroy: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onDestroy", function(){
   alert("free custom resources");
});

gantt.destructor();
~~~

### Related API
- [destructor](api/method/destructor.md)

