---
sidebar_label: onClear
title: onClear event
description: "当通过 [clearAll](api/method/clearall.md) 方法从甘特图中移除所有任务时触发一次"
---

# onClear

### Description

@short: 当通过 [clearAll](api/method/clearall.md) 方法从甘特图中移除所有任务时触发一次

@signature: onClear: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onClear", function (){
    //在此处编写任何自定义逻辑
});
~~~

### Related API
- [clearAll](api/method/clearall.md)

