---
sidebar_label: onAfterLinkDelete
title: onAfterLinkDelete event
description: "Wird unmittelbar ausgelöst, nachdem ein Link vom Benutzer gelöscht wurde"
---

# onAfterLinkDelete

### Description

@short: Wird unmittelbar ausgelöst, nachdem ein Link vom Benutzer gelöscht wurde

@signature: onAfterLinkDelete: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID des Links
- `link` - (required) *Link* - das Link-Objekt selbst

### Example

~~~jsx
gantt.attachEvent("onAfterLinkDelete", function(id,link){
    //benutzerdefinierte Logik kann hier eingefügt werden
});
~~~

### Related API
- [deleteLink](api/method/deletelink.md)

