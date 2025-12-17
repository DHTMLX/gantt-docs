---
sidebar_label: addLink
title: addLink method
description: "adds a new dependency link"
---

# addLink

### Description

@short: Adds a new dependency link

@signature: addLink: (link: any) =\> string | number

### Parameters

- `link` - (required) *object* - the link object

### Returns
- ` id` - (string | number) - the link's id

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

The method invokes the [onBeforeLinkAdd](api/event/onbeforelinkadd.md) and [onAfterLinkAdd](api/event/onafterlinkadd.md) events.

### Related API
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)
- [addTask](api/method/addtask.md)

### Related Guides
- [Adding/Updating/Deleting Links](guides/crud-dependency.md)

