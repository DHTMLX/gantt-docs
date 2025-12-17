---
sidebar_label: tooltip_offset_y
title: tooltip_offset_y config
description: "регулирует вертикальное смещение позиции tooltip, сдвигая его вниз при положительном значении"
---

# tooltip_offset_y

### Description

@short: Регулирует вертикальное смещение позиции tooltip, сдвигая его вниз при положительном значении

@signature: tooltip_offset_y: number

### Example

~~~jsx
gantt.config.tooltip_offset_y = 40;

gantt.init("gantt_here");
~~~

**Default value:** 20

### Details

:::note
 Эта опция является частью расширения **tooltip**, поэтому убедитесь, что плагин [tooltip](guides/extensions-list.md#tooltip) включен. Для получения дополнительной информации ознакомьтесь со статьёй [Тултипы для элементов Gantt](guides/tooltips.md). 
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- [Тултипы для элементов Gantt](guides/tooltips.md)

