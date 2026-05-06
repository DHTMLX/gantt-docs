---
sidebar_label: onLightboxCancel
title: onLightboxCancel-Ereignis
description: "Auslöst, wenn der Benutzer auf die 'Abbrechen'-Schaltfläche im Lightbox klickt"
---

# onLightboxCancel

### Description

@short: Wird ausgelöst, wenn der Benutzer auf die 'Abbrechen'-Schaltfläche im Lightbox klickt

@signature: onLightboxCancel: (id: string | number) => void;

### Parameters

- `id` - (erforderlich) *string | number* - die Aufgabe-ID (die im Lightbox geöffnete Aufgabe)

### Example

~~~jsx
gantt.attachEvent("onLightboxCancel", function(id){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
})
~~~

### Related Guides
- [onLightboxSave](api/event/onlightboxsave.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)