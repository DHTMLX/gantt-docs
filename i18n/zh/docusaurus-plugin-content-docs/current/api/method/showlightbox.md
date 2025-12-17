---
sidebar_label: showLightbox
title: showLightbox method
description: "打开指定任务的lightbox"
---

# showLightbox

### Description

@short: 打开指定任务的lightbox

@signature: showLightbox: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -        任务ID

### Example

~~~jsx
gantt.showLightbox(1);/*!*/

gantt.hideLightbox();
~~~

### Details

此方法会触发 [onBeforeLightbox](api/event/onbeforelightbox.md) 和 [onLightbox](api/event/onlightbox.md) 事件。

### Related API
- [hideLightbox](api/method/hidelightbox.md)

