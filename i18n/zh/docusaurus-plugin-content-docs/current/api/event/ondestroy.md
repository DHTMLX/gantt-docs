---
sidebar_label: onDestroy
title: onDestroy event
description: "当通过 destructor 方法清除甘特图后触发一次"
---

# onDestroy

### Description

@short: 当通过 [destructor](api/method/destructor.md) 方法清除甘特图后触发一次

@signature: onDestroy: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onDestroy", function(){
   alert("释放自定义资源");
});

gantt.destructor();
~~~

### Related API
- [destructor](api/method/destructor.md)

