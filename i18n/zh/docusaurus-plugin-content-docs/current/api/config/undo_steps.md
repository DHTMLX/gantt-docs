---
sidebar_label: undo_steps
title: undo_steps config
description: "指定 undo 方法将回滚的步骤数"
---

# undo_steps

### Description

@short: 指定 undo 方法将回滚的步骤数

@signature: undo_steps: number

### Example

~~~jsx
gantt.config.undo_steps = 10;

gantt.init("gantt_here");
~~~

**Default value:** 10

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 该设置是 **undo** 扩展的一部分，请确保启用 [undo](guides/extensions-list.md) 插件。更多详情请参阅 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 在版本 4.0 中添加

