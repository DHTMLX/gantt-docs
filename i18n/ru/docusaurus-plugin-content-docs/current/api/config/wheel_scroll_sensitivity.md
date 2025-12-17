---
sidebar_label: wheel_scroll_sensitivity
title: wheel_scroll_sensitivity config
description: "управляет скоростью прокрутки gantt при использовании колесика мыши"
---

# wheel_scroll_sensitivity

### Description

@short: Управляет скоростью прокрутки gantt при использовании колесика мыши

@signature: wheel_scroll_sensitivity: undefined | number | \{ x?: number; y?: number; \}

### Example

~~~jsx
// прокрутка с двойной скоростью
gantt.config.wheel_scroll_sensitivity = 2;

// прокрутка с половинной скоростью
gantt.config.wheel_scroll_sensitivity = 0.5;

// или прокрутка с разной скоростью по разным осям
gantt.config.wheel_scroll_sensitivity = {
      x: 1,
      y: 0.5
};
~~~

**Default value:** undefined

### Details

Этот объект конфигурации включает следующие свойства:

- **x** - (*number*) - управляет скоростью горизонтальной прокрутки
- **y** - (*number*) - управляет скоростью вертикальной прокрутки

### Change log
- добавлено в v7.0.11
