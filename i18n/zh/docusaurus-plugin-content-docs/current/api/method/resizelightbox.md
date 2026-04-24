---
sidebar_label: resizeLightbox
title: resizeLightbox 方法
description: "强制 lightbox 调整大小"
---

# resizeLightbox

### Description

@short: 强制将 lightbox 调整大小

@signature: resizeLightbox: () =\> void

### Example

~~~jsx
var control = gantt.getLightboxSection("description");
control.header.style.display = "none";

gantt.resizeLightbox();
~~~

### Details

该方法可用于在隐藏/显示某些区域后更新 lightbox 的大小。

### Related API
- [wide_form](api/config/wide_form.md)