---
sidebar_label: changeLinkId
title: changeLinkId method
description: "changes the link's id"
---

# changeLinkId

### Description

@short: Changes the link's id

@signature: changeLinkId: (id: string | number, new_id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    the current link's id
- `new_id` - (required) *string | number* -    the new link's id

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

gantt.changeLinkId(1, 5); //changes the link's id '1 -> 5' /*!*/
~~~

### Details

The method fires the [onLinkIdChange](api/event/onlinkidchange.md) event.

### Related API
- [onLinkIdChange](api/event/onlinkidchange.md)
- [changeTaskId](api/method/changetaskid.md)

