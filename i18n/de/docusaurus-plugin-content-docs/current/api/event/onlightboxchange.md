---
sidebar_label: onLightboxChange
title: onLightboxChange event
description: "wird ausgelöst, wenn die Lightbox-Struktur aktualisiert wird"
---

# onLightboxChange

### Description

@short: Wird ausgelöst, wenn die Lightbox-Struktur aktualisiert wird

@signature: onLightboxChange: (old_type: string, new_type: string) =\> void;

### Parameters

- `old_type` - (required) *string* - der Name der ursprünglichen Lightbox-Struktur
- `new_type` - (required) *string* - der Name der aktualisierten Lightbox-Struktur

### Example

~~~jsx
gantt.attachEvent("onLightboxChange", function(old_type, new_type){
    if(new_type == "milestone"){
        alert("Sie haben den Typ Ihrer Aufgabe auf 'milestone' geändert")
    }
});
~~~
