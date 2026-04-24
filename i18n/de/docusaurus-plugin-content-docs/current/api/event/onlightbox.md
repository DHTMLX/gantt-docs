---
sidebar_label: onLightbox
title: onLightbox-Ereignis
description: "wird ausgelöst, nachdem der Benutzer das Lightbox-Fenster geöffnet hat (Bearbeitungsformular)"
---

# onLightbox

### Description

@short: Wird ausgelöst, nachdem der Benutzer das Lightbox-Fenster geöffnet hat (Bearbeitungsformular)

@signature: onLightbox: (task_id: string | number) =\> void;

### Parameters

- `task_id` - (erforderlich) *string,number* - die ID der Aufgabe, die im Lightbox-Fenster geöffnet wurde

### Example

~~~jsx
gantt.attachEvent("onLightbox", function (task_id){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~