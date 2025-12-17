---
sidebar_label: deleteLink
title: deleteLink method
description: "entfernt den angegebenen Abhängigkeits-Link"
---

# deleteLink

### Description

@short: Entfernt den angegebenen Abhängigkeits-Link

@signature: deleteLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -     die ID des Abhängigkeits-Links

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

Diese Methode löst die Events [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) und [onAfterLinkDelete](api/event/onafterlinkdelete.md) aus.

### Related API
- [addLink](api/method/addlink.md)
- [deleteTask](api/method/deletetask.md)
- [onAfterLinkDelete](api/event/onafterlinkdelete.md)

### Related Guides
- ["Hinzufügen/Aktualisieren/Löschen von Verknüpfungen"](guides/crud-dependency.md)

