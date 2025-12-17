---
sidebar_label: onBeforeLinkDelete
title: onBeforeLinkDelete event
description: "Wird ausgelöst, kurz bevor ein Link vom Benutzer gelöscht wird"
---

# onBeforeLinkDelete

### Description

@short: Wird ausgelöst, kurz bevor ein Link vom Benutzer gelöscht wird

@signature: onBeforeLinkDelete: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - Die Kennung des Links
- `link` - (required) *Link* - Das Link-Objekt selbst

### Returns
- ` result` - (boolean) - Bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDelete", function(id,link){
    // Hier kann benutzerdefinierte Logik hinzugefügt werden
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Wenn false zurückgegeben wird, wird das Löschen des Links verhindert.

### Related API
- [deleteLink](api/method/deletelink.md)

