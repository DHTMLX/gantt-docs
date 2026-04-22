---
sidebar_label: showCover
title: showCover method
description: "показывает оверлей lightbox модального окна, блокирующий взаимодействие с остальной частью экрана"
---

# showCover

### Description

@short: Показывает оверлей lightbox модального окна, блокирующий взаимодействие с остальной частью экрана

@signature: showCover: (box?: HTMLElement) =\> void

### Parameters
- `box` - (необязательный) *HTMLElement* - элемент, который нужно скрыть

### Example

~~~jsx
gantt.showCover();
~~~

### Details

Если вы укажете входной параметр, метод отобразит указанный HTML-элемент (устанавливая свойство display в значение "block") по центру экрана.

### Related API
- [hideCover](api/method/hidecover.md)