---
sidebar_label: hideCover
title: hideCover Methode
description: "verbirgt das Lightbox-Modaloverlay, das Interaktionen mit dem restlichen Bildschirm blockiert"
---

# hideCover

### Description

@short: Verbirgt das Lightbox-Modaloverlay, das Interaktionen mit dem restlichen Bildschirm blockiert

@signature: hideCover: (box?: HTMLElement) =\> void

### Parameters
- `box` - (optional) *HTMLElement* - das Element, das ausgeblendet werden soll

### Example

~~~jsx
gantt.hideCover(gantt.getLightbox());
~~~

### Details

Wenn Sie den Eingabeparameter angeben, blendet die Methode das angegebene HTML-Objekt-Element aus (indem die Display-Eigenschaft auf "none" gesetzt wird).

### Related API
- [showCover](api/method/showcover.md)