---
sidebar_label: onAfterLinkDelete
title: onAfterLinkDelete event
description: "fires after the user deletes a link"
---

# onAfterLinkDelete

### Description

@short: Fires after the user deletes a link

@signature: onAfterLinkDelete: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - the link id
- `link` - (required) *Link* - the link object

### Example

~~~jsx
gantt.attachEvent("onAfterLinkDelete", function(id,link){
    //any custom logic here
});
~~~

### Related API
- [deleteLink](api/method/deletelink.md)

