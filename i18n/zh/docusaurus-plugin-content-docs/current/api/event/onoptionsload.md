---
sidebar_label: onOptionsLoad
title: onOptionsLoad event
description: "在从服务器加载完一组选项后触发，但尚未被解析"
---

# onOptionsLoad

### Description

@short: 当从服务器加载完一组选项后触发，但尚未被解析

@signature: onOptionsLoad: () => void;

### Example

~~~jsx
gantt.attachEvent("onOptionsLoad", function (){
    // 在这里插入您的自定义逻辑 
});
~~~

### Details

该事件在调用 [updateCollection](api/method/updatecollection.md) 时触发，或在解析 [JSON with additional info](guides/supported-data-formats.md#jsonwithcollections) 时触发。

### Related API
- [serverList](api/method/serverlist.md)
- [updateCollection](api/method/updatecollection.md)