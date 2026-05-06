---
sidebar_label: tooltip_offset_x
title: tooltip_offset_x config
description: "устанавливает правый (если положительный) отступ позиции тултипа"
---

# tooltip_offset_x

### Description

@short: Устанавливает правый (если положительный) отступ позиции тултипа

@signature: tooltip_offset_x: number

### Example

~~~jsx
gantt.config.tooltip_offset_x = 30;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** 10

### Details

:::note
Эта опция определяется в расширении **tooltip**, поэтому вам нужно активировать плагин [tooltip](guides/extensions-list.md#tooltip). Ознакомьтесь с подробностями в статье [Подсказки для элементов диаграммы Ганта](guides/tooltips.md). 
:::

### Related API
- [tooltip_offset_y](api/config/tooltip_offset_y.md)

### Related Guides
- [Подсказки для элементов диаграммы Ганта](guides/tooltips.md)