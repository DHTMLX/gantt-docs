---
sidebar_label: onOptionsLoad
title: onOptionsLoad event
description: "fires after a collection of options has been loaded from the server, but isn't parsed yet"
---

# onOptionsLoad

### Description

@short: Fires after a collection of options has been loaded from the server, but isn't parsed yet

@signature: onOptionsLoad: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onOptionsLoad", function (){
    //any custom logic here
});
~~~

### Details

The event fires when [updateCollection](api/method/updatecollection.md) is called or when [JSON with additional info](guides/supported-data-formats.md#jsonwithcollections) is parsed.

### Related API
- [serverList](api/method/serverlist.md)
- [updateCollection](api/method/updatecollection.md)

