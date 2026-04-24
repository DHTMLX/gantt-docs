---
sidebar_label: deleteLink
title: deleteLink Methode
description: "löscht den angegebenen Abhängigkeitslink"
---

# deleteLink

### Description

@short: Löscht den angegebenen Abhängigkeitslink

@signature: deleteLink: (id: string | number) =\> void

### Parameters

- `id` - (erforderlich) *string | number* - die ID des Abhängigkeitslinks

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

gantt.deleteLink(1); /*!*/
~~~

### Details

Die Methode ruft die Ereignisse [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) und [onAfterLinkDelete](api/event/onafterlinkdelete.md) auf.

### Related API
- [addLink](api/method/addlink.md)
- [deleteTask](api/method/deletetask.md)
- [onAfterLinkDelete](api/event/onafterlinkdelete.md)

### Related Guides
- [Hinzufügen/Aktualisieren/Löschen von Verknüpfungen](guides/crud-dependency.md)