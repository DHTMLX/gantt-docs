---
sidebar_label: resizeLightbox
title: resizeLightbox method
description: "强制 lightbox 重新调整大小"
---

# resizeLightbox

### Description

@short: 强制 lightbox 重新调整大小

@signature: resizeLightbox: () =\> void

### Example

~~~jsx
var control = gantt.getLightboxSection("description");
control.header.style.display = "none";
 
gantt.resizeLightbox();
~~~

### Details

当您更改任何 section 的可见性时，此方法会更新 lightbox 的大小。

### Related API
- [wide_form](api/config/wide_form.md)

