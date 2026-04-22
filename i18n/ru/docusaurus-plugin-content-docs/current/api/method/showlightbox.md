---
sidebar_label: showLightbox
title: метод showLightbox
description: "открывает lightbox для указанной задачи"
---

# showLightbox

### Description

@short: Открывает lightbox для указанной задачи

@signature: showLightbox: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* - идентификатор задачи

### Example

~~~jsx
gantt.showLightbox(1);/*!*/

gantt.hideLightbox();
~~~

### Details

Метод вызывает события [onBeforeLightbox](api/event/onbeforelightbox.md) и [onLightbox](api/event/onlightbox.md).

### Related API
- [hideLightbox](api/method/hidelightbox.md)