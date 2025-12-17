---
sidebar_label: grid_width
title: grid_width config
description: "задаёт ширину grid"
---

# grid_width

### Description

@short: Задаёт ширину grid

@signature: grid_width: number

### Example

~~~jsx
gantt.config.grid_width = 400;

gantt.init("gantt_here");
~~~

**Default value:** 360

### Details

Ширина колонок grid зависит от двух факторов: [width](api/config/columns.md) каждой колонки и общей ширины grid. Если суммарная ширина колонок не совпадает с шириной grid, Gantt скорректирует одно из этих значений.

- При инициализации gantt с помощью [gantt.init()](api/method/init.md) приоритет имеет ширина колонок ([width](api/config/columns.md)).
- При отрисовке gantt с помощью [gantt.render()](api/method/render.md) приоритет отдается **grid_width**. <br> 

:::note
Sample: [Adjustment of column width](https://snippet.dhtmlx.com/5/36b6baa89) 
:::
- При инициализации gantt через [gantt.init()](api/method/init.md), если ширина колонки не указана или задана как **'*'**, приоритет будет у **grid_width**. <br>

:::note
Sample: [Adjusting column width](https://snippet.dhtmlx.com/5/a35378204) 
:::

