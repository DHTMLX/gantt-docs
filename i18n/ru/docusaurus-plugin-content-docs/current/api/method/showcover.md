---
sidebar_label: showCover
title: showCover method
description: "отображает модальное оверлейное окно (lightbox), которое блокирует взаимодействие с остальной частью экрана"
---

# showCover

### Description

@short: Отображает модальное оверлейное окно (lightbox), которое блокирует взаимодействие с остальной частью экрана

@signature: showCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - элемент, который нужно отобразить

### Example

~~~jsx
gantt.showCover();
~~~

### Details

Если передан входной параметр, метод отобразит указанный HTML-элемент, установив для его свойства display значение "block" и центрируя его на экране.

### Related API
- [hideCover](api/method/hidecover.md)

