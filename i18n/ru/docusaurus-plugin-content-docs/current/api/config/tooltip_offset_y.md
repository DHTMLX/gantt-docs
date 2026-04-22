---
sidebar_label: tooltip_offset_y
title: tooltip_offset_y конфигурация
description: "устанавливает верхнее (при положительном значении) смещение позиции tooltip"
---

# tooltip_offset_y

### Description

@short: Устанавливает верхнее (при положительном значении) смещение позиции tooltip

@signature: tooltip_offset_y: number

### Example

~~~jsx
gantt.config.tooltip_offset_y = 40;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** 20

### Details

:::note
Этот параметр определяется в расширении **tooltip**, поэтому нужно активировать плагин [tooltip](guides/extensions-list.md#tooltip). Подробности см. в статье [Tooltips for Gantt Elements](guides/tooltips.md).
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- [Tooltips for Gantt Elements](guides/tooltips.md)