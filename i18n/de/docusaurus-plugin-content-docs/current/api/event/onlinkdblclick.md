---
sidebar_label: onLinkDblClick
title: onLinkDblClick event
description: "Wird ausgelöst, wenn ein Link doppelt angeklickt wird"
---

# onLinkDblClick

### Description

@short: Wird ausgelöst, wenn ein Link doppelt angeklickt wird

@signature: onLinkDblClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - Die Kennung des angeklickten Links

### Returns
- ` result` - (boolean) - Bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder verhindert wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLinkDblClick", function(id,e){
    // Hier kann benutzerdefinierte Logik hinzugefügt werden
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Ein Rückgabewert von false verhindert die Standardaktion, welche das Löschen des Links ist.

### Related API
- [onLinkClick](api/event/onlinkclick.md)

