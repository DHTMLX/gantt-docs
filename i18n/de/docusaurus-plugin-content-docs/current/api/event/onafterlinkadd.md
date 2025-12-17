---
sidebar_label: onAfterLinkAdd
title: onAfterLinkAdd event
description: "Wird unmittelbar ausgelöst, nachdem ein neuer Link zum Gantt-Diagramm hinzugefügt wurde"
---

# onAfterLinkAdd

### Description

@short: Wird unmittelbar ausgelöst, nachdem ein neuer Link zum Gantt-Diagramm hinzugefügt wurde

@signature: onAfterLinkAdd: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string,number* - die ID des Links
- `link` - (required) *Link* - das Link-Objekt selbst

### Example

~~~jsx
gantt.attachEvent("onAfterLinkAdd", function(id,link){
    //hier kann benutzerdefinierte Logik eingefügt werden
});
~~~

### Related API
- [addLink](api/method/addlink.md)

