---
sidebar_label: onLightboxSave
title: onLightboxSave event
description: "Wird ausgelöst, wenn der Benutzer im Lightbox-Fenster auf die Schaltfläche 'Save' klickt"
---

# onLightboxSave

### Description

@short: Wird ausgelöst, wenn der Benutzer im Lightbox-Fenster auf die Schaltfläche 'Save' klickt

@signature: onLightboxSave: (id: string | number, task: Task, is_new: boolean) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der unveränderten Aufgabe. Beachten Sie, dass zu diesem Zeitpunkt die Werte aus der Lightbox noch nicht auf das Aufgabenobjekt angewendet wurden, daher können Sie die ursprüngliche Aufgabe mit gantt.getTask(id) abrufen
- `task` - (required) *Task* - das aktualisierte Aufgabenobjekt
- `is_new` - (required) *boolean* - zeigt an, ob die Lightbox zum Erstellen einer neuen Aufgabe geöffnet wurde (<i>true</i>)<br> oder zum Bearbeiten einer bestehenden (<i>false</i>)

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
    // benutzerdefinierte Logik kann hier hinzugefügt werden
    return true;
})
~~~

### Details

Dieses Event kann blockiert werden. Wenn *false* zurückgegeben wird, wird die 'Save'-Operation abgebrochen und die Lightbox bleibt geöffnet.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)

