---
sidebar_label: static_background_cells
title: static_background_cells config
description: "enables rendering of highlighted cells in the static_background mode"
---

# static_background_cells
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Enables rendering of highlighted cells in the static_background mode

@signature: static_background_cells: boolean

### Example

~~~jsx
gantt.config.static_background_cells = false;
~~~

**Default value:** true

### Details

This config is used in conjunction with the [static_background](api/config/static_background.md) config.
When both **static background** and **static_background_cells** are enabled, 
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

