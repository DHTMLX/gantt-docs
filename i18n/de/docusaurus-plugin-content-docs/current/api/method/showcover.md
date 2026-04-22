---
sidebar_label: showCover
title: showCover Methode
description: "Zeigt das Lightbox-Modal-Overlay, das Interaktionen mit dem restlichen Bildschirm blockiert"
---

# showCover

### Description

@short: Zeigt das Lightbox-Modal-Overlay, das Interaktionen mit dem restlichen Bildschirm blockiert

@signature: showCover: (box?: HTMLElement) => void

### Parameters
- `box` - (optional) *HTMLElement* - ein Element, das versteckt werden soll

### Example

~~~jsx
gantt.showCover();
~~~

### Details

Wenn Sie den Eingabeparameter angeben, wird die Methode das angegebene HTML-Element (durch Setzen der Display-Eigenschaft auf \"block\") zentriert auf dem Bildschirm anzeigen.

### Related API
- [hideCover](api/method/hidecover.md)