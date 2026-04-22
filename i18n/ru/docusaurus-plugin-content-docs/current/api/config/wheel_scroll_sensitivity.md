---
sidebar_label: wheel_scroll_sensitivity
title: wheel_scroll_sensitivity конфигурация
description: "задает скорость прокрутки диаграммы Ганта колесиком мыши"
---

# wheel_scroll_sensitivity

### Description

@short: Указывает скорость прокрутки диаграммы Ганта колесиком мыши

@signature: wheel_scroll_sensitivity: undefined | number | \{ x?: number; y?: number; \}

### Example

~~~jsx
// scroll at double-speed
gantt.config.wheel_scroll_sensitivity = 2;

// scroll at half-speed 
gantt.config.wheel_scroll_sensitivity = 0.5;

// or scroll at different speeds on different axes
gantt.config.wheel_scroll_sensitivity = {
      x: 1,
      y: 0.5
};
~~~

- **Значение по умолчанию:** undefined

### Details

Объектная конфигурация имеет следующие свойства:

- **x** - (*number*) - горизонтальная скорость
- **y** - (*number*) - вертикальная скорость

### Change log
- добавлено в v7.0.11