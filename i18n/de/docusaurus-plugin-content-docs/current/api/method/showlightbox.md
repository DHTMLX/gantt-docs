---
sidebar_label: showLightbox
title: showLightbox method
description: "öffnet die Lightbox für die angegebene Aufgabe"
---

# showLightbox

### Description

@short: Öffnet die Lightbox für die angegebene Aufgabe

@signature: showLightbox: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -        die Aufgaben-ID

### Example

~~~jsx
gantt.showLightbox(1);/*!*/

gantt.hideLightbox();
~~~

### Details

Diese Methode löst die Events [onBeforeLightbox](api/event/onbeforelightbox.md) und [onLightbox](api/event/onlightbox.md) aus.

### Related API
- [hideLightbox](api/method/hidelightbox.md)

