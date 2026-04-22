---
sidebar_label: static_background_cells
title: static_background_cells config
description: "включает отрисовку выделенных ячеек в режиме static_background"
---

# static_background_cells
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Включает отрисовку выделенных ячеек в режиме static_background

@signature: static_background_cells: boolean

### Example

~~~jsx
gantt.config.static_background = false;
~~~

**Default value:** true

### Details

This config is used in conjunction with the [static_background](api/config/static_background.md) config.
Когда оба **static background** и **static_background_cells** включены, 
gantt.config.static_background_cells = true(default), gantt will render both PNG grid and highlighted cells (ones that have CSS class assigned to them from timeline_cell_class template)

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = true;// enabled by default
~~~

If **static_background** is enabled and **static_background_cells** is disabled, gantt will render only PNG grid, as it worked in versions before 6.2.

~~~js
gantt.config.static_background = true;
gantt.config.static_background_cells = false;
~~~

If **static_background** is disabled, **static_background_cells** has no effect at all.

~~~js
gantt.config.static_background = false;
~~~

This config can be used to revert **static_background** to v6.1.

### Related API
- [static_background](api/config/static_background.md)

### Change log
- added in v6.2 for compatibility with v6.1