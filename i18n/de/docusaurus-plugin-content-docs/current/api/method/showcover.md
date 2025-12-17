---
sidebar_label: showCover
title: showCover method
description: "zeigt das Lightbox-Modal-Overlay an, das die Interaktion mit dem restlichen Bildschirm verhindert"
---

# showCover

### Description

@short: Zeigt das Lightbox-Modal-Overlay an, das die Interaktion mit dem restlichen Bildschirm verhindert

@signature: showCover: (box?: HTMLElement) =\> void

### Parameters
- `box` - (optional) *HTMLElement* - ein anzuzeigendes Element

### Example

~~~jsx
gantt.showCover();
~~~

### Details

Wenn ein Eingabeparameter übergeben wird, zeigt die Methode das angegebene HTML-Element an, indem sie dessen display-Eigenschaft auf "block" setzt und es auf dem Bildschirm zentriert.

### Related API
- [hideCover](api/method/hidecover.md)

