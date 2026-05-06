---
sidebar_label: clearUndoStack
title: clearUndoStack method
description: "清空存储的撤销命令栈"
---

# clearUndoStack

### Description

@short: 清空存储的撤销命令栈

@signature: clearUndoStack: () =\> void

### Example

~~~jsx
gantt.clearUndoStack();
~~~

### Related samples
- [Gantt 中的撤销/重做变更](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
此方法在 **undo** 扩展中定义，因此你需要启用 [undo](guides/extensions-list.md#undo) 插件。有关详细信息，请参阅 [撤销/重做功能](guides/undo-redo.md) 文章。
:::

### Related API
- [clearRedoStack](api/method/clearredostack.md)
- [undo](api/method/undo.md)
- [getUndoStack](api/method/getundostack.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 在版本 5.2 中新增