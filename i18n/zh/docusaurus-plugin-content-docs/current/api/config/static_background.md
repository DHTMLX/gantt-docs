---
sidebar_label: static_background
title: static_background config
description: "为时间线部分创建背景图像，而不是直接绘制列和行的线条"
---

# static_background
:::info
 该功能仅在 PRO 版本中可用。
:::
### Description

@short: 为时间线部分创建背景图像，而不是直接绘制列和行的线条

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

从v6.2版本开始，该设置会生成一个PNG背景图像，同时还会应用通过[timeline_cell_class](api/template/timeline_cell_class.md)模板函数分配的CSS类样式到单元格。

如果想恢复到v6.1版本的行为（仅渲染背景图像），可以使用[static_background_cells](api/config/static_background_cells.md)中的配置:

~~~js
gantt.config.static_background_cells = false;
~~~

### Related API
- [static_background_cells](api/config/static_background_cells.md)

### Related Guides
- [性能优化:提升方法](guides/performance.md)

