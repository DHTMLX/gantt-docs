---
sidebar_label: resizeLightbox
title: resizeLightbox Methode
description: "erzwingt die Größenänderung der Lightbox"
---

# resizeLightbox

### Description

@short: Erzwingt die Größenänderung der Lightbox

@signature: resizeLightbox: () =\> void

### Example

~~~jsx
var control = gantt.getLightboxSection("description");
control.header.style.display = "none";
 
gantt.resizeLightbox();
~~~

### Details

Die Methode kann verwendet werden, die Größe der Lightbox zu aktualisieren, nachdem Sie einige Abschnitte ausgeblendet/angezeigt haben.

### Related API
- [wide_form](api/config/wide_form.md)