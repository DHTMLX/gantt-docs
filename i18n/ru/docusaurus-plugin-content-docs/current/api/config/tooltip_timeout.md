---
sidebar_label: tooltip_timeout
title: tooltip_timeout конфигурация
description: "устанавливает тайм-аут в миллисекундах перед отображением tooltip для задачи"
---

# tooltip_timeout

### Description

@short: Устанавливает тайм-аут в миллисекундах перед отображением tooltip для задачи

@signature: tooltip_timeout: number

### Example

~~~jsx
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** 30

### Details

:::note
Этот параметр определяется в расширении **tooltip**, поэтому вам нужно активировать плагин [tooltip](guides/extensions-list.md#tooltip). Подробности смотрите в статье [Tooltips for Gantt Elements](guides/tooltips.md).
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- [Подсказки для элементов диаграммы Ганта](guides/tooltips.md)