---
sidebar_label: showLightbox
title: showLightbox Methode
description: "öffnet das Lightbox-Fenster für die angegebene Aufgabe"
---

# showLightbox

### Description

@short: Öffnet das Lightbox-Fenster für die angegebene Aufgabe

@signature: showLightbox: (id: string | number) =\> void

### Parameters

- `id` - (erforderlich) *string | number* -        die Aufgaben-ID

### Example

~~~jsx
gantt.showLightbox(1);/*!*/

gantt.hideLightbox();
~~~

### Details

Die Methode ruft die Ereignisse [onBeforeLightbox](api/event/onbeforelightbox.md) und [onLightbox](api/event/onlightbox.md) auf.

### Related API
- [hideLightbox](api/method/hidelightbox.md)