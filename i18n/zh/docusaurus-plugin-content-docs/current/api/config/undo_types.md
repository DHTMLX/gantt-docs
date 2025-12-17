---
sidebar_label: undo_types
title: undo_types config
description: "设置撤销操作将影响的实体类型"
---

# undo_types

### Description

@short: 设置撤销操作将影响的实体类型

@signature: undo_types: \{ link?: string; task?: string; \}

### Example

~~~jsx
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 该选项是**undo**扩展的一部分，请确保启用了[undo](guides/extensions-list.md)插件。更多详细信息请参见[撤销/重做功能](guides/undo-redo.md)文档。 
:::

- **link** - (*string*) - "link"实体的标识符
- **task** - (*string*) - "task"实体的标识符

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 版本4.0中新增

