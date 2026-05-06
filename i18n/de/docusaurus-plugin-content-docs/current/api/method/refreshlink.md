---
sidebar_label: refreshLink
title: refreshLink Methode
description: "aktualisiert den angegebenen Link"
---

# refreshLink

### Description

@short: Aktualisiert den angegebenen Link

@signature: refreshLink: (id: string | number) =\> void

### Parameters

- `id` - (erforderlich) *string | number* - die Link-ID

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

var task = gantt.getLink(1);

task.type = 2; /*!*/
gantt.refreshLink(1);       /*!*/
~~~

### Details

Sie können diese Methode verwenden, um einen Link nach der Änderung seiner Eigenschaften neu zu zeichnen. Im Gegensatz zu [updateLink](api/method/updatelink.md) löst diese Methode keinen DataProcessor aus [DataProcessor](guides/server-side.md), und es werden keine Updates an den Server gesendet.

### Related API
- [refreshTask](api/method/refreshtask.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)