---
sidebar_label: hideCover
title: hideCover method
description: "entfernt die Lightbox-Modal-Überlagerung, die die Interaktion mit dem restlichen Bildschirm verhindert"
---

# hideCover

### Description

@short: Entfernt die Lightbox-Modal-Überlagerung, die die Interaktion mit dem restlichen Bildschirm verhindert

@signature: hideCover: (box?: HTMLElement) =\> void

### Parameters
- `box` - (optional) *HTMLElement* - das Element, das ausgeblendet werden soll

### Example

~~~jsx
gantt.hideCover(gantt.getLightbox());
~~~

### Details

Wenn Sie den Eingabeparameter angeben, blendet diese Methode das übergebene HTML-Element aus, indem sie dessen display-Eigenschaft auf "none" setzt.

### Related API
- [showCover](api/method/showcover.md)

