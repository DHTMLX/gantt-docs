---
sidebar_label: onLightboxCancel
title: onLightboxCancel event
description: "Wird ausgelöst, wenn der Benutzer im Lightbox das 'Cancel'-Button drückt"
---

# onLightboxCancel

### Description

@short: Wird ausgelöst, wenn der Benutzer im Lightbox das 'Cancel'-Button drückt

@signature: onLightboxCancel: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - die Task-ID (der aktuell in der Lightbox geöffnete Task)

### Example

~~~jsx
gantt.attachEvent("onLightboxCancel", function(id){
    //beliebige benutzerdefinierte Logik hier
})
~~~

### Related Guides
- [onLightboxSave](api/event/onlightboxsave.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)

