---
sidebar_label: resizeLightbox
title: resizeLightbox method
description: "принудительно изменяет размер lightbox"
---

# resizeLightbox

### Description

@short: Принудительно изменяет размер lightbox

@signature: resizeLightbox: () =\> void

### Example

~~~jsx
var control = gantt.getLightboxSection("description");
control.header.style.display = "none";
 
gantt.resizeLightbox();
~~~

### Details

Этот метод обновляет размер lightbox каждый раз, когда вы изменяете видимость любой секции.

### Related API
- [wide_form](api/config/wide_form.md)

