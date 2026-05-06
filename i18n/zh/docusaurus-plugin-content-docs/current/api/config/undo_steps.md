---
sidebar_label: undo_steps
title: undo_steps 配置
description: "设置 undo 方法应回滚的步骤数量"
---

# undo_steps

### Description

@short: 设置 undo 方法应回滚的步骤数量

@signature: undo_steps: number

### Example

~~~jsx
gantt.config.undo_steps = 10;

gantt.init("gantt_here");
~~~

**默认值：** 10

### Related samples
- [Gantt 的撤销/重做变更](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
本选项定义在 **undo** 扩展中，因此需要启用 [undo] 插件。请在 [撤销/重做 功能](guides/undo-redo.md) 文章中查看详细信息。 
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [撤销/重做 功能](guides/undo-redo.md)

### Change log
- 新增于版本 4.0