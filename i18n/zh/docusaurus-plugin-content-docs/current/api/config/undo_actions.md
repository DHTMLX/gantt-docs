---
sidebar_label: undo_actions
title: undo_actions config
description: "设置 Undo 操作将撤销的操作"
---

# undo_actions

### Description

@short: 设置 Undo 操作将撤销的操作

@signature: undo_actions: \{ update?: string; remove?: string; add?: string; move?: string; \}

### Example

~~~jsx
gantt.config.undo_actions = {
    update: "update",
    remove: "remove", // 从 datastore 中移除一个项目
    add: "add",
    move: "move"
};
~~~

### Related samples
- [Gantt 中的撤销/重做变更](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
此选项在 **undo** 扩展中定义，因此您需要启用 [undo](guides/extensions-list.md#undo) 插件。请在 [Undo/Redo Functionality](guides/undo-redo.md) 文章中阅读详细信息。
:::

- **update** - (*string*) - “update” 操作的名称
- **remove** - (*string*) - “remove” 操作的名称
- **add** - (*string*) - “add” 操作的名称
- **move** - (*string*) - “move” 操作的名称

### Related API
- [undo](api/config/undo.md)
- [undo_types](api/config/undo_types.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- 已在版本 4.0 中新增