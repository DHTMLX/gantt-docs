---
sidebar_label: onClear
title: onClear 事件
description: "通过 [clearAll](api/method/clearall.md) 方法将甘特图中的所有任务移除后触发"
---

# onClear

### Description

@short: 在通过 [clearAll](api/method/clearall.md) 方法从甘特图中移除所有任务后触发

@signature: onClear: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onClear", function (){
    // 在这里插入您的自定义逻辑 
});
~~~

### Related API
- [clearAll](api/method/clearall.md)