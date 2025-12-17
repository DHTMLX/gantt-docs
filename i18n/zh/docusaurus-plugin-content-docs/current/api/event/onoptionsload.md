---
sidebar_label: onOptionsLoad
title: onOptionsLoad event
description: "在从服务器加载一组选项后立即触发，但在解析它们之前触发"
---

# onOptionsLoad

### Description

@short: 在从服务器加载一组选项后立即触发，但在解析它们之前触发

@signature: onOptionsLoad: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onOptionsLoad", function (){
    //在这里编写任何自定义逻辑
});
~~~

### Details

当调用 [updateCollection](api/method/updatecollection.md) 或解析[带有附加信息的 JSON](guides/supported-data-formats.md)时，会触发此事件。

### Related API
- [serverList](api/method/serverlist.md)
- [updateCollection](api/method/updatecollection.md)

