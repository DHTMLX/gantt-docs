---
sidebar_label: autoscroll_speed
title: autoscroll_speed config
description: "определяет скорость автоскролла (в мс) при перетаскивании задачи или ссылки за пределы текущего видимого окна браузера"
---

# autoscroll_speed

### Description

@short: Определяет скорость автоскролла (в мс) при перетаскивании задачи или ссылки за пределы текущего видимого окна браузера

@signature: autoscroll_speed: number

### Example

~~~jsx
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");
~~~

**Default value:** 30

### Details

введено в версии 4.2

Функция "autoscroll" управляется через опцию [autoscroll](api/config/autoscroll.md).

### Related API
- [autoscroll](api/config/autoscroll.md)

