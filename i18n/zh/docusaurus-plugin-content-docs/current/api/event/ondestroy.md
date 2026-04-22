---
sidebar_label: onDestroy
title: onDestroy 事件
description: "在 gantt 已被 [destructor](api/method/destructor.md) 清空后调用"
---

# onDestroy

### Description

@short: 在 gantt 已被 [destructor](api/method/destructor.md) 方法清空后调用

@signature: onDestroy: () => void;

### Example

~~~jsx
gantt.attachEvent("onDestroy", function(){
   alert("释放自定义资源");
});

gantt.destructor();
~~~  

### Related API
- [destructor](api/method/destructor.md)