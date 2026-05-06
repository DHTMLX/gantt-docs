---
sidebar_label: smart_rendering
title: Настройки smart_rendering
description: "включает режим умного рендеринга для отображения задач и связей в Gantt"
---

# smart_rendering

### Description

@short: Включает режим умного рендеринга для отрисовки задач и связей в Gantt

@signature: smart_rendering: boolean

### Example

~~~jsx
gantt.config.smart_rendering = true;
...
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true

### Details

Начиная с версии v6.2, умный рендеринг включен по умолчанию, так как он встроен в ядро файла *dhtmlxgantt.js*. Следовательно, вам не нужно подключать файл *dhtmlxgantt_smart_rendering.js* на страницу, чтобы умный рендеринг работал.

:::note
Если вы подключите файл *dhtmlxgantt_smart_rendering.js*, который относится к старой версии, он перекроет улучшения нового встроенного расширения **smart_rendering**.
:::

### Related Guides
- [Производительность: способы повышения](guides/performance.md#smart-rendering)