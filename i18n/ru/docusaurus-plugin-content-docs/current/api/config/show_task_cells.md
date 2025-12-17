---
sidebar_label: show_task_cells
title: show_task_cells config
description: "включает или отключает отображение границ колонок в области графика"
---

# show_task_cells

### Description

@short: Включает или отключает отображение границ колонок в области графика

@signature: show_task_cells: boolean

### Example

~~~jsx
//скрывает границы колонок в шкале времени
gantt.config.show_task_cells = false;

gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Установка этого свойства в значение *'false'* отключает отрисовку отдельных ячеек, показывая только строки.<br> Это может помочь повысить производительность, особенно при работе с большим количеством задач на графике.
