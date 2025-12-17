---
sidebar_label: undo_actions
title: undo_actions config
description: "定义 Undo 功能将要撤销的操作"
---

# undo_actions

### Description

@short: 定义 Undo 功能将要撤销的操作

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
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 该选项是 **undo** 扩展的一部分，请确保已启用 [undo](guides/extensions-list.md) 插件。更多详情请参阅 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::

- **update** - (*string*) - 指定"update"操作的名称
- **remove** - (*string*) - 指定"remove"操作的名称
- **add** - (*string*) - 指定"add"操作的名称
- **move** - (*string*) - 指定"move"操作的名称

### Related API
- [undo](api/config/undo.md)
- [undo_types](api/config/undo_types.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 版本 4.0 中添加

