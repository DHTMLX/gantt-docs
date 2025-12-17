---
sidebar_label: onLinkIdChange
title: onLinkIdChange event
description: "fires when the id of a link is changed"
---

# onLinkIdChange

### Description

@short: Fires when the id of a link is changed

@signature: onLinkIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - the current link id
- `new_id` - (required) *string | number* - the new link id

### Example

~~~jsx
gantt.attachEvent("onLinkIdChange", function(id,new_id){
    //any custom logic here
});
~~~

### Related API
- [changeLinkId](api/method/changelinkid.md)

