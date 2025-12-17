---
sidebar_label: undo
title: undo config
description: "启用 gantt 的 Undo 功能"
---

# undo

### Description

@short: 启用 gantt 的 Undo 功能

@signature: undo: boolean

### Example

~~~jsx
gantt.config.undo = true;
~~~

**Default value:** true

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 此选项是 **undo** 扩展的一部分，因此请确保激活 [undo](guides/extensions-list.md) 插件。更多详情请参见 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::

### Related API
- [redo](api/config/redo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 版本 4.0 中新增

