---
sidebar_label: tooltip_timeout
title: tooltip_timeout config
description: "задаёт задержку в миллисекундах перед появлением tooltip для задачи"
---

# tooltip_timeout

### Description

@short: Задаёт задержку в миллисекундах перед появлением tooltip для задачи

@signature: tooltip_timeout: number

### Example

~~~jsx
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~

**Default value:** 30

### Details

:::note
 Эта настройка относится к расширению **tooltip**, поэтому убедитесь, что плагин [tooltip](guides/extensions-list.md#tooltip) включён. Подробнее можно узнать в статье [Тултипы для элементов Gantt](guides/tooltips.md). 
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- [Тултипы для элементов Gantt](guides/tooltips.md)

