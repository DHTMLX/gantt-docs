---
sidebar_label: scroll_size
title: scroll_size config
description: "устанавливает размер вертикального (ширина) и горизонтального (высота) скроллбаров"
---

# scroll_size

### Description

@short: Устанавливает размер вертикального (ширина) и горизонтального (высота) скроллбаров

@signature: scroll_size: number

### Example

~~~jsx
gantt.config.scroll_size = 20;

gantt.init("gantt_here");
~~~

**Default value:** 15

### Details

Если этот параметр не задан, Gantt использует ширину скроллбара по умолчанию, установленную браузером, так как стили скроллбаров могут различаться в разных браузерах.
