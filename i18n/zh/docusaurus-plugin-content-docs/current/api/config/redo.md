---
sidebar_label: redo
title: redo config
description: "允许在甘特图中使用 Redo 功能"
---

# redo

### Description

@short: 允许在甘特图中使用 Redo 功能

@signature: redo: boolean

### Example

~~~jsx
gantt.config.redo = true;
~~~

**Default value:** true

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 此设置是 **undo** 扩展的一部分，因此请确保已启用 [undo](guides/extensions-list.md) 插件。更多信息请参见 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 4.0 版本新增

