---
sidebar_label: onAfterLinkUpdate
title: onAfterLinkUpdate event
description: "fires after the user updates a link"
---

# onAfterLinkUpdate

### Description

@short: Fires after the user updates a link

@signature: onAfterLinkUpdate: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - the link id
- `link` - (required) *Link* - the link object

### Example

~~~jsx
gantt.attachEvent("onAfterLinkUpdate", function(id,link){
    //any custom logic here
});
~~~

### Related API
- [updateLink](api/method/updatelink.md)

