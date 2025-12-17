---
sidebar_label: onLightboxDelete
title: onLightboxDelete event
description: "Wird ausgelöst, wenn der Benutzer im Lightbox auf die Schaltfläche 'Delete' klickt"
---

# onLightboxDelete

### Description

@short: Wird ausgelöst, wenn der Benutzer im Lightbox auf die Schaltfläche „Delete" klickt

@signature: onLightboxDelete: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe (die aktuell in der Lightbox geöffnete Aufgabe)

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder verhindert wird (<b>false</b>)

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

Dieses Event kann blockiert werden. Wenn *false* zurückgegeben wird, wird die „Delete"-Aktion abgebrochen und die Lightbox bleibt sichtbar.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxSave](api/event/onlightboxsave.md)

