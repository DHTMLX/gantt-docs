---
sidebar_label: onLightbox
title: onLightbox event
description: "Wird ausgelöst, sobald der Benutzer die Lightbox (Bearbeitungsformular) öffnet."
---

# onLightbox

### Description

@short: Wird ausgelöst, sobald der Benutzer die Lightbox (Bearbeitungsformular) öffnet.

@signature: onLightbox: (task_id: string | number) =\> void;

### Parameters

- `task_id` - (required) *string | number* - Die ID der Aufgabe, die in der Lightbox geöffnet wurde.

### Example

~~~jsx
gantt.attachEvent("onLightbox", function (task_id){
    //Hier kann benutzerdefinierte Logik hinzugefügt werden
});
~~~
