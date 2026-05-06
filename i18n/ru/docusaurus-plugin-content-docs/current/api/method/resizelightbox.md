---
sidebar_label: resizeLightbox
title: Метод resizeLightbox
description: "заставляет лайтбокс изменить размер"
---

# resizeLightbox

### Description

@short: Приводит к изменению размера лайтбокса

@signature: resizeLightbox: () =\> void

### Example

~~~jsx
var control = gantt.getLightboxSection("description");
control.header.style.display = "none";
 
gantt.resizeLightbox();
~~~

### Details

Метод можно использовать для обновления размера лайтбокса после скрытия/показа некоторых секций.

### Related API
- [wide_form](api/config/wide_form.md)