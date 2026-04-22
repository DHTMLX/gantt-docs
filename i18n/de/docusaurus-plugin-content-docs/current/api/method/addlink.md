---
sidebar_label: addLink
title: addLink Methode
description: "fügt eine neue Abhängigkeitsverknüpfung hinzu"
---

# addLink

### Description

@short: Fügt eine neue Abhängigkeitsverknüpfung hinzu

@signature: addLink: (link: any) =\> string | number

### Parameters

- `link` - (erforderlich) *Objekt* - das Link-Objekt

### Returns
- `id` - (string | number) - die ID des Links

### Example

~~~jsx
var linkId = gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:gantt.config.links.finish_to_start
});
~~~

### Details

Die Methode löst die Ereignisse [onBeforeLinkAdd](api/event/onbeforelinkadd.md) und [onAfterLinkAdd](api/event/onafterlinkadd.md) aus.

### Related API
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)
- [addTask](api/method/addtask.md)

### Related Guides
- [Adding/Updating/Deleting Links](guides/crud-dependency.md)