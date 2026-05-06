---
sidebar_label: onLightboxChange
title: onLightboxChange-Ereignis
description: "Wird ausgelöst, wenn sich die Struktur der Lightbox ändert"
---

# onLightboxChange

### Description

@short: Wird ausgelöst, wenn sich die Struktur der Lightbox ändert

@signature: onLightboxChange: (old_type: string, new_type: string) =\> void;

### Parameters

- `old_type` - (erforderlich) *string* - der Name der ursprünglichen Lightbox-Struktur
- `new_type` - (erforderlich) *string* - der Name der neuen Lightbox-Struktur

### Example

~~~jsx
gantt.attachEvent("onLightboxChange", function(old_type, new_type){
    if(new_type == "milestone"){
        alert("Sie haben den Typ Ihrer Aufgabe auf 'milestone' geändert")
    }
});
~~~