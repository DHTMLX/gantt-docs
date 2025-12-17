---
sidebar_label: grid_elastic_columns
title: grid_elastic_columns config
description: "调整可滚动grid中列的宽度"
---

# grid_elastic_columns

### Description

@short: 调整可滚动grid中列的宽度

@signature: grid_elastic_columns: boolean | string

### Example

~~~jsx
gantt.config.grid_elastic_columns = true;
...
gantt.init("gantt_here");
~~~

**Default value:** false

### Details

:::note
 此属性仅在[grid具有水平滚动条](guides/specifying-columns.md)时生效。 
:::

默认情况下，dhtmlxGantt不会在整个grid大小改变时调整列宽。

因此，如果grid的宽度增加，列将保持原始宽度，右侧会留下空白。如果grid的宽度减少，则会出现水平滚动条。

![elastic_false](/img/elastic_false.png)

如果希望列宽随grid大小一起调整，请将 **grid_elastic_columns** 设置为 *true*:

~~~js
gantt.config.grid_elastic_columns = true;
~~~

:::note
Sample: [Elastic columns of Grid](https://snippet.dhtmlx.com/k0qqj5w5) 
:::

启用此设置后，改变grid宽度时，列宽也会随之调整:

- 当grid变宽时，列会扩展以填满额外空间。
- 增加某列宽度会使grid整体宽度增大（可能出现水平滚动条），但其他列宽不变。
- 减小某列宽度会使grid整体宽度缩小（滚动条可能消失），其他列宽可能增长。

![elastic_true](/img/elastic_true.png)

另一个选项是将属性值设置为 "min_width":

~~~js
gantt.config.grid_elastic_columns = "min_width";
~~~

行为如下:

- 当grid变宽时，列会拉伸以填满可用空间。
- 当grid变窄时，列会缩小至其[最小宽度](guides/specifying-columns.md#kuandu)。当所有列都达到最小宽度后，会出现水平滚动条。

### Change log
- added in v7.0
