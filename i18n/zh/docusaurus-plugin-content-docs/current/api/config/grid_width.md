---
sidebar_label: grid_width
title: grid_width config
description: "设置网格宽度"
---

# grid_width

### Description

@short: 设置网格的宽度

@signature: grid_width: number

### Example

~~~jsx
gantt.config.grid_width = 400;

gantt.init("gantt_here");
~~~

**Default value:** 360

### Details

Grid 列的宽度取决于两个属性：列的 [width](api/config/columns.md) 与网格的宽度之和。如果列宽之和不等于网格宽度，Gantt 将修改其中一个参数。

- 当通过 [gantt.init()](api/method/init.md) 初始化 Gantt 时，列的 [width](api/config/columns.md) 是优先的。
- 当通过 [gantt.render()](api/method/render.md) 渲染 Gantt 时，**grid_width** 是优先的。

:::note
示例：[列宽调整](https://snippet.dhtmlx.com/5/36b6baa89)
:::

- 当通过 [gantt.init()](api/method/init.md) 初始化 Gantt，且列宽未指定或设为 **'*'** 时，**grid_width** 是优先的。

:::note
示例：[调整列宽](https://snippet.dhtmlx.com/5/a35378204)
:::