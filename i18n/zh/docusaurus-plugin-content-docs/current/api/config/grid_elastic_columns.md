---
sidebar_label: grid_elastic_columns
title: grid_elastic_columns config
description: "adjusts the width of columns inside a scrollable grid"
---

# grid_elastic_columns

### Description

@short: 调整滚动网格中列的宽度

@signature: grid_elastic_columns: boolean | string

### Example

~~~jsx
gantt.config.grid_elastic_columns = true;
...
gantt.init("gantt_here");
~~~

**默认值：** **false**

### Details

:::note
当网格具有水平滚动条时，此属性才起作用（[网格具有水平滚动条](guides/specifying-columns.md#horizontal-scrollbar)）。 
:::

默认情况下，dhtmlxGantt 在调整整个网格大小时不会自动调整列宽。

因此，当网格的宽度增大时，列的宽度将保持不变。因此，网格右侧会出现空白区域。  
如果网格的宽度减小，网格中将显示水平滚动条。

![elastic_false](/img/elastic_false.png)

要使列随网格大小变化，请将 **grid_elastic_columns** 设置为 *true*：

~~~js
gantt.config.grid_elastic_columns = true;
~~~

:::note
示例： [Elastic columns of Grid ](https://snippet.dhtmlx.com/k0qqj5w5)
:::

现在，如果改变网格的宽度，列的宽度也会随之改变，反之亦然：

- 如果你扩大网格，列将扩展以适应网格的大小并占用所有剩余空间
- 如果你扩展列宽，网格的大小将增加（可能会出现水平滚动条，但其他列的大小不会改变）
- 如果你缩小列宽，网格的大小将减少（可能会消失水平滚动条，但其他列的大小可能增加）

![elastic_true](/img/elastic_true.png)

还有一个选项是将属性值设为 "min_width"：

~~~js
gantt.config.grid_elastic_columns = "min_width";
~~~

在这种情况下：

- 如果你扩大网格，列将扩展以适应网格的大小并占用所有剩余空间
- 如果你缩小网格的宽度，列将收缩直到达到它们的 [最小宽度](guides/specifying-columns.md#width)。当所有列达到最小宽度时，网格中的水平滚动将出现。

### Change log
- 在 v7.0 版本新增