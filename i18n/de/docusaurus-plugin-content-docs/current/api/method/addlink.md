---
sidebar_label: addLink
title: addLink method
description: "Fügt einen neuen Abhängigkeitslink hinzu"
---

# addLink

### Description

@short: Fügt einen neuen Abhängigkeitslink hinzu

@signature: addLink: (link: any) =\> string | number

### Parameters

- `link` - (required) *object* - Das Link-Objekt

### Returns
- ` id` - (string | number) - Die ID des Links

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

Diese Methode löst die Events [onBeforeLinkAdd](api/event/onbeforelinkadd.md) und [onAfterLinkAdd](api/event/onafterlinkadd.md) aus.

### Related API
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)
- [addTask](api/method/addtask.md)

### Related Guides
- ["Hinzufügen/Aktualisieren/Löschen von Verknüpfungen"](guides/crud-dependency.md)

