---
sidebar_label: grid_width
title: grid_width config
description: "sets the width of the grid"
---

# grid_width

### Description

@short: Sets the width of the grid

@signature: grid_width: number

### Example

~~~jsx
gantt.config.grid_width = 400;

gantt.init("gantt_here");
~~~

**Default value:** 360

### Details

The width of Grid columns depends on two attributes: the [width](api/config/columns.md) of the column and the width of the grid. If the sum of the width of columns is not equal to the width of the grid, Gantt changes one of the parameters.

- When initializing the gantt via [gantt.init()](api/method/init.md), the [width](api/config/columns.md) of the column is a priority.
- When rendering the gantt via [gantt.render()](api/method/render.md), the **grid_width** is a priority.  

:::note
sample: [Adjustment of column width ](https://snippet.dhtmlx.com/5/36b6baa89)
:::

- When initializing the gantt via [gantt.init()](api/method/init.md) and either the width of the column is not specified or is set to **'*'**, the **grid_width** is a priority. 

:::note
sample: [Adjusting column width ](https://snippet.dhtmlx.com/5/a35378204)
:::

