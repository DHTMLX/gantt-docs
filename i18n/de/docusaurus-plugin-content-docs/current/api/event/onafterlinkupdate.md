---
sidebar_label: onAfterLinkUpdate
title: onAfterLinkUpdate event
description: "wird ausgelöst, nachdem der Benutzer einen Link aktualisiert hat"
---

# onAfterLinkUpdate

### Description

@short: Fires after the user updates a link

@signature: onAfterLinkUpdate: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (erforderlich) *string | number* - die Link-ID
- `link` - (erforderlich) *Link* - das Link-Objekt

### Example

~~~jsx
gantt.attachEvent("onAfterLinkUpdate", function(id,link){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [updateLink](api/method/updatelink.md)