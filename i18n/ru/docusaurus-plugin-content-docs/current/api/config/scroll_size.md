---
sidebar_label: scroll_size
title: scroll_size конфигурация
description: "установить размеры вертикальных (ширина) и горизонтальных (высота) полос прокрутки"
---

# scroll_size

### Description

@short: Установите размеры вертикальных (ширина) и горизонтальных (высота) полос прокрутки

@signature: scroll_size: number

### Example

~~~jsx
gantt.config.scroll_size = 20;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** 15

### Details

Если не указано, Gantt будет использовать ширину стандартной полосы прокрутки браузера, поскольку стили элемента полосы прокрутки зависят от браузера.