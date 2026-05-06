---
sidebar_label: undo_types
title: undo_types 配置
description: "设置将应用 Undo 操作的实体类型"
---

# undo_types

### Description

@short: 设置将应用 Undo 操作的实体类型

@signature: undo_types: \{ link?: string; task?: string; \}

### Example

~~~jsx
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~

### Related samples
- [Gantt 中的 Undo/Redo 变更](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
此选项定义在 **undo** extension 中，因此您需要启用 [undo](guides/extensions-list.md#undo) 插件。请在 [Undo/Redo Functionality](guides/undo-redo.md) 文章中阅读详细信息。
:::

- **link** - (*string*) - “link” 实体的名称
- **task** - (*string*) - “task” 实体的名称

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- 在 4.0 版本中新增