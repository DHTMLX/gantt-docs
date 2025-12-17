---
sidebar_label: onBeforeLinkUpdate
title: onBeforeLinkUpdate event
description: "Wird ausgelöst, kurz bevor ein Link aktualisiert wird"
---

# onBeforeLinkUpdate

### Description

@short: Wird ausgelöst, kurz bevor ein Link aktualisiert wird

@signature: onBeforeLinkUpdate: (id: string | number, new_link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID des Links
- `new_link` - (required) *Link* - das aktualisierte Link-Objekt

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events ausgeführt werden soll (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkUpdate", function(id,new_link){
    // Hier kann benutzerdefinierte Logik hinzugefügt werden
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Wenn false zurückgegeben wird, wird die Aktualisierung des Links verhindert.

### Related API
- [updateLink](api/method/updatelink.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)

