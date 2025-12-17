---
sidebar_label: refreshLink
title: refreshLink method
description: "aktualisiert den angegebenen Link"
---

# refreshLink

### Description

@short: Aktualisiert den angegebenen Link

@signature: refreshLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    die Link-ID

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

Diese Methode wird verwendet, um einen Link neu zu zeichnen, nachdem seine Eigenschaften geändert wurden. Im Gegensatz zu [updateLink](api/method/updatelink.md) aktiviert sie nicht den [DataProcessor](guides/server-side.md), daher werden keine Änderungen an den Server gesendet.

### Related API
- [refreshTask](api/method/refreshtask.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)

