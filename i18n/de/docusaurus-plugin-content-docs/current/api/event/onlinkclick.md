---
sidebar_label: onLinkClick
title: onLinkClick event
description: "Wird ausgelöst, wenn ein Link vom Benutzer angeklickt wird"
---

# onLinkClick

### Description

@short: Wird ausgelöst, wenn ein Link vom Benutzer angeklickt wird

@signature: onLinkClick: (id: string | number, e?: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - die Kennung des angeklickten Links

### Example

~~~jsx
gantt.attachEvent("onLinkClick", function(id,e){
    //hier kann benutzerdefinierte Logik hinzugefügt werden
});
~~~

### Related API
- [onLinkDblClick](api/event/onlinkdblclick.md)

