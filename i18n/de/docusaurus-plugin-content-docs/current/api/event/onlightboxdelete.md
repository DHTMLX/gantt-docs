---
sidebar_label: onLightboxDelete
title: onLightboxDelete Ereignis
description: "löst aus, wenn der Benutzer auf den 'Delete'-Knopf im Lightbox klickt"
---

# onLightboxDelete

### Description

@short: Wird ausgelöst, wenn der Benutzer auf den 'Delete'-Knopf im Lightbox klickt

@signature: onLightboxDelete: (id: string | number) =\> boolean;

### Parameters

- `id` - (erforderlich) *string | number* - die ID der Aufgabe (die im Lightbox geöffnete Aufgabe)

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLightboxDelete", function(id){
    const task = gantt.getTask(id);
    if (task.duration > 60){
        alert("Die Dauer ist zu lang. Bitte versuchen Sie es erneut");
        return false;
    }
    return true;
})
~~~

### Details

Das Ereignis ist blockierbar. Geben Sie false zurück, um die Löschoperation abzubrechen und das Lightbox-Fenster geöffnet zu halten.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxSave](api/event/onlightboxsave.md)