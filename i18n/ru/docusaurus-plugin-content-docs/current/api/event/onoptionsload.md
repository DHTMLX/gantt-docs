---
sidebar_label: onOptionsLoad
title: onOptionsLoad event
description: "срабатывает сразу после загрузки набора опций с сервера, но до их парсинга"
---

# onOptionsLoad

### Description

@short: Срабатывает сразу после загрузки набора опций с сервера, но до их парсинга

@signature: onOptionsLoad: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onOptionsLoad", function (){
    //любая пользовательская логика здесь
});
~~~

### Details

Это событие происходит при вызове [updateCollection](api/method/updatecollection.md) или при парсинге [JSON с дополнительной информацией](guides/supported-data-formats.md#jsonwithcollections).

### Related API
- [serverList](api/method/serverlist.md)
- [updateCollection](api/method/updatecollection.md)

