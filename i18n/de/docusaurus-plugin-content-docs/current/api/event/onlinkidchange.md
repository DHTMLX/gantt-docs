---
sidebar_label: onLinkIdChange
title: onLinkIdChange event
description: "Wird ausgelöst, wenn die ID eines Links geändert wird"
---

# onLinkIdChange

### Description

@short: Wird ausgelöst, wenn die ID eines Links geändert wird

@signature: onLinkIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (erforderlich) *string | number* - die aktuelle Link-ID
- `new_id` - (erforderlich) *string | number* - die neue Link-ID

### Example

~~~jsx
gantt.attachEvent("onLinkIdChange", function(id,new_id){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [changeLinkId](api/method/changelinkid.md)