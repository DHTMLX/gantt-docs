---
sidebar_label: deleteLink
title: deleteLink method
description: "deletes the specified dependency link"
---

# deleteLink

### Description

@short: Deletes the specified dependency link

@signature: deleteLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    the dependency link's id

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

The method invokes the [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) and [onAfterLinkDelete](api/event/onafterlinkdelete.md) events.

### Related API
- [addLink](api/method/addlink.md)
- [deleteTask](api/method/deletetask.md)
- [onAfterLinkDelete](api/event/onafterlinkdelete.md)

### Related Guides
- [Adding/Updating/Deleting Links](guides/crud-dependency.md)

