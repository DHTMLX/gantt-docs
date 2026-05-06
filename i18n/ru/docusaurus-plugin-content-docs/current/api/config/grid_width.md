---
sidebar_label: grid_width
title: grid_width конфигурация
description: "устанавливает ширину Grid"
---

# grid_width

### Description

@short: Устанавливает ширину Grid

@signature: grid_width: number

### Example

~~~jsx
gantt.config.grid_width = 400;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** 360

### Details

The width of Grid columns depends on two attributes: the [width](api/config/columns.md) of the column and the width of the grid. If the sum of the width of columns is not equal to the width of the grid, Gantt changes one of the parameters.

- При инициализации gantt через [gantt.init()](api/method/init.md), приоритет имеет ширина столбца [width](api/config/columns.md).

- При отрисовке gantt через [gantt.render()](api/method/render.md), приоритет имеет **grid_width**.

:::note
sample: [Настройка ширины столбца](https://snippet.dhtmlx.com/5/36b6baa89)
:::

- При инициализации gantt через [gantt.init()](api/method/init.md) и если ширина столбца не указана или установлена как **'*'**, приоритет имеет **grid_width**.

:::note
sample: [Регулировка ширины столбца](https://snippet.dhtmlx.com/5/a35378204)
:::