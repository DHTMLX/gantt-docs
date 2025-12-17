---
sidebar_label: onLightboxCancel
title: onLightboxCancel event
description: "fires when the user clicks on the 'Cancel' button in the lightbox"
---

# onLightboxCancel

### Description

@short: Fires when the user clicks on the 'Cancel' button in the lightbox

@signature: onLightboxCancel: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - the task id ( the task opened in the lightbox)

### Example

~~~jsx
gantt.attachEvent("onLightboxCancel", function(id){
    //any custom logic here
})
~~~

### Related Guides
- [onLightboxSave](api/event/onlightboxsave.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)

