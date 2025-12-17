---
sidebar_label: showCover
title: showCover method
description: "shows the lightbox modal overlay that blocks interactions with the remaining screen"
---

# showCover

### Description

@short: Shows the lightbox modal overlay that blocks interactions with the remaining screen

@signature: showCover: (box?: HTMLElement) =\> void

### Parameters
- `box` - (optional) *HTMLElement* - an element to hide

### Example

~~~jsx
gantt.showCover();
~~~

### Details

If you specify the input parameter, the method will show the specified HTML object element (by setting the display property to "block") centered on the screen.

### Related API
- [hideCover](api/method/hidecover.md)

