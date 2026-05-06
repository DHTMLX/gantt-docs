---
sidebar_label: hideCover
title: hideCover method
description: "скрывает модальный оверлей lightbox, блокирующий взаимодействие с оставшейся частью экрана"
---

# hideCover

### Description

@short: Скрывает модальный оверлей lightbox, блокирующий взаимодействие с оставшейся частью экрана

@signature: hideCover: (box?: HTMLElement) => void

### Parameters

### Example

~~~jsx
gantt.hideCover(gantt.getLightbox());
~~~

### Details

Если вы укажете входной параметр, метод скроет указанный HTML-элемент (установив значение свойства display в «none»).

### Related API
- [showCover](api/method/showcover.md)