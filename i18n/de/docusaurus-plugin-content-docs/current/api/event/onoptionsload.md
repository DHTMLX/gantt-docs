---
sidebar_label: onOptionsLoad
title: onOptionsLoad event
description: "Wird ausgelöst, nachdem eine Sammlung von Optionen vom Server geladen wurde, aber noch nicht geparst wurde"
---

# onOptionsLoad

### Description

@short: Wird ausgelöst, nachdem eine Sammlung von Optionen vom Server geladen wurde, aber noch nicht geparst wurde

@signature: onOptionsLoad: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onOptionsLoad", function (){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Details

Das Ereignis wird ausgelöst, wenn [updateCollection](api/method/updatecollection.md) aufgerufen wird oder wenn [JSON with additional info](guides/supported-data-formats.md#jsonwithcollections) geparst wird.

### Related API
- [serverList](api/method/serverlist.md)
- [updateCollection](api/method/updatecollection.md)