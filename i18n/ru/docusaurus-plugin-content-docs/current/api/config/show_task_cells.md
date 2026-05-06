---
sidebar_label: show_task_cells
title: конфигурация show_task_cells
description: "включает/отключает отображение границ столбцов в области графика"
---

# show_task_cells

### Description

@short: Включает/выключает отображение границ столбцов в области графика

@signature: show_task_cells: boolean

### Example

~~~jsx
//hides column borders in the time scale
gantt.config.show_task_cells = false;
 
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Когда свойство установлено в *'false'* , оно отключает рендеринг отдельных ячеек - рисует только строки. Это может повысить производительность, особенно если вы отображаете большое количество задач на графике.