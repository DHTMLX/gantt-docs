---
sidebar_label: onDestroy
title: onDestroy событие
description: "вызывается после того, как gantt очищен методом destructor"
---

# onDestroy

### Description

@short: Вызывается после того, как gantt очищен методом destructor

@signature: onDestroy: () => void;

### Example

~~~jsx
gantt.attachEvent("onDestroy", function(){
   alert("free custom resources");
});

gantt.destructor();
~~~

### Related API
- [destructor](api/method/destructor.md)