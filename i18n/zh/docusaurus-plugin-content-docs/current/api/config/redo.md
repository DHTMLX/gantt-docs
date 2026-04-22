---
sidebar_label: redo
title: redo config
description: "为甘特图启用 Redo 功能"
---

# redo

### Description

@short: 启用甘特图的 Redo 功能

@signature: redo: boolean

### Example

~~~jsx
gantt.config.redo = true;
~~~

**默认值：** true

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
此选项在 **undo** 扩展中定义，因此您需要启用 [undo](guides/extensions-list.md#undo) 插件。请在 [Undo/Redo Functionality](guides/undo-redo.md) 文章中阅读详细信息。
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

