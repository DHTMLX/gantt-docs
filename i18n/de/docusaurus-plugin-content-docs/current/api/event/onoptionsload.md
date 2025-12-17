---
sidebar_label: onOptionsLoad
title: onOptionsLoad event
description: "Wird ausgelöst, direkt nachdem ein Satz von Optionen vom Server geladen wurde, aber bevor diese geparst werden."
---

# onOptionsLoad

### Description

@short: Wird ausgelöst, direkt nachdem ein Satz von Optionen vom Server geladen wurde, aber bevor diese geparst werden.

@signature: onOptionsLoad: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onOptionsLoad", function (){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Details

Dieses Event tritt auf, wenn [updateCollection](api/method/updatecollection.md) aufgerufen wird oder wenn [JSON mit zusätzlichen Informationen](guides/supported-data-formats.md#jsonwithcollections) geparst wird.

### Related API
- [serverList](api/method/serverlist.md)
- [updateCollection](api/method/updatecollection.md)

