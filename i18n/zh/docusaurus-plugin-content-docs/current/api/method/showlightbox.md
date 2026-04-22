---
sidebar_label: showLightbox
title: showLightbox 方法
description: "打开指定任务的 lightbox"
---

# showLightbox

### Description

@short: 打开指定任务的 lightbox

@signature: showLightbox: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -        任务 ID

### Example

~~~jsx
gantt.showLightbox(1);/*!*/

gantt.hideLightbox();
~~~

### Details

该方法会触发 [onBeforeLightbox](api/event/onbeforelightbox.md) 与 [onLightbox](api/event/onlightbox.md) 事件。

### Related API
- [hideLightbox](api/method/hidelightbox.md)