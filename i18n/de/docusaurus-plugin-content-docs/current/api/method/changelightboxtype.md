---
sidebar_label: changeLightboxType
title: changeLightboxType method
description: "zeichnet das Lightbox-Fenster der Aufgabe entsprechend ihrem Typ neu"
---

# changeLightboxType

### Description

@short: Zeichnet das Lightbox-Fenster der Aufgabe entsprechend ihrem Typ neu

@signature: changeLightboxType: (type: string) =\> void

### Parameters

- `type` - (required) *string* - der Aufgabentyp

### Example

~~~jsx
gantt.changeLightboxType(gantt.config.types.project);
~~~

### Details

Die Methode zeichnet das Lightbox-Fenster neu und speichert, falls möglich, alle Eingaben. Zur Neukonstruktion der Struktur verwendet die Methode die [Konfiguration für den angegebenen Typ](guides/default-edit-form.md).

Wenn der Typ des Lightbox-Fensters dem Typ im Parameter entspricht, zeichnet die Methode das Lightbox-Fenster nicht neu.

### Related API
- [onLightboxChange](api/event/onlightboxchange.md)