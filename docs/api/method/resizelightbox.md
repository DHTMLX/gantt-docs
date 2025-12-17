---
sidebar_label: resizeLightbox
title: resizeLightbox method
description: "forces the lightbox to resize"
---

# resizeLightbox

### Description

@short: Forces the lightbox to resize

@signature: resizeLightbox: () =\> void

### Example

~~~jsx
var control = gantt.getLightboxSection("description");
control.header.style.display = "none";
 
gantt.resizeLightbox();
~~~

### Details

The method can be used to update the lightbox size after you hide/show some section.

### Related API
- [wide_form](api/config/wide_form.md)

