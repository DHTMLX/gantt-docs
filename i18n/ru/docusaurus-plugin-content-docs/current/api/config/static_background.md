---
sidebar_label: static_background
title: static_background config
description: "генерирует фоновое изображение для области временной шкалы вместо отрисовки фактических линий столбцов и строк"
---

# static_background
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Генерирует фоновое изображение для области временной шкалы вместо отрисовки фактических линий столбцов и строк

@signature: static_background: boolean

### Example

~~~jsx
gantt.config.static_background = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Оптимизация производительности](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### Details

С версии v6.2 эта конфигурация отрисовывает PNG-фоновое изображение и любые ячейки, к которым применён CSS-класс через шаблонную функцию [timeline_cell_class](api/template/timeline_cell_class.md).

Если вам нужно вернуть поведение версии v6.1 (то есть отрисовку только фонового изображения), используйте конфигурацию [static_background_cells](api/config/static_background_cells.md):

~~~js
gantt.config.static_background_cells = false;
~~~  

### Related API
- [static_background_cells](api/config/static_background_cells.md)

### Related Guides
- [Производительность: Способы повышения](guides/performance.md)