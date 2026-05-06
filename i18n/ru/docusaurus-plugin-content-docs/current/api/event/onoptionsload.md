--- 
sidebar_label: onOptionsLoad
title: onOptionsLoad событие
description: "Срабатывает после того, как коллекция опций была загружена с сервера, но ещё не разобрана."
---

# onOptionsLoad

### Description

@short: Срабатывает после загрузки коллекции опций с сервера, но ещё не разобрана

@signature: onOptionsLoad: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onOptionsLoad", function (){
    // любая ваша логика здесь
});
~~~

### Details

Событие срабатывает, когда вызывается [updateCollection](api/method/updatecollection.md) или когда [JSON с дополнительной информацией](guides/supported-data-formats.md#jsonwithcollections) парсится.

### Related API
- [serverList](api/method/serverlist.md)
- [updateCollection](api/method/updatecollection.md)