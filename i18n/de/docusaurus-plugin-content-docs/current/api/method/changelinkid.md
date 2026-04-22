---
sidebar_label: changeLinkId
title: changeLinkId Methode
description: "Ändert die Link-ID"
---

# changeLinkId

### Description

@short: Ändert die Link-ID

@signature: changeLinkId: (id: string | number, new_id: string | number) =\> void

### Parameters

- `id` - (erforderlich) *string | number* -    die aktuelle Link-ID
- `new_id` - (erforderlich) *string | number* -    die neue Link-ID

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

Die Methode löst das Event onLinkIdChange aus.

### Related API
- [onLinkIdChange](api/event/onlinkidchange.md)
- [changeTaskId](api/method/changetaskid.md)