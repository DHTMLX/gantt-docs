---
sidebar_label: onLinkClick
title: onLinkClick Event
description: "Wird ausgelöst, wenn der Benutzer auf einen Link klickt"
---

# onLinkClick

### Description

@short: Wird ausgelöst, wenn der Benutzer auf einen Link klickt

@signature: onLinkClick: (id: string | number, e?: Event) => void;

### Parameters

- `id` - (erforderlich) *string | number* - die ID des angeklickten Links

### Example

~~~jsx
gantt.attachEvent("onLinkClick", function(id,e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [onLinkDblClick](api/event/onlinkdblclick.md)