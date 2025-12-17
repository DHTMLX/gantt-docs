---
sidebar_label: onAfterLinkUpdate
title: onAfterLinkUpdate event
description: "Wird unmittelbar ausgelöst, nachdem ein Benutzer einen Link geändert hat"
---

# onAfterLinkUpdate

### Description

@short: Wird unmittelbar ausgelöst, nachdem ein Benutzer einen Link geändert hat

@signature: onAfterLinkUpdate: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - die eindeutige Kennung des Links
- `link` - (required) *Link* - das aktualisierte Link-Objekt

### Example

~~~jsx
gantt.attachEvent("onAfterLinkUpdate", function(id,link){
    //benutzerdefinierte Logik kann hier eingefügt werden
});
~~~

### Related API
- [updateLink](api/method/updatelink.md)

