---
sidebar_label: resizeLightbox
title: resizeLightbox method
description: "Erzwingt die Größenänderung der Lightbox"
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

Diese Methode aktualisiert die Größe der Lightbox, sobald Sie die Sichtbarkeit eines beliebigen Abschnitts ändern.

### Related API
- [wide_form](api/config/wide_form.md)

