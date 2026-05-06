---
sidebar_label: onAfterLightbox
title: onAfterLightbox-Ereignis
description: "wird ausgelöst, nachdem der Benutzer das Lightbox-Fenster (Bearbeitungsformular) geschlossen hat"
---

# onAfterLightbox

### Description

@short: Wird ausgelöst, nachdem der Benutzer das Lightbox-Fenster (Bearbeitungsformular) geschlossen hat

@signature: onAfterLightbox: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onAfterLightbox", function (){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~