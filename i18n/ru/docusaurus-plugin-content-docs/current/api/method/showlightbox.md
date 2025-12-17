---
sidebar_label: showLightbox
title: showLightbox method
description: "открывает лайтбокс для указанной задачи"
---

# showLightbox

### Description

@short: Открывает лайтбокс для указанной задачи

@signature: showLightbox: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -        id задачи

### Example

~~~jsx
gantt.showLightbox(1);/*!*/

gantt.hideLightbox();
~~~

### Details

Этот метод вызывает события [onBeforeLightbox](api/event/onbeforelightbox.md) и [onLightbox](api/event/onlightbox.md).

### Related API
- [hideLightbox](api/method/hidelightbox.md)

