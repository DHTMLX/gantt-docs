---
sidebar_label: hideCover
title: hideCover method
description: "удаляет модальное оверлей lightbox, который блокирует взаимодействие с остальной частью экрана"
---

# hideCover

### Description

@short: Удаляет модальное оверлей lightbox, который блокирует взаимодействие с остальной частью экрана

@signature: hideCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - элемент, который нужно скрыть

### Example

~~~jsx
gantt.hideCover(gantt.getLightbox());
~~~

### Details

При передаче входного параметра этот метод скрывает указанный HTML элемент, изменяя его свойство display на "none".

### Related API
- [showCover](api/method/showcover.md)

