---
sidebar_label: changeLightboxType
title: changeLightboxType method
description: "aktualisiert die Lightbox für die Aufgabe basierend auf ihrem Typ"
---

# changeLightboxType

### Description

@short: Aktualisiert die Lightbox für die Aufgabe basierend auf ihrem Typ

@signature: changeLightboxType: (type: string) =\> void

### Parameters

- `type` - (required) *string* - der Aufgabentyp

### Example

~~~jsx
gantt.changeLightboxType(gantt.config.types.project);
~~~

### Details

Diese Methode aktualisiert die Lightbox und versucht, eingegebene Daten, falls möglich, zu speichern. Sie baut die Struktur basierend auf der [Konfiguration für den angegebenen Typ](guides/default-edit-form.md) neu auf.

Wenn der aktuelle Lightbox-Typ mit dem als Parameter übergebenen Typ übereinstimmt, wird keine Aktualisierung durchgeführt.

### Related API
- [onLightboxChange](api/event/onlightboxchange.md)

