---
sidebar_label: changeLinkId
title: changeLinkId method
description: "aktualisiert die ID des Links"
---

# changeLinkId

### Description

@short: Aktualisiert die ID des Links

@signature: changeLinkId: (id: string | number, new_id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -     die aktuelle ID des Links
- `new_id` - (required) *string | number* -     die neue ID des Links

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

gantt.changeLinkId(1, 5); //aktualisiert die ID des Links von '1' auf '5' /*!*/
~~~

### Details

Diese Methode löst das Event [onLinkIdChange](api/event/onlinkidchange.md) aus.

### Related API
- [onLinkIdChange](api/event/onlinkidchange.md)
- [changeTaskId](api/method/changetaskid.md)

