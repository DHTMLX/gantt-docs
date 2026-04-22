---
sidebar_label: onAfterLinkDelete
title: onAfterLinkDelete-Ereignis
description: "wird ausgelöst, nachdem der Benutzer einen Link gelöscht hat"
---

# onAfterLinkDelete

### Description

@short: Wird ausgelöst, nachdem der Benutzer einen Link gelöscht hat

@signature: onAfterLinkDelete: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - die Link-ID
- `link` - (required) *Link* - das Link-Objekt

### Example

~~~jsx
gantt.attachEvent("onAfterLinkDelete", function(id,link){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [deleteLink](api/method/deletelink.md)