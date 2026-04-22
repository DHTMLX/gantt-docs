---
sidebar_label: static_background
title: static_background config
description: "为时间线区域生成背景图像，而不是渲染实际的列和行的线条"
---

# static_background
:::info
本功能仅在 PRO 版中可用。
:::
### Description

@short: 为时间线区域生成背景图像，而不是渲染实际的列和行的线条

@signature: static_background: boolean

### Example

~~~jsx
gantt.config.static_background = true;

gantt.init("gantt_here");
~~~

**默认值：** false

### Related samples
- [性能优化](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### Details

自 v6.2 版本起，该配置会渲染 PNG 背景以及通过 [timeline_cell_class](api/template/timeline_cell_class.md) 模板函数附加了 CSS 类的单元格。

如果你需要回滚到 v6.1 的行为（也就是只渲染背景图像），请使用 [static_background_cells](api/config/static_background_cells.md) 配置：

~~~js
gantt.config.static_background_cells = false;
~~~

### Related API
- [static_background_cells](api/config/static_background_cells.md)

### Related Guides
- [性能：提升方法](guides/performance.md)