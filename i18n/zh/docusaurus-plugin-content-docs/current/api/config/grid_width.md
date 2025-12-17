---
sidebar_label: grid_width
title: grid_width config
description: "设置 grid 的宽度"
---

# grid_width

### Description

@short: 设置 grid 的宽度

@signature: grid_width: number

### Example

~~~jsx
gantt.config.grid_width = 400;

gantt.init("gantt_here");
~~~

**Default value:** 360

### Details

grid 列的宽度取决于两个因素:每列的 [width](api/config/columns.md) 和 grid 的整体宽度。如果列宽总和与 grid_width 不匹配，Gantt 会调整其中一个值。

- 当使用 [gantt.init()](api/method/init.md) 初始化 gantt 时，列的 [width](api/config/columns.md) 优先。
- 当使用 [gantt.render()](api/method/render.md) 渲染 gantt 时，**grid_width** 优先。<br>
:::note
Sample: [Adjustment of column width ](https://snippet.dhtmlx.com/5/36b6baa89) 
:::
- 当使用 [gantt.init()](api/method/init.md) 初始化 gantt 且列宽未指定或设置为 **'*'** 时，**grid_width** 会被优先考虑。<br>
:::note
Sample: [Adjusting column width](https://snippet.dhtmlx.com/5/a35378204) 
:::

