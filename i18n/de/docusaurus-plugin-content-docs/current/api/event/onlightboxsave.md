---
sidebar_label: onLightboxSave
title: onLightboxSave event
description: "Wird ausgelöst, wenn der Benutzer auf die 'Speichern'-Schaltfläche in der Lightbox klickt"
---

# onLightboxSave

### Description

@short: Wird ausgelöst, wenn der Benutzer auf die 'Speichern'-Schaltfläche in der Lightbox klickt

@signature: onLightboxSave: (id: string | number, task: Task, is_new: boolean) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der unveränderten Aufgabe. Hinweis: Zu diesem Zeitpunkt werden die Werte der Lightbox noch nicht auf das Task-Objekt angewendet, und Sie können die anfängliche Aufgabe über gantt.getTask(id) abrufen
- `task` - (required) *Task* - das modifizierte Task-Objekt
- `is_new` - (required) *boolean* - gibt an, ob der Benutzer die Lightbox öffnet, um eine neue Aufgabe zu erstellen (<i>true</i>)<br/> oder eine vorhandene zu aktualisieren (<i>false</i>)

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Ereignisses ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
})
~~~

### Details

Das Ereignis ist blockierbar. Geben Sie zurück *false*, um die 'Speichern'-Operation abzubrechen und die Lightbox geöffnet zu halten.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)