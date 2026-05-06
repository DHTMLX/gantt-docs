--- 
sidebar_label: onDestroy
title: onDestroy 이벤트
description: "gantt가 destructor 메서드에 의해 정리된 후 호출됩니다"
---

# onDestroy

### Description

@short: gantt가 소멸자 메서드에 의해 정리된 후 호출됩니다

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