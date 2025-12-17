---
sidebar_label: refreshLink
title: refreshLink method
description: "refreshes the specifies link"
---

# refreshLink

### Description

@short: Refreshes the specifies link

@signature: refreshLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -     the link id

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

You can use this method to repaint a link after changing its properties. Unlike [updateLink](api/method/updatelink.md), this method does not trigger the [DataProcessor](guides/server-side.md), and no updates will be sent to the server.

### Related API
- [refreshTask](api/method/refreshtask.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)

