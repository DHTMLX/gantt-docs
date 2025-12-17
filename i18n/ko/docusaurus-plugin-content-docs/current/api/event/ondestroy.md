---
sidebar_label: onDestroy
title: onDestroy event
description: "API의 destructor 메서드를 사용하여 간트 차트가 해제될 때 한 번 트리거됩니다."
---

# onDestroy

### Description

@short: API의 [destructor](api/method/destructor.md) 메서드를 사용하여 간트 차트가 해제될 때 한 번 트리거됩니다.

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

