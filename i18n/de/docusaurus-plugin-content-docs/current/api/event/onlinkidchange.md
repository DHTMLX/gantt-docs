---
sidebar_label: onLinkIdChange
title: onLinkIdChange event
description: "Wird ausgelöst, wenn die ID eines Links aktualisiert wird"
---

# onLinkIdChange

### Description

@short: Wird ausgelöst, wenn die ID eines Links aktualisiert wird

@signature: onLinkIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - die bestehende Link-ID
- `new_id` - (required) *string | number* - die aktualisierte Link-ID

### Example

~~~jsx
gantt.attachEvent("onLinkIdChange", function(id,new_id){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Related API
- [changeLinkId](api/method/changelinkid.md)

