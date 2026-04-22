---
sidebar_label: onLinkDblClick
title: onLinkDblClick event
description: "wird ausgelöst, wenn der Benutzer auf einen Link doppelt klickt"
---

# onLinkDblClick

### Description

@short: Wird ausgelöst, wenn der Benutzer auf einen Link doppelt klickt

@signature: onLinkDblClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (erforderlich) *string | number* - die ID des angeklickten Links

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Ereignisses ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLinkDblClick", function(id,e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

Das Event ist blockierbar. Wenn false zurückgegeben wird, wird der Standard-Handler abgebrochen (das Löschen eines Links)

### Related API
- [onLinkClick](api/event/onlinkclick.md)