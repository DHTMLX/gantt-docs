---
sidebar_label: autoscroll_speed
title: конфигурация autoscroll_speed
description: "задает скорость автоскроллинга (в мс) при перетаскивании задачи или ссылки за пределы текущего экрана браузера"
---

# autoscroll_speed

### Description

@short: Определяет скорость автоскроллинга (в мс) во время перетаскивания задачи или ссылки за пределы текущего экрана браузера

@signature: autoscroll_speed: number

### Example

~~~jsx
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** 30


### Details

added in version 4.2

Функциональность "autoscroll" включена опцией [autoscroll](api/config/autoscroll.md).

### Related API
- [autoscroll](api/config/autoscroll.md)