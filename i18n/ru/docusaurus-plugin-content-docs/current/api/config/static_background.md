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

Выделенные ячейки отрисовываются только при включённой (по умолчанию) конфигурации [show_task_cells](api/config/show_task_cells.md).

Начиная с v6.3, [умная отрисовка](guides/performance.md#smart-rendering) отрисовывает только ячейки в видимой части временной шкалы, поэтому влияние этой конфигурации на скорость отрисовки меньше, чем в более ранних версиях. Конфигурация также уменьшает размер запроса к серверу экспорта при экспорте данных.

### Related API
- [static_background_cells](api/config/static_background_cells.md)
- [show_task_cells](api/config/show_task_cells.md)

### Related Guides
- [Производительность: Способы повышения](guides/performance.md)