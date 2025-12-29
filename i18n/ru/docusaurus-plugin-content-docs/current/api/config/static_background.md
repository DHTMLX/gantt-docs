---
sidebar_label: static_background
title: static_background config
description: "создает фоновое изображение для секции timeline вместо прямого рисования линий колонок и строк"
---

# static_background
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Создает фоновое изображение для секции timeline вместо прямого рисования линий колонок и строк

@signature: static_background: boolean

### Example

~~~jsx
gantt.config.static_background = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### Details

Начиная с версии 6.2, эта настройка генерирует PNG-фоновое изображение вместе с любыми ячейками, стилизованными с помощью CSS-классов, назначаемых через функцию шаблона [timeline_cell_class](api/template/timeline_cell_class.md).

Чтобы вернуться к поведению версии 6.1 (когда рендерилось только фоновое изображение), можно использовать конфигурацию [static_background_cells](api/config/static_background_cells.md):

~~~js
gantt.config.static_background_cells = false;
~~~

### Related API
- [static_background_cells](api/config/static_background_cells.md)

### Related Guides
- [Производительность: Способы улучшения](guides/performance.md)

