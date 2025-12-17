---
sidebar_label: static_background_cells
title: static_background_cells config
description: "允许在使用 static_background 模式时渲染高亮单元格"
---

# static_background_cells
:::info
 该功能仅在 PRO 版本中可用。
:::
### Description

@short: 允许在使用 static_background 模式时渲染高亮单元格

@signature: static_background_cells: boolean

### Example

~~~jsx
gantt.config.static_background_cells = false;
~~~

**Default value:** true

### Details

此设置与 [static_background](api/config/static_background.md) 配置配合使用。
当同时启用 **static background** 和 **static_background_cells**，且 gantt.config.static_background_cells 设置为 true（默认值）时，gantt 会渲染 PNG 网格和高亮单元格（这些单元格通过 timeline_cell_class 模板分配了 CSS 类）。

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = true; // 默认启用
~~~

如果启用了 **static_background** 但关闭了 **static_background_cells**，gantt 将仅渲染 PNG 网格，就像 6.2 版本之前的行为一样。

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = false;
~~~

如果禁用了 **static_background**，则 **static_background_cells** 设置不会产生任何效果。

~~~js
gantt.config.static_background = false;
~~~

此选项可用于将 **static_background** 行为恢复到 6.1 版本的状态。

### Related API
- [static_background](api/config/static_background.md)

### Change log
- v6.2 新增，用于保持与 v6.1 的兼容性

