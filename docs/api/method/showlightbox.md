---
sidebar_label: showLightbox
title: showLightbox method
description: "opens the lightbox for the specified task"
---

# showLightbox

### Description

@short: Opens the lightbox for the specified task

@signature: showLightbox: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -        the task id

### Example

~~~jsx
gantt.showLightbox(1);/*!*/

gantt.hideLightbox();
~~~

### Details

The method invokes the [onBeforeLightbox](api/event/onbeforelightbox.md) and [onLightbox](api/event/onlightbox.md) events.

### Related API
- [hideLightbox](api/method/hidelightbox.md)

