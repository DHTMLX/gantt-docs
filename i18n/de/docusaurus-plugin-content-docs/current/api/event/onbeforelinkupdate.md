---
sidebar_label: onBeforeLinkUpdate
title: onBeforeLinkUpdate event
description: "fires before a link is updated"
---

# onBeforeLinkUpdate

### Description

@short: Löst vor der Aktualisierung eines Links aus

@signature: onBeforeLinkUpdate: (id: string | number, new_link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die Link-ID
- `new_link` - (required) *Link* - das neue (aktualisierte) Objekt des Links

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Ereignisses ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkUpdate", function(id,new_link){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

Das Ereignis kann blockiert werden. Geben Sie false zurück, um die Aktualisierung des Links abzubrechen.

### Related API
- [updateLink](api/method/updatelink.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)