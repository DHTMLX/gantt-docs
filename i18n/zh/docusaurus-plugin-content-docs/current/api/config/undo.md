---
sidebar_label: undo
title: undo config
description: "启用 gantt 的 Undo 功能"
---

# undo

### Description

@short: 启用甘特图的 Undo 功能

@signature: undo: boolean

### Example

~~~jsx
gantt.config.undo = true;
~~~

**默认值:** true

### Related samples
- [甘特图中的撤销/重做变更](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
此选项在 **undo** 扩展中定义，因此需要启用 [undo](guides/extensions-list.md#undo) 插件。有关详细信息，请参阅 [Undo/Redo Functionality](guides/undo-redo.md) 文章。
:::

### Related API
- [redo](api/config/redo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- 已在版本 4.0 中添加