---
sidebar_label: onAfterLinkAdd
title: onAfterLinkAdd-Ereignis
description: "Wird ausgelöst, nachdem ein neuer Link zum Gantt-Diagramm hinzugefügt wurde"
---

# onAfterLinkAdd

### Description

@short: Wird ausgelöst, nachdem ein neuer Link zum Gantt-Diagramm hinzugefügt wurde

@signature: onAfterLinkAdd: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (erforderlich) *string | number* - die Link-ID
- `link` - (erforderlich) *Link* - das Link-Objekt

### Example

~~~jsx
gantt.attachEvent("onAfterLinkAdd", function(id,link){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [addLink](api/method/addlink.md)