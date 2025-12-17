---
sidebar_label: tooltip_offset_x
title: tooltip_offset_x config
description: "регулирует горизонтальное смещение позиции tooltip вправо при установке положительного значения"
---

# tooltip_offset_x

### Description

@short: Регулирует горизонтальное смещение позиции tooltip вправо при установке положительного значения

@signature: tooltip_offset_x: number

### Example

~~~jsx
gantt.config.tooltip_offset_x = 30;

gantt.init("gantt_here");
~~~

**Default value:** 10

### Details

:::note
 Эта опция является частью расширения **tooltip**, поэтому убедитесь, что плагин [tooltip](guides/extensions-list.md#tooltip) включен. Подробнее можно узнать в статье [Тултипы для элементов Gantt](guides/tooltips.md). 
:::

### Related API
- [tooltip_offset_y](api/config/tooltip_offset_y.md)

### Related Guides
- [Тултипы для элементов Gantt](guides/tooltips.md)

