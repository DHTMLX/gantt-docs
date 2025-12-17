---
sidebar_label: onAfterLinkAdd
title: onAfterLinkAdd event
description: "fires after a new link is added to the Gantt chart"
---

# onAfterLinkAdd

### Description

@short: Fires after a new link is added to the Gantt chart

@signature: onAfterLinkAdd: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - the link id
- `link` - (required) *Link* - the link object

### Example

~~~jsx
gantt.attachEvent("onAfterLinkAdd", function(id,link){
    //any custom logic here
});
~~~

### Related API
- [addLink](api/method/addlink.md)

